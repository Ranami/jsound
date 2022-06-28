import axios from "axios";
import { SongType } from "../types/songType";

export const fetchTodos = () => {
  return axios
    .get<SongType[]>(
      "https://jsound-b63bd-default-rtdb.europe-west1.firebasedatabase.app/songs.json"
    )
    .then((res) => res.data);
};
