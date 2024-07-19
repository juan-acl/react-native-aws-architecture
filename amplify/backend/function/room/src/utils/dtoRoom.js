exports.RoomDTO = (rooms) => {
  return rooms.map((room) => {
    return {
      PK: room?.PK || null,
      SK: room?.SK || null,
      name: room?.name?.S || null,
      description: room?.description?.S || null,
      price: room?.price?.N || null,
      type: room?.type?.S || null,
      image: room?.image?.S || null,
      available: room?.available?.BOOL || null,
    };
  });
};
