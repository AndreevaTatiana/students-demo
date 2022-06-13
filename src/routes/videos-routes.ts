import {Request, Response, Router} from 'express'
import {videosRepository} from "../repositories/videos-repository";


export const videosRouter = Router({})

videosRouter.get('/videos', (req: Request, res: Response) => {
    //res.send(videos)
    const foundVideos = videosRepository.getVideos();
    res.status(200).send(foundVideos)
})

videosRouter.get('/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId;
    if (!id) {
        res.sendStatus(404)
        return
    }
        let video = videosRepository.getVideoById(id);
        if (!!video) {
            res.status(200).send(video)
            return
        }
            res.sendStatus(404)
})

videosRouter.post('/videos', (req: Request, res: Response) => {
    const title = req.body.title
    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        res.status(400).send({
            errorsMessages: [
                {
                    'message': 'Incorrect title',
                    'field': 'title'
                }
            ]//,
            // "resultCode": 1
        })
        return
    }
    const creatVideo = videosRepository.createVideo(title);
    res.status(201).send(creatVideo)
})

videosRouter.delete('/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId;
    if (!id) {
        res.sendStatus(404)
        return
    }
        if (!!videosRepository.deleteVideoById(id)) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }

})

videosRouter.put('/:id', (req: Request, res: Response) => {
    let title = req.body.title
    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        res.status(400).send({
            errorsMessages: [
                {
                    'message': 'Incorrect title',
                    'field': 'title'
                }
            ]//,
            // "resultCode": 1
        })
        return
    }
    const id = +req.params.id;
    if (!id) {
        res.sendStatus(404)

        return;
    }
    let isVideo = videosRepository.updateVideoById(id,title);
    if (!!isVideo) {
        res.sendStatus(204)
        return;
    }
    res.sendStatus(404)
})