import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import axios from "axios";
// import * as AWS from "aws-sdk";

import schema from "./schema";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  let query = `mutation { delete_subscribers_from_board(board_id: ${event.body.boardId}, user_ids: ${event.body.userId}) { id }}`;

  const response = await axios({
    url: "https://api.monday.com/v2",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjEzMzg0MTgwOSwidWlkIjoyNjA2MjgzOSwiaWFkIjoiMjAyMS0xMS0xOVQxMzoxODo0My4wODNaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTA0NjcwNTEsInJnbiI6InVzZTEifQ.DQg95S3fXRefbOFnYCf4b_dscoyeXwMBhXo7G1YMNME",
    },
    data: JSON.stringify({
      query: query,
    }),
  });
  return formatJSONResponse({
    message: response.data,
    event,
  });
};

export const main = middyfy(hello);
