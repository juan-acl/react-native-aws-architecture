import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

interface Reservation {
  id: number;
  idHotel: number;
  nameHotel: string;
  address: string;
  phone: string;
  daysReservations: number;
  date: Date;
}

export const Reservations = () => {
  const [Reservations, setReservations] = useState<Reservation[]>([]);
  return (
    <>
      {Reservations.length === 0 ? (
        <View style={styles.containerWithoutReservation}>
          <Text> Ups! No tienes reservaciones agregadas</Text>
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
            >
              {Reservations.map((reservation: Reservation, index: number) => {
                return <></>;
              })}
            </View>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  containerWithoutReservation: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
