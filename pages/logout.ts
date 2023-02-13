import {deleteCookie, getCookie, hasCookie, removeCookies} from "cookies-next/lib";
import {useRouter} from "next/router";
import * as request from "@/utils/request";

export default function () {
    const isLogin = hasCookie('auth-token');
    const router = useRouter();
    if (isLogin) {
        request.post('logout').then(res => {
            if (res.status == 1){
                deleteCookie('auth-token');
                router.push('/');
            }
        }).catch(error => {
            console.log(error)
        })
    }
}