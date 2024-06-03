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

const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

let tableName = "hotels";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "id";
const partitionKeyType = "S";
const sortKeyName = "";
const sortKeyType = "";
const hasSortKey = sortKeyName !== "";
const path = "/items";
const UNAUTH = "UNAUTH";
const hashKeyPath = "/:" + partitionKeyName;
const sortKeyPath = hasSortKey ? "/:" + sortKeyName : "";

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

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch (type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
};

app.post(path + "/listHotels", async (req, res) => {
  try {
    const params = {
      TableName: tableName,
    };
    const command = new ScanCommand(params);
    const response = await ddbDocClient.send(command);
    return res.json({ code: 200, hotels: response.Items });
  } catch (error) {
    return res.json({ code: 500, message: error });
  }
});

const generateId = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Función para crear un hotel con datos aleatorios
const createRandomHotel = () => {
  return {
    id: generateId(),
    name: "Hotel " + Math.floor(Math.random() * 1000),
    address: "Address " + Math.floor(Math.random() * 1000),
    phone: "123456789",
    active: Math.random() < 0.5,
    createAt: Date.now(),
    updateAt: Date.now(),
  };
};

// Función para insertar hoteles en lotes
const insertBatch = async (batch) => {
  const putCommands = batch.map(
    (hotel) =>
      new PutCommand({
        TableName: tableName,
        Item: hotel,
      })
  );

  await Promise.all(putCommands.map((command) => ddbDocClient.send(command)));
};

// Función para crear e insertar 200 hoteles en lotes
const createAndInsertHotels = async () => {
  const hotels = [];
  for (let i = 0; i < 200; i++) {
    hotels.push(createRandomHotel());
  }

  const batchSize = 25; // Tamaño del lote
  for (let i = 0; i < hotels.length; i += batchSize) {
    const batch = hotels.slice(i, i + batchSize);
    await insertBatch(batch);
  }

  console.log("Successfully inserted 200 hotels.");
};

app.post(path + "/createHotel", async (req, res) => {
  try {
    await createAndInsertHotels();
    return res.json({ code: 200, message: "Hotels created successfully" });
  } catch (error) {
    console.error("Error inserting hotels:", error);
    return res.json({ code: 500, message: error.message });
  }
});

app.post(path + "/sortHotels", async (req, res) => {
  try {
    const { updateAt } = req.body;

    const params = {
      TableName: tableName,
      KeyConditionExpression: "updateAt >= :updateAt",
      ExpressionAttributeValues: {
        ":updateAt": updateAt,
      },
    };

    const command = new QueryCommand(params);
    const response = await ddbDocClient.send(command);

    return res.json({ code: 200, hotels: response.Items });
  } catch (error) {
    return res.json({ code: 500, message: error.message });
  }
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
