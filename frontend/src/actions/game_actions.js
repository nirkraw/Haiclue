export const STORE_ROOM_NAME = "STORE_ROOM_NAME";

export const storeRoomName = (roomName) => {
  return {
    type: STORE_ROOM_NAME,
    roomName,
  };
};
