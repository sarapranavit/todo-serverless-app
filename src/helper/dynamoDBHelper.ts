import * as AWS from 'aws-sdk';
import { DataMapper, StringToAnyObjectMap } from '@aws/dynamodb-data-mapper';
import { IDBHelperConfig } from './types'
import { TodoList } from 'src/dao/todo_list_management';

export class DynamoDBHelper {
    private static dBHelperInstance: DynamoDBHelper;
    private mapper: DataMapper;

    constructor(options: IDBHelperConfig){
        AWS.config.update(options.awsConfig);
        let client:AWS.DynamoDB  = (options.dynamoDBConfig.endpoint) ?
            new AWS.DynamoDB(options.dynamoDBConfig) : new AWS.DynamoDB();
        this.mapper = new DataMapper({client});
    }

     /**
     * To create DB helper instance
     * @param options
     */
      public static createInstance(options) {
        DynamoDBHelper.dBHelperInstance = new DynamoDBHelper(options);
        return DynamoDBHelper.dBHelperInstance;
    }

    public static getInstance():DynamoDBHelper  {
        if(!DynamoDBHelper.dBHelperInstance){
            let dbConfig:IDBHelperConfig = {
                awsConfig: {
                    region: ""
                },
                dynamoDBConfig: {
                    endpoint: ""
                }
            };

            dbConfig.awsConfig.region = "us-east-1";
            dbConfig.dynamoDBConfig.endpoint = "http://localhost:8000";
            console.log("Initialized Dynamo DB :", dbConfig);
            return DynamoDBHelper.createInstance(dbConfig);
        }
        return DynamoDBHelper.dBHelperInstance;
    }

    public dbMapper(): DataMapper {
        return this.mapper;
    }
    
     /**
     * To get an item from the table
     * 
     */
      public async getItem(param: StringToAnyObjectMap) {        
        try {
            const data = await this.mapper.get(param);
            return data;
        } catch (error) {
            throw(error);
        }
    }

    public async scanItem() {
        try {
            const data = await this.mapper.scan(TodoList)
            let result = []
            for await (const record of data) {
                console.log(record, data.count, data.scannedCount);
                result.push(record)
            }
            return result;
            
        } catch (error) {
            throw(error);
        }
    }

    public async putItem(param: StringToAnyObjectMap) {

        try {
            const data = await this.mapper.put(param);
            return data;
        } catch (error) {
            throw(error);
        } 
    }

    


}