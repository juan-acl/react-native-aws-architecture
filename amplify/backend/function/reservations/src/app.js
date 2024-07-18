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
const dbDocClient = DynamoDBDocumentClient.from(ddbClient);
const { ReservationHotelDTO } = require("./utils/dto");

let tableName = "hoteleria";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

const path = "/reservations";

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

app.post(path + "/insert", async (req, res) => {
  try {
    const propertiesRequired = [
      "id",
      "sk",
      "name",
      "address",
      "phone",
      "email",
      "image",
    ];
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
      id: req.body.id,
      sk: { S: req.body.sk },
      name: { S: req.body.name },
      address: { S: req.body.address },
      phone: { S: req.body.phone },
      email: { S: req.body.email },
      image: { S: req.body.image },
    };
    const params = {
      TableName: tableName,
      Item: hotelObjetc,
    };
    const command = new PutCommand(params);
    await dbDocClient.send(command);
    return res.json({ code: 200, message: "Items inserted successfully." });
  } catch (error) {
    return res.json({ code: 500, message: error.message });
  }
});

app.post(path + "/getRoomsByHotel", async (req, res) => {
  try {
    const { idHotel, sk } = req.body;
    if (!idHotel || !sk)
      return res.json({ code: 400, message: "All params are required!" });
    const params = {
      TableName: tableName,
      KeyConditionExpression: "id = :pk",
      FilterExpression: "sk =:sk",
      ExpressionAttributeValues: {
        ":pk": req.body.idHotel,
        ":sk": { S: req.body.sk },
      },
    };

    try {
      const command = new QueryCommand(params);
      const result = await dbDocClient.send(command);
      const hotelMapping = ReservationHotelDTO(result.Items);
      return res.json({ code: 200, hotels: hotelMapping, result });
    } catch (error) {
      console.error("Error getting rooms:", error);
      throw error;
    }
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
