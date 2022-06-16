import express, {json} from 'express'
import todoRoutes from './routes/todoRoute'
import { DynamoDBHelper } from './helper/dynamoDBHelper';
import { IDBHelperConfig } from './helper/types'

const initializeDynamoDB = () => {

    let dbConfig:IDBHelperConfig = {
        awsConfig: {
            region: ""
        },
        dynamoDBConfig: {
            endpoint: ""
        }
    };

    dbConfig.awsConfig.region = process.env.REGION;
    dbConfig.dynamoDBConfig.endpoint = (process.env.APP_ENV === "local" ) ? "http://localhost:8000" : "";
    console.log("Initialized Dynamo DB :", dbConfig);
    return DynamoDBHelper.createInstance(dbConfig);
};

const app = express();
initializeDynamoDB();
app.use(json());
app.use(todoRoutes)


app.get('/', (_, res) => {
    res.json( {
        msg: 'Hello world',
    })
})




export { app }