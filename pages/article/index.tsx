import * as api from "@/utils/api";
import React, {useEffect, useState} from "react"
import Link from "next/link";
import { Modal,IconButton, Button, ButtonToolbar, Placeholder } from 'rsuite';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Index() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = (e:any) => {
        setItemIDDel(e.target.dataset.id)
        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    const [articles, setArticles] = useState([]);
    const [item_id_del,setItemIDDel] = useState(0);


    useEffect(() => {
        api.get('items').then(res => {
            setArticles(res)
        })
    }, [])

    const handleDelete = () => {
        api.destroy(    `items/${item_id_del}`)
            .then(res => {
                if (res.status == 1) {
                    setOpen(false)
                    removeArticleArray(item_id_del)
                    toast.success(res.message)
                }
            })
    }




    const removeArticleArray = (item_id:any) => {
        const data = articles.filter((item:any) => item.id !== item_id *1);
        setArticles(data);
    }
    return <>

        <Link className={'btn btn-primary'} href={'/article/create'}>Thêm mới</Link>
        <table className="table table-bordered">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Tiêu đề</th>
                <th scope="col">Nội dung</th>
                <th scope="col">Mô tả</th>
                <th scope="col">Thao tác</th>
            </tr>
            </thead>
            <tbody>
            {articles.map((article: any) => {
                return (
                    <tr key={article.id}>
                        <th scope="row" key={article.id}>{article.id}</th>
                        <td>{article.title}</td>
                        <td>{article.content}</td>
                        <td>{article.description}</td>
                        <td>
                            <div className="btn-group btn-group-sm" role="group" aria-label="Second group">
                                <Link className="btn btn-warning" href={`/article/edit/${article.id}`}>Sửa</Link>
                                <button type="button" className="btn btn-danger" onClick={e => handleOpen(e)} data-id={article.id}>Xoá</button>
                            </div>
                        </td>
                    </tr>)
            })}

            {
                !articles.length ?
                    <tr>
                        <td colSpan={5}>
                            <span>
                                Không có bản ghi nào
                            </span>
                        </td>
                    </tr>
                    :
                    ''
            }
            </tbody>
        </table>
        <Modal open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Modal Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Placeholder.Paragraph />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleDelete} appearance="primary">
                    Ok
                </Button>
                <Button onClick={handleClose} appearance="subtle">
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}