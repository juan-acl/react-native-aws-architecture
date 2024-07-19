exports.RoomDTO = (rooms) => {
  return rooms.map((room) => {
    return {
      PK: room?.PK || null,
      SK: room?.SK || null,
      name: room?.name || null,
      description: room?.description || null,
      price: room?.price || null,
      type: room?.type || null,
      image: room?.image || null,
      available: room?.available || null,
    };
  });
};
