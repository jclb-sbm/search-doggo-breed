import axios from "axios";

export const getDogBreed = (dogBreed: string) =>
  axios.get(`https://dog.ceo/api/breed/${dogBreed}/images/random`)

