import express, {Request, Response} from 'express'
import cors from 'cors'
import {videosRouter} from "./routes/videos-routes";
//import bodyParser from 'body-parser'

const app = express()
const port = process.env.PORT || 5001
app.use(cors())
app.use(express.json())
app.use('/videos', videosRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello: World!!!')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})