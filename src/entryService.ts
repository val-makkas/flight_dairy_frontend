import axios from "axios";
import { Entries, newEntry } from "./types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getDiaries = () => {
    return axios
        .get<Entries[]>(baseUrl)
        .then(res => res.data);
};

export const createDiary = (object: newEntry) => {
    return axios
        .post<newEntry>(baseUrl, object)
        .then(res => res.data)
};
 