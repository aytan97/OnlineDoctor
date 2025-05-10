import axios from "axios";
import qs from "qs";
import {
    requestErrorInterceptor,
    requestInterceptor,
    responseErrorInterceptor,
    responseInterceptor,
} from "./../redux/intercepters";

const http = axios.create({
    baseURL: "https://online-doctorapi.vercel.app/",
    headers: {
        "Content-Type": "application/json",
    },
    paramsSerializer: (params) => {
        return qs.stringify(params, { encode: false });
    },
});

http.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
http.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export default http;

