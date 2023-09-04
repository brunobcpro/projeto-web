import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:4000",
    "Content-Type": "application/json",
})

export default axiosInstance