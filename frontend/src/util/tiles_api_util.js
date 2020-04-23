import axios from "axios"

export const fetchTiles = () => {
    return axios.get("/api/tiles")
}