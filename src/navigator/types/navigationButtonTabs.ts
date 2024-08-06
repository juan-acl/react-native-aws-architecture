import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RoutesNameScreensHotelsTabs } from "../tabs/nameScreensTabs";

export type RootButtonTabParamList = {
  [RoutesNameScreensHotelsTabs.Hotels]: undefined;
  [RoutesNameScreensHotelsTabs.Favorite]: undefined;
  [RoutesNameScreensHotelsTabs.Reservaciones]: undefined;
  [RoutesNameScreensHotelsTabs.Profile]: undefined;
};

export type HotelsProps = BottomTabNavigationProp<
  RootButtonTabParamList,
  RoutesNameScreensHotelsTabs.Hotels
>;
