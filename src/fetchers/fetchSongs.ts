import axios from "axios";
import { AlbumType } from "../types/musicTypes";

export const fetchSongs = () => {
  return axios
    .get<AlbumType[]>(
      "https://jsound-b63bd-default-rtdb.europe-west1.firebasedatabase.app/.json"
    )
    .then((res) => res.data);
};
