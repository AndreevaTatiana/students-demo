import {videos} from './db'

//const videos = []

export const videosRepository = {
    getVideos() {
        return videos;
    },
    getVideoById(id: number) {
        let video = videos.find(v => v.id === id)
        return video
    },
    deleteVideoById(id: number) {
        let video = videos.find(y => y.id === id)
        if (!!video) {
           const newVideos = videos.filter((y) => y.id !== id)
            return true
        }
        return false
    },
    updateVideoById(id: number, title: string) {
        let video = videos.find(v => v.id === id)
        if (!!video) {
            video.title = title
            return true;
        }
        return false;
    },
    createVideo(title: string) {
        const newVideo = {
            id: +(new Date()),
            //id: Math.floor(Math.random() * 10000),
            title: title,
            author: 'it-incubator.eu'
            //author: req.body.author
        }
        videos.push(newVideo)
        return newVideo
    }
    }