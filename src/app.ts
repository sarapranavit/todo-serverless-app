import express, {json} from 'express'
import todoRoutes from './routes/todoRoute'


const app = express();
app.use(json());
app.use(todoRoutes)


app.get('/', (_, res) => {
    res.json( {
        msg: 'Hello world',
    })
})

export { app }