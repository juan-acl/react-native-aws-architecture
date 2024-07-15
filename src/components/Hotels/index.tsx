import { useRef } from "react";
import { Text, View, FlatList } from "react-native";
import { useFetchHotelsQuery } from "@/src/redux/api/hotel.api";
import { Card } from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { RootState } from "@/src/redux/configureStore";
import { setFilterText } from "@/src/redux/slices/hotel.slice";
import BottomSheet from "@gorhom/bottom-sheet";
import { FetchHotelsQuery, HotelMap, Hotel } from "types/hotel";
import { ActionSheetHotel } from "./BottomSheet";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/navigator/types/navigationStack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { setHeaderShow } from "@/src/redux/slices/hotel.slice";
import { styles } from "./styles";

const Hotels = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const filterText = useSelector(
    (state: RootState) => state.reducer.hotels.filterText,
  );
  const { data } = useFetchHotelsQuery<FetchHotelsQuery>("");
  const dispatch = useDispatch();
  const [hotels, setHotels] = useState<Hotel[]>([]);

  const onChangeText = () => {
    if (!filterText) {
      setHotels(data?.hotels);
      return;
    }
    const filteredHotels: Hotel[] = data?.hotels?.filter((hotel: HotelMap) => {
      let arrayPropertiesForFilter = ["name", "address", "phone"];
      let filterHotelsResult = arrayPropertiesForFilter.some((key: string) => {
        return hotel[key].toLowerCase()?.includes(filterText?.toLowerCase());
      });
      return filterHotelsResult;
    });
    setHotels(filteredHotels);
  };

  useFocusEffect(
    useCallback(() => {
      setHotels(data?.hotels);
    }, [data]),
  );

  useFocusEffect(
    useCallback(() => {
      onChangeText();
    }, [filterText]),
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(setFilterText({ filterText: "" }));
      };
    }, []),
  );

  const handleOpenPress = () => {
    dispatch(setHeaderShow({ show: false }));
    bottomSheetRef.current?.expand();
  };

  return (
    <>
      {hotels?.length === 0 ? (
        <View style={styles.continerText}>
          <Text style={styles.textNotFoundSearch}>
            No hay hoteles para mostrar.
          </Text>
        </View>
      ) : (
        <FlatList
          data={hotels}
          keyExtractor={(hotel: Hotel): string => hotel.id.toString()}
          renderItem={({
            item: hotel,
            index,
          }: {
            item: Hotel;
            index: number;
          }) => (
            <Card
              showActionSheet={handleOpenPress}
              key={index}
              hotelInformation={hotel}
            />
          )}
        />
      )}
      <ActionSheetHotel bottomSheetRef={bottomSheetRef} />
    </>
  );
};
export default Hotels;
