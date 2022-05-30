import express, { Request, Response } from 'express'
import cors from 'cors'
//import bodyParser from 'body-parser'

const app = express()
const port = process.env.PORT || 5001
app.use(cors())
app.use(express.json())

let videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]  

app.get('/', (req: Request, res: Response ) => {
    res.send('Hello: World')
})

app.get('/lesson_01/api/videos', (req: Request, res: Response ) => {
    //res.send(videos)
    res.status(200).send(videos)
})

app.get('/lesson_01/api/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId;
       let video = videos.find(y => y.id === id)
        if (!!video) {
           //res.send(video)
            res.status(200).send(video)
        } else {
            res.send(404)
        }
})

app.post('/lesson_01/api/videos', (req: Request, res: Response) => {
    if (!!req.body.title && req.body.title.length < 40) {
        const newVideo = {
            id: Math.floor(Math.random() * 10000),
            title: req.body.title,
            author: 'it-incubator.eu'
            //author: req.body.author
        }
        videos.push(newVideo)
        res.status(201).send(newVideo)
    } else {
        let messageErr = {
            "errorsMessages": [
            {
                "message": "string",
                "field": "string"
            }
        ],
            "resultCode": 404
        }
        res.status(404).send(messageErr)
    }

})

app.delete('/lesson_01/api/videos/:videoId',(req: Request, res: Response)=>{
    //videos = videos.filter((y) => y.id !== +req.params.id)
    //res.send(204)
    const id = +req.params.videoId;
    let video = videos.find(y => y.id === id)
    if (!!video) {
        //res.send(video)
        videos = videos.filter((y) => y.id !== +req.params.id)
        res.send(204)
    } else {
        res.send(404)
    }

   })

app.put('/videos/:id',(req: Request, res: Response)=>{
    const id = +req.params.id;
    let video = videos.find(y => y.id === id)
     if (!!video) {
        video.title = req.body.title
        res.send(video)
     } else {
         res.send(404)
     }

})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})