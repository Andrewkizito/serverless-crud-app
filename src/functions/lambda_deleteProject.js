const AWS = require("aws-sdk");

exports.handler = async (event) => {
  const id = event.pathParameters.id;
  //Definining dynamodb table
  const db = new AWS.DynamoDB.DocumentClient();

  try {
    await db
      .delete({
        TableName: process.env.TABLE_NAME,
        Key: {
          PK: "PROJECTS",
          SK: id,
        },
      })
      .promise();
    return {
      statusCode: 200,
      body: JSON.stringify("Project Deleted Successfully"),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error.message),
    };
  }
};
