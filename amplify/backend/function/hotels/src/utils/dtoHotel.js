exports.HotelDTO = (dataHotel) => {
  let hotelMapping = dataHotel.map((hotel) => {
    return {
      PK: hotel?.PK || null,
      SK: "HOTEL#",
      name: hotel?.name || null,
      address: hotel?.address || null,
      phone: hotel?.phone || null,
      email: hotel?.email || null,
      image: hotel?.image || null,
      rating: hotel.rating || null,
      createdAt: hotel?.createdAt || null,
      updatedAt: hotel?.updatedAt || null,
    };
  });
  return hotelMapping;
};
