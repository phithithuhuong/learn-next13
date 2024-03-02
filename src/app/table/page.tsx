"use client"
import CreateModal from "@/components/create.model";
import { useState } from "react";
import { Button } from "react-bootstrap";
import useSWR, { mutate } from "swr";
import Link from 'next/link'
import { toast } from "react-toastify";

const Table = () => {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const [itemUpdate, setItemUpdate] = useState<any>()
    const { data, error, isLoading } = useSWR(
        "http://localhost:8000/blogs",
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );
    const [show, setShow] = useState(false);

    const onEdit = (item: any) => {
        setShow(true);
        setItemUpdate(item)
    }
    const oneDelete = (id: any) => {
        const isConfirmed = window.confirm("Do you want to delete?");
        if (!isConfirmed) {
            return; 
        }
        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(res => {
                if (res) {
                    toast.success("Delete done!");
                    mutate("http://localhost:8000/blogs")
                }
            });
    }

    if (isLoading) {
        return <div>Loading....</div>
    }
    return <div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
            <h3 >Table</h3>
            <Button
                onClick={() => setShow(true)}
                variant="primary">Add new</Button>
        </div>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {data && data
                    .slice()
                    .sort((a: any, b: any) => b.id - a.id)
                    .map((item: any, index: number) =>
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.title}</td>
                            <td>{item.author}</td>
                            <td>
                                <Link href={`/table/${item.id}`} className=" btn btn-primary">View</Link>
                                <Button
                                    onClick={() => onEdit(item)}
                                    style={{ marginLeft: "10px", marginRight: "10px" }} className="" variant="success">Edit</Button>
                                <Button
                                    onClick={() => oneDelete(item.id)}
                                    variant="danger">Delete</Button>
                            </td>
                        </tr>
                    )
                }

            </tbody>
        </table>
        <CreateModal
            setItemUpdate={setItemUpdate}
            itemUpdate={itemUpdate}
            setShow={setShow} show={show} />
    </div>
}
export default Table;
