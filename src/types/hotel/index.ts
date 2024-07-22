import BottomSheet from "@gorhom/bottom-sheet";

export const enum AsyncThunkTypes {
  CREAN_CURRENT_HOTEL = "hotel/creanCurrentHotel",
}

export interface PropsHeader {
  onClickAddFavorite: () => void;
  onClickShare: () => void;
}

export interface PropsBottomSheetHoteles {
  bottomSheetRef: React.RefObject<BottomSheet>;
}

export interface RegisterOnChangeProps {
  value: string;
  name: string;
}

export interface FetchHotelsQuery {
  data: fetchHotel;
  error: string;
  isLoading: boolean;
}

interface fetchHotel {
  code: number;
  count: number;
  hotels: Hotel[];
}

export interface HotelMap {
  [key: string]: any;
}

export interface HotelState {
  hotels: Hotel[];
  filterText: string;
  headerShow: boolean;
  currentHotel: Hotel | null;
  currentScreenTabNavigation: string;
  showModalHotel: boolean;
}

export interface Hotel {
  PK: number;
  SK: string;
  image: string;
  rating: number;
  email: string;
  name: string;
  address: string;
  createAt: string;
  updateAt: string;
  phone: string;
  active: boolean;
}
