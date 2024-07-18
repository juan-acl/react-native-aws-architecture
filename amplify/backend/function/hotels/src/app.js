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
  UpdateCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const bodyParser = require("body-parser");
const express = require("express");
const { v4 } = require("uuid");
const { HotelDTO } = require("./utils/dto");

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
const path = "/hotels";
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

app.post(path + "/getHotelById", async (req, res) => {
  try {
    const { idHotel } = req.body;
    if (!idHotel)
      return res.json({ code: 400, message: "IdHotel is required!" });
    const params = {
      TableName: tableName,
      Key: {
        id: idHotel,
      },
    };
    const command = new GetCommand(params);
    const response = await ddbDocClient.send(command);
    return res.json({ code: 200, message: "Hotel", hotel: response.Item });
  } catch (error) {
    return res.json({ code: 500, message: "Internal server error" + error });
  }
});

app.post(path + "/createHotel", async (req, res) => {
  try {
    if (!req.body)
      return res.json({ code: 400, message: "Data hotel not provided" });
    const params = {
      TableName: tableName,
      Item: {
        ...req.body,
      },
    };
    const command = new PutCommand(params);
    await ddbDocClient.send(command);
    return res.json({ code: 200, message: "Hotel created successful" });
  } catch (error) {
    return res.json({ code: 500, message: "Internal server error" + error });
  }
});

app.post(path + "/insert", async (req, res) => {
  try {
    const propertiesRequired = ["name", "address", "phone", "email", "image"];
    const properties = Object.keys(req.body);
    const isValid = propertiesRequired.every((property) =>
      properties.includes(property)
    );
    if (!isValid) {
      return res.json({
        code: 400,
        message: `Properties required: ${propertiesRequired.join(", ")}`,
      });
    }
    const hotelObjetc = {
      PK: v4(),
      SK: "HOTEL#",
      name: { S: req.body.name },
      address: { S: req.body.address },
      phone: { S: req.body.phone },
      email: { S: req.body.email },
      image: { S: req.body.image },
    };
    const params = {
      TableName: "hoteleria-dev",
      Item: hotelObjetc,
    };
    const command = new PutCommand(params);
    await ddbDocClient.send(command);
    return res.json({ code: 200, message: "Items inserted successfully." });
  } catch (error) {
    return res.json({ code: 500, message: error.message });
  }
});

app.post(path + "/getHotels", async function (req, res) {
  try {
    const params = {
      TableName: "hoteleria-dev",
      IndexName: "hotelNameIndex",
      KeyConditionExpression: "SK = :skPrefix",
      ExpressionAttributeValues: {
        ":skPrefix": "HOTEL#",
      },
    };
    const command = new QueryCommand(params);
    const response = await ddbDocClient.send(command);
    const dataMapping = HotelDTO(response.Items);
    return res.json({
      code: 200,
      count: response.Count,
      hotels: dataMapping,
    });
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: "Could not load items: " + err.message });
  }
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
