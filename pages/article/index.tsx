import * as request from "@/utils/api";
import React, {useEffect, useState} from "react"
import {Table, Pagination, Checkbox} from 'rsuite';
import 'rsuite/dist/rsuite.min.css'; // or 'rsuite/dist/rsuite.min.css'

const { Column, HeaderCell, Cell } = Table;

export default function Index() {
    const [articles,setArticles] = useState([]);
    const [limit, setLimit] = React.useState(2);
    const [page, setPage] = React.useState(1);
    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };
    const data = articles.filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
    });
    useEffect(() => {
        request.get('article').then(res => {
            setArticles(res)
        })
    },[])
    const handleCheckAll = (value, checked) => {
        const keys = checked ? articles.map(item => item.id) : [];
        setCheckedKeys(keys);
    };
    const [checkedKeys, setCheckedKeys] = useState([]);
    let checked = false;
    let indeterminate = false;

    const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
        <Cell {...props} style={{ padding: 0 }}>
            <div style={{ lineHeight: '46px' }}>
                <Checkbox
                    value={rowData[dataKey]}
                    inline
                    onChange={onChange}
                    checked={checkedKeys.some(item => item === rowData[dataKey])}
                />
            </div>
        </Cell>
    );
    if (checkedKeys.length === articles.length) {
        checked = true;
    } else if (checkedKeys.length === 0) {
        checked = false;
    } else if (checkedKeys.length > 0 && checkedKeys.length < articles.length) {
        indeterminate = true;
    }
    const handleCheck = (value, checked) => {
        const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value);
        setCheckedKeys(keys);
    };
    return <>
        <Table
            data={data}
            bordered
            cellBordered
            autoHeight
            affixHeader
            affixHorizontalScrollbar
        >
            <Column width={50} align="center">
                <HeaderCell style={{ padding: 0 }}>
                    <div style={{ lineHeight: '40px' }}>
                        <Checkbox
                            inline
                            checked={checked}
                            indeterminate={indeterminate}
                            onChange={handleCheckAll}
                        />
                    </div>
                </HeaderCell>
                <CheckCell dataKey="id" checkedKeys={checkedKeys} onChange={handleCheck} rowData={undefined} />
            </Column>
            <Column align="center" fixed sortable>
                <HeaderCell>Id</HeaderCell>
                <Cell dataKey="id" />
            </Column>

            <Column flexGrow={1} align="center" fixed sortable>
                <HeaderCell>Tiêu đề</HeaderCell>
                <Cell dataKey="title" />
            </Column>
        </Table>
        <div style={{ padding: 20 }}>
            <Pagination
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                maxButtons={5}
                size="xs"
                layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                total={articles.length}
                limitOptions={[10, 30, 50]}
                limit={limit}
                activePage={page}
                onChangePage={setPage}
                onChangeLimit={handleChangeLimit}
            />
        </div>
    </>
}