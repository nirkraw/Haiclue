export const STORE_ROOM_NAME = "STORE_ROOM_NAME";

// export const storeRoomName = (roomName) => ({
//   type: STORE_ROOM_NAME,
//   roomName,
// });

export const storeRoomName = (roomName) => {
    return({
        type: STORE_ROOM_NAME,
        roomName
    })
};
