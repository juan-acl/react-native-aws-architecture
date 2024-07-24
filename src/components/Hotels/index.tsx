import { useRef } from "react";
import { Text, View, FlatList } from "react-native";
import { useFetchHotelsQuery } from "@/src/redux/api/hotel.api";
import { Card } from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "@/src/redux/configureStore";
import {
  setCurrentTabNavigation,
  setFilterText,
} from "@/src/redux/slices/hotel.slice";
import BottomSheet from "@gorhom/bottom-sheet";
import { FetchHotelsQuery, HotelMap, Hotel } from "types/hotel";
import { ActionSheetHotel } from "./BottomSheet";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/navigator/types/navigationStack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { setHeaderShow, getHotelsApp } from "@/src/redux/slices/hotel.slice";
import { ModalHotel } from "./ModalHotel";
import { styles } from "./styles";

const Hotels = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const filterText = useSelector(
    (state: RootState) => state.reducer.hotels.filterText
  );
  // const { data } = useFetchHotelsQuery<FetchHotelsQuery>("");
  const dispatch = useAppDispatch();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const data = useAppSelector((state) => state.reducer.hotels.hotels);

  const onChangeText = () => {
    if (!filterText) {
      setHotels(data);
      return;
    }
    const filteredHotels: Hotel[] = data?.filter((hotel: HotelMap) => {
      let arrayPropertiesForFilter = ["name", "address", "phone"];
      let filterHotelsResult = arrayPropertiesForFilter.some(
        (property: string) => {
          return hotel[property]
            .toLowerCase()
            ?.includes(filterText?.toLowerCase());
        }
      );
      return filterHotelsResult;
    });
    setHotels(filteredHotels);
  };

  useFocusEffect(
    useCallback(() => {
      setHotels(data);
    }, [data])
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(getHotelsApp());
      onChangeText();
    }, [filterText])
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(
        setCurrentTabNavigation({ currentScreenTabNavigation: "hotels" })
      );
      return () => {
        dispatch(setFilterText({ filterText: "" }));
        dispatch(setCurrentTabNavigation({ currentScreenTabNavigation: "" }));
      };
    }, [])
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
          ListFooterComponent={<View style={{ marginBottom: 75 }} />}
          ListHeaderComponent={<View style={{ marginTop: 40 }} />}
          scrollToOverflowEnabled={false}
          keyExtractor={(hotel: Hotel): string => hotel.PK.toString()}
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
      <ModalHotel />
    </>
  );
};
export default Hotels;
