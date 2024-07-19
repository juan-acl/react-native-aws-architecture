/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const bodyParser = require("body-parser");
const express = require("express");
const { RoomDTO } = require("./utils/dtoRoom");
const { v4 } = require("uuid");

const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

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

app.post(path + "/createRoom", async (req, res) => {
  try {
    const propertiesRoomRequired = [
      "PK",
      "SK",
      "name",
      "description",
      "price",
      "type",
      "image",
      "available",
    ];
    const properties = Object.keys(req.body);
    const isValid = propertiesRoomRequired.every((property) =>
      properties.includes(property)
    );
    if (!isValid) {
      return res.json({
        code: 400,
        message: `Properties required: ${propertiesRoomRequired.join(", ")}`,
      });
    }
    const roomObjetc = {
      PK: req.body.PK,
      SK: "ROOM#" + v4,
      name: { S: req.body.name },
      description: { S: req.body.description },
      price: { N: req.body.price },
      type: { S: req.body.type },
      image: { S: req.body.image },
      available: { BOOL: req.body.available },
    };
    const params = {
      TableName: tableName,
      Item: roomObjetc,
    };
    const command = new PutCommand(params);
    await ddbDocClient.send(command);
    return res.json({
      code: 200,
      message: "Item room inserted successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.json({ code: 500, error });
  }
});

app.post(path + "/getRoomsByHotel", async (req, res) => {
  try {
    const { pk } = req.body;
    if (!pk)
      return res.json({ code: 400, message: "Property PK is required." });
    const params = {
      TableName: tableName,
      IndexName: "hotelNameIndex",
      KeyConditionExpression: "PK = :pk and begins_with(SK, :skPrefix)",
      ExpressionAttributeValues: {
        ":pk": pk,
        ":skPrefix": "ROOM#",
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
    return res.json({ code: 500, error });
  }
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
