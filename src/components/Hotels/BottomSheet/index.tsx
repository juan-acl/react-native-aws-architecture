import React, { useCallback, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

interface Props {
  bottomSheetRef: React.RefObject<BottomSheet>;
}

export const ActionSheetHotel: React.FC<Props> = ({
  bottomSheetRef,
}: Props) => {
  const snapPoints = useMemo(() => [0.1, "50%", "90%"], []);

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        index={1} // initially closed
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // ensure content is centered
  },
});
