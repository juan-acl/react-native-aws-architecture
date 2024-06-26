import {ScrollView, Text} from "react-native";
import {useFetchHotelsQuery} from "@/src/redux/api/hotel.api";
import {Hotel} from "@/src/redux/slices/hotel.slice";
import {Card} from "./Card";
import {useDispatch, useSelector} from "react-redux";
import {useState, useCallback} from "react";
import {useFocusEffect} from '@react-navigation/native';
import {RootState} from "@/src/redux/configureStore";
import {setFilterText} from "@/src/redux/slices/hotel.slice";
import {useDisclose} from "native-base";
import {ActionSheetHotel} from "./ActionSheet";

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

const Hotels = () => {
    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();
    const filterText = useSelector((state: RootState) => state.reducer.hotels.filterText);
    const {data} = useFetchHotelsQuery<FetchHotelsQuery>("");
    const dispatch = useDispatch();
    const [hotels, setHotels] = useState<Hotel[]>([]);

    const onChangeText = () => {
        if (!filterText) {
            setHotels(data?.hotels);
            return;
        }
        const filteredHotels = data?.hotels?.filter((hotel: HotelMap) => {
            let arrayFilterParams = ["name", "address", "phone"];
            let filterResult = arrayFilterParams.some((key: string) => {
                return hotel[key].toLowerCase()?.includes(filterText?.toLowerCase())
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

    useFocusEffect(
        useCallback(() => {
            onChangeText();
        }, [filterText])
    )

    useFocusEffect(
        useCallback(() => {
            return () => {
                dispatch(setFilterText({filterText: ""}));
            }
        }, [])
    )

    return (
        <>
            <ScrollView
                contentContainerStyle={{paddingBottom: 80, paddingTop: 65}}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {hotels?.length === 0 ? <Text style={{marginTop: 70}}> Not found your search </Text> :
                    hotels?.map((hotel, index) => (
                        <Card showActionSheet={onOpen} key={index} address={hotel?.address} nameHotel={hotel?.name}
                              phone={hotel?.phone}/>
                    ))
                }
            </ScrollView>
            {isOpen && <ActionSheetHotel isOpen={isOpen} onClose={onClose}/>}
        </>
    );
}

export default Hotels;