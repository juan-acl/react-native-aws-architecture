exports.ReservationHotelDTO = (data) => {
  let dataModel = data.map((hotel) => {
    return {
      id: hotel?.id,
      sk: hotel?.SK,
      name: hotel?.name || null,
      address: hotel?.address || null,
      phone: hotel?.phone || null,
      email: hotel?.email || null,
      image: hotel?.image || null,
    };
  });
  return dataModel;
};
