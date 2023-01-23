import axios from "axios";

export const validateEmail = (email: string) =>
  axios.get('https://emailvalidation.abstractapi.com/v1/', {
    params: {
      email,
      api_key: import.meta.env.VITE_EMAIL_VALIDATION_API_KEY
    }
  })

