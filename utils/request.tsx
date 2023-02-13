import axios from "axios";
import {getCookie, hasCookie} from "cookies-next/lib";

const request = axios.create({
    baseURL: 'https://qltt.truongdang.online/api/v1/',
})

const shop_info = {
    domain: 'qltt-v2.frontend.theme.tichhop.pro',
    secret_key: 'cEhRc1ZhODdzT2xxR0FZTFZkZGcrY3Z0OVF0N3JYeWd0aGVKbjllV2t4Yz0=',
}
export const post = async (path:string,options = {}) => {
    let query:any = {
        ...options,
        ...shop_info,
        token:'',
    }
    if (hasCookie('auth-token')) {
        query.token = getCookie('auth-token');
    }
    const res = await request.post(path, query);
    return res.data;
}
export const get = async (path:string,options = {}) => {
    let query:any = {
        ...options,
        ...shop_info,
        token:'',
    }
    if (hasCookie('auth-token')) {
        query.token = getCookie('auth-token');
    }
    const res = await request.get(path, {params: query});
    return res.data;
}
export default request