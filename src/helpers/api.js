import { post } from "aws-amplify/api";

export const getHotels = async () => {
  try {
    const restOperation = post({
      apiName: "hoteleria",
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
    console.log("POST call failed: ", JSON.parse(e.response.body));
  }
};
