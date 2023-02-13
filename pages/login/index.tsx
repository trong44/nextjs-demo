import {useState} from "react";
import * as request from "@/utils/request";
import {useRouter} from "next/router";
import {setCookie} from "cookies-next/lib";

export default function Login() {
    const router = useRouter();
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember_token, setRememberToken] = useState('');
    const handleRemember = (e: any) => {
        const is_remember = e.target.checked ? '1' : '';
        setRememberToken(is_remember);
    }
    const handleSubmit = () => {
        //call api
        const data_post = {
            username,
            password,
            remember_token
        }
        request.post('login', data_post)
            .then(res => {
                setCookie('auth-token', res.token, {maxAge:res.exp_token});
                router.push('/');
            }).catch(error => {
                setMessage(error.response.data.message)
        })
    }
    return (
        <div className="container">
            <div className="card mt-5">
                <div className="card-body">
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Tên tài khoản..."
                               onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Nhập mật khẩu..."
                               onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" onClick={e => {
                            handleRemember(e)
                        }}/>
                        <label className="form-check-label">Nhớ mật khẩu</label>
                    </div>
                    <div className="form-group">
                        <label className="form-check-label text-danger">{message}</label>
                    </div>

                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Đăng nhập
                    </button>
                </div>
            </div>
        </div>
    )
}