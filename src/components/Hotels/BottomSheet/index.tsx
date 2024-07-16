import React, { useMemo } from "react";
import { ImageBackground, Text, View, Dimensions } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/configureStore";
import { setCleanCurrentHotel } from "@/src/redux/slices/hotel.slice";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootStackParamList } from "@/src/navigator/types/navigationStack";
import { setHeaderShow } from "@/src/redux/slices/hotel.slice";
import { styles } from "./bottomSheet.styles";
import { PropsBottomSheetHoteles } from "@/src/types/hotel";
import hotelBottomSheet from "@/assets/images/hotelBottomSheet.jpeg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ActionSheetHotel: React.FC<PropsBottomSheetHoteles> = ({
  bottomSheetRef,
}: PropsBottomSheetHoteles) => {
  const insets = useSafeAreaInsets();
  const dimensionScreen = Dimensions.get("window");
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();
  const hotelInformation = useSelector(
    (state: RootState) => state.reducer.hotels.currentHotel,
  );
  const snapPoints = useMemo(() => [0.1, "50%", "100%"], []);

  /**
   * This function handles changes in the bottom sheet state and updates the header visibility accordingly.
   *
   * @param {number} stateShowVisibleBottomSheet
   * - The stateShowVisibleBottomSheet representing the bottom sheet state.
   * - 1 or 2: Bottom sheet is open.
   * - 0: Bottom sheet is closed.
   */
  const onChangeVisibleBottomSheet = async (
    stateShowVisibleBottomSheet: number,
  ) => {
    if (stateShowVisibleBottomSheet === 2) {
      dispatch(setHeaderShow({ show: false }));
      return;
    }
    if (
      stateShowVisibleBottomSheet === -1 ||
      stateShowVisibleBottomSheet === 0
    ) {
      await dispatch(setCleanCurrentHotel());
    }
  };

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: "#4b4b4b" }}
        index={0}
        onChange={onChangeVisibleBottomSheet}
      >
        <BottomSheetView style={styles.contentContainerBottomSheet}>
          <View
            style={{
              ...styles.continerImageHotel,
              width: dimensionScreen.width,
              height: dimensionScreen.height,
            }}
          >
            <ImageBackground
              source={hotelBottomSheet}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
          <View style={styles.flexBottomSheet}>
            <Text style={styles.containerDetailsHotel}>
              {hotelInformation?.name}
            </Text>
            <Text style={styles.nameParamsHotel}>Habitaciones</Text>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};
