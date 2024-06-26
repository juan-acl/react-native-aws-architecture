import {ScrollView, View, Text} from "react-native";
import {useFetchHotelsQuery} from "@/src/redux/api/hotel.api";
import {Hotel} from "@/src/redux/slices/hotel.slice";
import {Card} from "./Card";
import {
    VStack,
    Input,
    Icon,
} from 'native-base';
import {MaterialIcons} from '@expo/vector-icons';
import {useDispatch} from "react-redux";
import {useState, useCallback} from "react";
import { useFocusEffect } from '@react-navigation/native';

interface FetchHotelsQuery {
    data: fetchHotel;
    error: string;
    isLoading: boolean;
}

interface fetchHotel {
    code: number;
    count: number;
    hotels: Hotel[];
}

interface HotelMap {
    [key: string]: any;
}

export const Hotels = () => {
    const {data} = useFetchHotelsQuery<FetchHotelsQuery>("");
    const dispatch = useDispatch();
    const [hotels, setHotels] = useState<Hotel[]>([]);

    const onChangeText = (text: string) => {
        if (!text) {
            setHotels(data?.hotels);
            return;
        }
        const filteredHotels = data?.hotels?.filter((hotel: HotelMap) => {
            let arrayFilterParams = ["name", "address", "phone"];
            let filterResult = arrayFilterParams.some((key: string) => {
                return hotel[key].toLowerCase()?.includes(text?.toLowerCase())
            })
            return filterResult;
        })
        setHotels(filteredHotels);
    }

    useFocusEffect(
        useCallback(() => {
            setHotels(data?.hotels);
        }, [data])
    )

    return (
        <View>
            <VStack w="90%" space={5} alignSelf="center" style={{marginTop: 10}}>
                <Input
                    placeholder="Search Hotels & Places"
                    width="100%"
                    borderRadius="4"
                    py="3"
                    px="1"
                    fontSize="14"
                    onChangeText={onChangeText}
                    InputLeftElement={
                        <Icon
                            m="2"
                            ml="3"
                            size="6"
                            color="gray.400"
                            as={<MaterialIcons name="search"/>}
                        />
                    }
                    InputRightElement={
                        <Icon
                            m="2"
                            mr="3"
                            size="6"
                            color="gray.400"
                            as={<MaterialIcons name="mic"/>}
                        />
                    }
                />
            </VStack>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{marginBottom: 50}}
            >
                {hotels?.length === 0 ? <Text> Not found your search </Text> :
                    hotels?.map((hotel, index) => (
                        <Card key={index} address={hotel?.address} nameHotel={hotel?.name} phone={hotel?.phone}/>
                    ))

                }
            </ScrollView>
        </View>
    );
}