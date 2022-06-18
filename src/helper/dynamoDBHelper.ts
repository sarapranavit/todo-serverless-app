import * as AWS from 'aws-sdk';
import { DataMapper, StringToAnyObjectMap } from '@aws/dynamodb-data-mapper';
import { ConditionExpression } from '@aws/dynamodb-expressions';
import { IDBHelperConfig } from './types'
import { TODO_STATUS } from '../config';
import { TodoList } from '../dao/todo_list_management';

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

            dbConfig.awsConfig.region = process.env.REGION
            dbConfig.dynamoDBConfig.endpoint = (process.env.APP_ENV === "local") ? "http://localhost:8000" : "";
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

            const statusFilter: ConditionExpression = {
                type: 'Equals',
                subject: 'status',
                object: TODO_STATUS.ACTIVE
            };
            const data = this.mapper.scan(TodoList, { filter: statusFilter })
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

    public async queryItem(param: StringToAnyObjectMap, filterConditon?: ConditionExpression ) {

        let resultSet:TodoList[] = [];
        
        const query = await this.mapper.query(TodoList, param, {filter: filterConditon} );

        for await(const item of query) {
            resultSet.push(Object.assign(new TodoList, item))
        }

        return resultSet;
    }

    


}