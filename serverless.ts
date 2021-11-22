import type { AWS } from "@serverless/typescript";

import create from "@functions/createBoard";
import getColumn from "@functions/getColumn";
// import delete from "@functions/delete"
import duplicateBoard from "@functions/duplicateBoard";
import archiveBoard from "@functions/archiveBoard";
import createSubscriber from "@functions/createSubscriber";
import deleteSubscriber from "@functions/deleteSubscriber";
import viewBoard from "@functions/viewBoard";
import activityLog from "@functions/activityLog";
import updateColumnValue from "@functions/updateColumnValue";

const serverlessConfiguration: AWS = {
  service: "slspractice",
  frameworkVersion: "2",
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-dynamodb-local",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    lambdaHashingVersion: "20201221",
  },
  functions: {
    create,
    getColumn,
    duplicateBoard,
    archiveBoard,
    createSubscriber,
    updateColumnValue,
    deleteSubscriber,
    viewBoard,
    activityLog,
  },
  package: { individually: true },
  custom: {
    dynamodb: {
      stages: ["dev"],
      start: {
        port: "8000",
        migrate: true,
      },
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      TypesciptTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "myTable",
          AttributeDefinitions: [
            { AttributeName: "fname", AttributeType: "S" },
          ],
          KeySchema: [{ AttributeName: "fname", KeyType: "HASH" }],
          BillingMode: "PAY_PER_REQUEST",
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
