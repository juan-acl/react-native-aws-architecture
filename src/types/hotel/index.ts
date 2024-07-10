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
  currentHotel: Hotel | null;
}

export interface Hotel {
  id: number;
  name: string;
  address: string;
  createAt: string;
  updateAt: string;
  phone: string;
  active: boolean;
}
