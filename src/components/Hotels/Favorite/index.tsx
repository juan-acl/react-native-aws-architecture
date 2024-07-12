import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";

export const Favorite: React.FC = () => {
  const [favoritesHotel, setFavoritesHotel] = useState<any>([]);
  return (
    <>
      {favoritesHotel.length === 0 ? (
        <View style={styles.containerWithoutHotels}>
          <Text> Ups! No tienes hoteles favoritos agregados</Text>
        </View>
      ) : (
        <>
          <View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></View>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  containerWithoutHotels: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
