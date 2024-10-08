import React, { useMemo } from "react";
import { ImageBackground, Text, View, Dimensions } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useAppDispatch, useAppSelector } from "@/src/redux/configureStore";
import { setCleanCurrentHotel } from "@/src/redux/slices/hotel.slice";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootStackParamList } from "@/src/navigator/types/navigationStack";
import {
  setHeaderShow,
  addHotelToFavorite,
} from "@/src/redux/slices/hotel.slice";
import { PropsBottomSheetHoteles } from "@/src/types/hotel";
import hotelBottomSheet from "@/assets/images/hotelBottomSheet.jpeg";
import { Header } from "./share-favorite";
import { styles } from "./bottomSheet.styles";

export const ActionSheetHotel: React.FC<PropsBottomSheetHoteles> = ({
  bottomSheetRef,
}: PropsBottomSheetHoteles) => {
  const dimensionScreen = Dimensions.get("window");
  const dispatch = useAppDispatch();
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();
  const currentHotelInformation = useAppSelector(
    (state) => state.reducer.hotels.currentHotel
  );
  const currentUser = useAppSelector(
    (state) => state.reducer.auth.userInformation
  );
  const isFavoriteHotel = useAppSelector(
    (state) => state.reducer.hotels.isHotelFavorite
  );
  const snapPoints = useMemo(() => [0.00000001, "50%", "100%"], []);

  /**
   * This function handles changes in the bottom sheet state and updates the header visibility accordingly.
   *
   * @param {number} stateShowVisibleBottomSheet
   * - The stateShowVisibleBottomSheet representing the bottom sheet state.
   * - 1 or 2: Bottom sheet is open.
   * - 0: Bottom sheet is closed.
   */
  const onChangeVisibleBottomSheet = async (
    stateShowVisibleBottomSheet: number
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

  const addHotelToFavoriteForUser = () => {
    dispatch(
      addHotelToFavorite({
        idHotel: currentHotelInformation?.PK || "",
        idUser: currentUser?.sub || "",
        isFavoriteHotel,
      })
    );
  };

  const shareHotel = () => {
    console.log("Share hotel");
  };

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: "#4b4b4b" }}
        index={0}
        enablePanDownToClose={true}
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
            <View
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 1,
              }}
            >
              <Header
                onClickAddFavorite={addHotelToFavoriteForUser}
                onClickShare={shareHotel}
              />
            </View>
          </View>
          <View style={styles.flexBottomSheet}>
            <Text style={styles.containerDetailsHotel}>
              {currentHotelInformation?.name}
            </Text>
            <Text style={styles.nameParamsHotel}>Habitaciones</Text>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};
