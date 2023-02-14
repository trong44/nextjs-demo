import {ToastContainer} from "react-toastify";
import React from "react";

export default function Footer() {
    return <>
        <ToastContainer
            autoClose={2000}
            position="top-center"
        />
        <h2>Đây là footer</h2>
    </>
}