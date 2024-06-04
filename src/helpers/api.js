import { post } from "aws-amplify/api";

export const getHotels = async () => {
  try {
    const restOperation = post({
      apiName: "hoteleria",
      path: "hotels/getHotels",
    });
    const response = await restOperation.response;
    console.log("GET call succeeded: ", response);
  } catch (error) {
    console.log("GET call failed: ", JSON.parse(error.response.body));
  }
};
