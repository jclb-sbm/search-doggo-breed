import axios from "axios";

const axiosDogsApi = axios.create({
  baseURL: "https://dog.ceo/api/"
});

export const getDogList = async () => {
  const { data } = await axiosDogsApi.get("breeds/list/all");
  return Object
    .entries(data.message)
    .map(([key, value]) => ({
      breed: key,
      subBreed: value,
    }));
};

export const getDogBreed = (dogBreed: string) =>
  axiosDogsApi.get(`breed/${dogBreed}/images/random`)
