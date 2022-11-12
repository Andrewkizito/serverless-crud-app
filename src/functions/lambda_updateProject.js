const AWS = require("aws-sdk");
const { generateDate } = require("/opt/nodejs/utils");

//Function to generate update expression conditionally
const generateExpression = (payload) => {
  let update_expression = "set ";
  if (payload.title) update_expression += "title = :title,";
  if (payload.description) update_expression += "description = :desc,";
  if (payload.progress) update_expression += "progress = :prog,";
  if (payload.project_owner) update_expression += "project_owner = :owner,";
  //Closing the expression
  update_expression += "last_update = :lu";
  return update_expression;
};

//Function to generate values to be updated conditionally
const generateValues = (payload) => {
  const date_time = generateDate();
  let values = {
    ":lu": `${date_time.time}, ${date_time.date}`,
  };
  if (payload.title) values[":title"] = payload.title;
  if (payload.description) values[":desc"] = payload.description;
  if (payload.progress) values[":prog"] = payload.progress;
  if (payload.project_owner) values[":owner"] = payload.project_owner;
  return values;
};

exports.handler = async (event) => {
  if (event.body) {
    //Parsing request body
    const body = JSON.parse(event.body);

    //Checking if payload includes id
    if (!body.id) {
      return {
        statusCode: 404,
        body: JSON.stringify("Project Id Not Found"),
      };
    }

    //Definining dynamodb table
    const db = new AWS.DynamoDB.DocumentClient();

    try {
      await db
        .update({
          TableName: process.env.TABLE_NAME,
          Key: {
            PK: "PROJECTS",
            SK: body.id,
          },
          UpdateExpression: generateExpression(body),
          ExpressionAttributeValues: generateValues(body),
        })
        .promise();
      return {
        statusCode: 200,
        body: JSON.stringify("Project Updated Successfully"),
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
