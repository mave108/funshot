import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_END_POINT,
    timeout: 1000,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  });

  export default instance;