import { post } from "aws-amplify/api";
import { APP_NAME } from "@/src/constants"

export const getHotels = async () => {
  try {
    const restOperation = post({
      apiName: APP_NAME,
      path: "/hotels/getHotels",
      options: {
        body: {
          message: "Message",
        },
      },
    });
    const { body } = await restOperation.response;
    const response = await body.json();
    return response;
  } catch (e) {
    console.log("POST call failed: ", e);
  }
};
