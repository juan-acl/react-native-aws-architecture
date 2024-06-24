import { ScrollView, View, Text } from "react-native";
import { useFetchHotelsQuery } from "@/src/redux/api/hotel.api";
import { Hotel } from "@/src/redux/slices/hotel.slice";
import { Card } from "./Card";
import {
    VStack,
    Input,
    Icon,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from "react-redux";

type FetchHotelsQuery = {
    data: fetchHotel;
    error: string;
    isLoading: boolean;
}

interface fetchHotel {
    code: number;
    count: number;
    hotels: Hotel[];
}

export const Hotels = () => {
    const { data } = useFetchHotelsQuery<FetchHotelsQuery>("");
    const dispatch = useDispatch();

    return (
        <View>
            <VStack w="90%" space={5} alignSelf="center" style={{ marginTop: 10 }} >
                <Input
                    placeholder="Search People & Places"
                    width="100%"
                    borderRadius="4"
                    py="3"
                    px="1"
                    fontSize="14"
                    InputLeftElement={
                        <Icon
                            m="2"
                            ml="3"
                            size="6"
                            color="gray.400"
                            as={<MaterialIcons name="search" />}
                        />
                    }
                    InputRightElement={
                        <Icon
                            m="2"
                            mr="3"
                            size="6"
                            color="gray.400"
                            as={<MaterialIcons name="mic" />}
                        />
                    }
                />
            </VStack>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {
                    data?.hotels?.map((hotel, index) => (
                        <Card key={index} address={hotel?.address} nameHotel={hotel?.name} phone={hotel?.phone} />
                    ))
                }
            </ScrollView>
        </View>
    );
}