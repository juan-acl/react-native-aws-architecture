import React, { useMemo, useCallback } from "react";
import { Text } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { styles } from "./bottomSheet.styles";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/configureStore";
import { setCleanCurrentHotel } from "@/src/redux/slices/hotel.slice";

interface Props {
  bottomSheetRef: React.RefObject<BottomSheet>;
}

export const ActionSheetHotel: React.FC<Props> = ({
  bottomSheetRef,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const hotelInformation = useSelector(
    (state: RootState) => state.reducer.hotels.currentHotel
  );
  const snapPoints = useMemo(() => [0.1, "50%", "92%"], []);

  /**
   * This function handles changes in the bottom sheet state and updates the header visibility accordingly.
   *
   * @param {number} index
   * - The index representing the bottom sheet state.
   * - 1 or 2: Bottom sheet is open.
   * - 0: Bottom sheet is closed.
   */
  const onChangeVisibleBottomSheet = useCallback((index: number) => {
    if (index === 0) {
      dispatch(setCleanCurrentHotel({}));
    }
  }, []);

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        index={0}
        onChange={onChangeVisibleBottomSheet}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};
