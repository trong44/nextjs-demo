import axios from "axios";

const request = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
})
export const post = async (path:string,options = {}) => {
    const res = await request.post(path, options);
    return res.data;
}
export const get = async (path:string,options = {}) => {
    const res = await request.get(path, {params: options});
    return res.data;
}
export default request