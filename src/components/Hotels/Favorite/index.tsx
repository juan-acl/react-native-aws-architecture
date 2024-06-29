import { View, Text, StyleSheet } from "react-native";
import Card from "../Card";
import React, { useState } from "react";
import { Hotel } from "@/src/redux/slices/hotel.slice";

export const Favorite: React.FC = () => {
    const [favoritesHotel, setFavoritesHotel] = useState<Hotel[]>([]);
    return (
        <>
            {
                favoritesHotel.length === 0
                    ?
                    <View style={styles.containerWithoutHotels} >
                        <Text> Ups! No tienes hoteles favoritos agregados</Text>
                    </View>
                    :
                    <>
                        <View>
                            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    favoritesHotel.map((hotel: Hotel, index: number) => {
                                        return (
                                            <Card key={index} address={hotel.address} nameHotel={hotel.name} phone={hotel.phone} />
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </>
            }
        </>
    )
}

const styles = StyleSheet.create({
    containerWithoutHotels: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})