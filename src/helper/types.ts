export interface IAwsConfig {
    region: string;
    accessKeyId?: string;
    secretAccessKey?: string;
}

export interface IDynamoDbConfig {
    endpoint: string;
}

export interface IDBHelperConfig {
    awsConfig: IAwsConfig,
    dynamoDBConfig?: IDynamoDbConfig
}