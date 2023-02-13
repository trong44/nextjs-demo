import {hasCookie} from "cookies-next/lib";
import * as request from "@/utils/request";

export const checkLogin = async () => {
    if (!hasCookie('auth-token')) {
        return false
    }
    else {
        return await request.get('profile');
    }
}