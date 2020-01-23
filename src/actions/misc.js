import api from "../apis/api";

import { errorReport, timeOut, enqueueDynamicArray } from "./load";
import history from "../history";

export const fetchStores = () => api.get(`/shops/`, timeOut);

export const fetchProducts = () => api.get(`/products/`, timeOut);
