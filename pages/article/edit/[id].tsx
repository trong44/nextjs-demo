import React, {useEffect, useState} from "react";
import Form from "@/components/form/article/create_edit";
import * as api from "@/utils/api";
import {useRouter} from "next/router";


export async function getServerSideProps(context:any) {
    const res = await api.get(`items/${context.query.id}`);
    return {
        props: {
            item:res
        }
    }
}

export default function Edit({item}:any) {

    return <>
        <Form
        data={
            {
                title:item.title,
                description:item.description,
                content:item.content,
            }
        }
        />
    </>
}