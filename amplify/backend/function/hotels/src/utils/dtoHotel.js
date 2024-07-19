exports.HotelDTO = (dataHotel) => {
  let hotelMapping = dataHotel.map((hotel) => {
    return {
      PK: hotel?.PK || null,
      SK: hotel?.SK || null,
      name: hotel?.name?.S || null,
      address: hotel?.address?.S || null,
      phone: hotel?.phone?.S || null,
      email: hotel?.email?.S || null,
      image: hotel?.image?.S || null,
      rating: hotel.rating || null,
      createdAt: hotel?.createdAt || null,
      updatedAt: hotel?.updatedAt || null,
    };
  });
  return hotelMapping;
};
