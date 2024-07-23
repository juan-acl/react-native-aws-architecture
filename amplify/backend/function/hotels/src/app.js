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
  PutCommand,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const bodyParser = require("body-parser");
const express = require("express");
const { v4 } = require("uuid");
const { HotelDTO } = require("./utils/dtoHotel");

const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

let tableName = "hoteleria";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

const path = "/hotels";
const skPrefixHotel = "HOTEL#";
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

app.post(path + "/createHotel", async (req, res) => {
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
      SK: skPrefixHotel,
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      image: req.body.image,
    };
    const params = {
      TableName: tableName,
      Item: hotelObjetc,
    };
    const command = new PutCommand(params);
    await ddbDocClient.send(command);
    return res.json({
      code: 200,
      message: "Item hotel inserted successfully.",
    });
  } catch (error) {
    return res.json({ code: 500, message: error.message });
  }
});

app.post(path + "/getHotels", async function (req, res) {
  try {
    const params = {
      TableName: tableName,
      IndexName: "hotelNameIndex",
      KeyConditionExpression: "SK = :skPrefix",
      ExpressionAttributeNames: {
        "#name": "name",
      },
      ExpressionAttributeValues: {
        ":skPrefix": skPrefixHotel,
      },
      ProjectionExpression: "PK, #name, address, phone, email, image",
    };
    const command = new QueryCommand(params);
    const response = await ddbDocClient.send(command);
    const dataHotelMapping = HotelDTO(response.Items);
    return res.json({
      code: 200,
      message: "Hotel items loaded successfully.",
      count: response.Count,
      hotels: dataHotelMapping,
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
