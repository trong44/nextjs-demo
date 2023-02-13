import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Master({ children }:any) {
    return (
        <>
            <div className="container">
                <Header/>
                {children}
                <Footer/>
            </div>
        </>
    )
}