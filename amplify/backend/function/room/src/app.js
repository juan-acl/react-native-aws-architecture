/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const bodyParser = require("body-parser");
const express = require("express");
const { RoomDTO } = require("./utils/dtoRoom");
const { ErrorHandlerAsync } = require("./utils/errorHandler");

const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

const sortKeyPrefix = "ROOM#";
let tableName = "hoteleria";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

const path = "/room";

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.all(path + "/testing", async (req, res) => {
  try {
    return res.json({ success: "testing" });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

app.post(path + "/getRoomsByHotel", async (req, res) => {
  try {
    const { pk } = req.body;
    if (!pk)
      return res.json({ code: 400, message: "Property PK is required." });
    const params = {
      TableName: tableName,
      KeyConditionExpression: "PK = :pk AND begins_with(SK, :skPrefix)",
      ExpressionAttributeValues: {
        ":pk": pk,
        ":skPrefix": sortKeyPrefix,
      },
    };
    const command = new QueryCommand(params);
    const response = await ddbDocClient.send(command);
    const mappingRoom = RoomDTO(response.Items);
    return res.json({
      code: 200,
      count: response.Count,
      rooms: mappingRoom,
    });
  } catch (error) {
    console.log(error);
    return res.json({ code: 500, error: error.message });
  }
});

app.post(
  path + "/getRoomsAvailableByHotel",
  ErrorHandlerAsync(async (req, res) => {
    try {
      const { pk } = req.body;
      if (!pk)
        return res.json({ code: 400, message: "Property PK is required." });
      let valueStatusRoom = "available";
      const statusRoom = {
        available: 1,
      }[valueStatusRoom];
      const params = {
        TableName: tableName,
        IndexName: "PK-available-index",
        KeyConditionExpression: "PK = :pk AND #available = :available",
        ExpressionAttributeNames: {
          "#available": "available",
        },
        ExpressionAttributeValues: {
          ":pk": pk,
          ":available": statusRoom,
        },
      };
      const command = new QueryCommand(params);
      const response = await ddbDocClient.send(command);
      const mappingRoom = RoomDTO(response.Items);
      return res.json({
        code: 200,
        count: response.Count,
        rooms: mappingRoom,
      });
    } catch (error) {
      console.log(error);
      return res.json({ code: 500, error: error.message });
    }
  })
);

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
