import axios from "axios";

const api = axios.create({
    baseURL: "https://sakhi-nltm.onrender.com/api/v1",
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    }
})

export default api;
