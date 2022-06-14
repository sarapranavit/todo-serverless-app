import express, {json} from 'express'


const app = express();
app.use(json());


app.get('/', (_, res) => {
    res.json( {
        msg: 'Hello world',
    })
})

export { app }