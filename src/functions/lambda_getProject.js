const AWS = require("aws-sdk");

exports.handler = async (event) => {
  const db = new AWS.DynamoDB.DocumentClient();
  const id = event.pathParameters.id;
  try {
    const { Item } = await db
      .get({
        TableName: process.env.TABLE_NAME,
        Key: {
          PK: "PROJECTS",
          SK: id,
        },
      })
      .promise();
    return {
      statusCode: Item ? 200 : 404,
      body: JSON.stringify( Item ? Item : "Project Not Found"),
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: error.message,
    };
  }
};
