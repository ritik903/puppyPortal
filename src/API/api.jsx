import axios from "axios";

const API_BASE = "https://api.thedogapi.com/v1/";
const API_KEY = "live_vr1O4k4kCJveA8maLVtToUYepCnoBTlWFvL08Z8FR0L7eGodwHCtQdN1iIAaoNO6"; // Replace with your Dog API key


export const completeGetDogs = async () => {
    const response = await axios.get(`${API_BASE}breeds`, {
        headers: { "x-api-key": API_KEY },
    });
    return response.data; // Now returns the full list of breeds
};


export const getDogs = async (page = 1, limit = 10) => {
    const response = await axios.get(`${API_BASE}breeds`, {
        headers: { "x-api-key": API_KEY },
        params: { page, limit },
    });

    return response.data;
};

export const getDogDetails = async (id) => {
    const response = await axios.get(`${API_BASE}breeds/${id}`, {
        headers: { "x-api-key": API_KEY },
    });
    return response.data;
};
