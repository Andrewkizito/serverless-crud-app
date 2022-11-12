const AWS = require("aws-sdk");
const { sortProjects } = require("/opt/nodejs/utils");

exports.handler = async (event) => {
  console.log(event);
  //Definining dynamodb table
  const db = new AWS.DynamoDB.DocumentClient();

  try {
    const { Items } = await db
      .query({
        TableName: process.env.TABLE_NAME,
        KeyConditionExpression: "PK = :PK",
        ExpressionAttributeValues: {
          ":PK": "PROJECTS",
        },
        ProjectionExpression:
          "title, description, created_at, social_image ,SK",
      })
      .promise();
    const response = [...Items].sort((a, b) => sortProjects(a, b));
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error.message),
    };
  }
};
