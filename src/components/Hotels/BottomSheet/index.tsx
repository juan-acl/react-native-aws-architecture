import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { styles } from "./bottomSheet.styles";

interface Props {
  bottomSheetRef: React.RefObject<BottomSheet>;
}

export const ActionSheetHotel: React.FC<Props> = ({
  bottomSheetRef,
}: Props) => {
  const snapPoints = useMemo(() => [0.1, "50%", "90%"], []);

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        index={1}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};
