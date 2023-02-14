import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import {useRouter} from "next/router";
import * as api from "@/utils/api";
import {toast} from "react-toastify";

type Article = {
    title: string,
    description: string,
    content: string
}
Form.propTypes = {
    data: PropTypes.object.isRequired,
}
Form.defaultProps = {
    data: {}
}
export default function Form(props: { data: Article; }) {
    const [data_form, setDataForm] = useState({
        title:'',
        description:'',
        content:''
    });
    const router = useRouter();
    const [method,setMethod] = useState('store')
    useEffect(() => {
        if (Object.keys(props.data).length !== 0) {
            setDataForm(props.data);
            setMethod('update')
        }
    }, [])

    const handleDataForm = (e:any) => {
        setDataForm({
            ...data_form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = () => {
        if (method === 'store') {
            api.post('items',data_form).then(res => {
                if (res.status ===1) {
                    router.push('/article')
                    toast.success(res.message)
                }
            })
        } else if (method === 'update') {
            api.put(`items/${router.query.id}`,data_form).then(res => {
                router.push('/article')
                toast.success(res.message)
            })
        }
    }
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Tiêu đề</label>
                            <input type="text" className="form-control"
                                   name={'title'}
                                   id="exampleFormControlInput1"
                                   value={data_form.title}
                                   onChange={(e) => handleDataForm(e)}
                                   placeholder="Nhập tiêu đề..."/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Mô tả</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1"
                                   name={'description'}
                                   value={data_form.description}
                                   onChange={(e) => handleDataForm(e)}
                                   placeholder="Nhập mô tả..."/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Nội dung</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1"
                                      rows={3}
                                      name={'content'}
                                      onChange={(e) => handleDataForm(e)}
                                      placeholder={'Nhập nội dung'}
                                      value={data_form.content}
                            />
                        </div>
                        <button type={'button'} className={'btn btn-primary'} onClick={handleSubmit}>
                            Lưu thông tin
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}