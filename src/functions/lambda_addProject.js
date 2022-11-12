const AWS = require("aws-sdk");
const KSUID = require("ksuid");
const crypto = require("crypto");
const { generateDate } = require("/opt/nodejs/utils");

exports.handler = async (event) => {
  const timestamp = new Date().getTime();
  const payload = crypto.randomBytes(16);
  if (event.body) {
    //Definining dynamodb table
    const db = new AWS.DynamoDB.DocumentClient();

    //Parsing event body
    const body = JSON.parse(event.body);
    //Generating id
    const id = KSUID.fromParts(timestamp, payload).string;
    const date_time = generateDate();

    try {
      await db
        .put({
          TableName: process.env.TABLE_NAME,
          Item: {
            PK: "PROJECTS",
            SK: id,
            title: body.title.toLowerCase(),
            description: body.description,
            progress: body.progress,
            project_owner: body.project_owner,
            last_update: null,
            created_at: `${date_time.time}, ${date_time.date}`,
          },
        })
        .promise();
      return {
        statusCode: 200,
        body: JSON.stringify("Project Saved Successfully"),
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify(error.message),
      };
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify("Invalid Request Body"),
    };
  }
};
