import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { mutate } from "swr";

interface IProps {
    setShow: (v: boolean) => void;
    show: boolean;
    itemUpdate: any;
    setItemUpdate: (item: any) => void

}

function CreateModal({ setShow, show, itemUpdate, setItemUpdate }: IProps) {
    const [content, setContent] = useState<string>("");
    const [title, setTitle] = useState<string>("")
    const [author, setAuthor] = useState<string>("");
    console.log(">>> itemUpdate:", itemUpdate);

    const onSubmit = () => {
        if (!title) {
            toast.error("Not empty")
            return;
        }
        if (!content) {
            toast.error("Not empty ")
            return;
        }
        if (!author) {
            toast.error("Not empty ")
            return;
        };

        if (itemUpdate) {
            fetch(`http://localhost:8000/blogs/${itemUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: title, author: author, content, })
            }).then(res => res.json())
                .then(res => {
                    if (res) {
                        setShow(false)
                        onCLoseModal()
                        toast.success("Update done!");
                        mutate("http://localhost:8000/blogs")
                    }
                });
        } else {
            fetch('http://localhost:8000/blogs', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: title, author: author, content, })
            }).then(res => res.json())
                .then(res => {
                    if (res) {
                        setShow(false)
                        onCLoseModal()
                        toast.success("Create done!");
                        mutate("http://localhost:8000/blogs")
                    }
                });
        }


    }
    useEffect(() => {
        if (itemUpdate) {
            setAuthor(itemUpdate.author);
            setTitle(itemUpdate.title);
            setContent(itemUpdate.content);
        }
    }, [itemUpdate])


    const onCLoseModal = () => {
        setContent("")
        setTitle("")
        setAuthor("")
        setShow(false);
        setItemUpdate(undefined)
    }
    return (
        <>
            <Modal
                show={show}
                size='lg'
                onHide={() => setShow(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title> {itemUpdate ? "Update item" : "Create new item"} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Author</label>
                        <input
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            type="text" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="form-control" id="exampleInputPassword1" />
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => onCLoseModal()}
                        variant="secondary">
                        Close
                    </Button>
                    <Button
                        onClick={() => onSubmit()}
                        variant="primary">{itemUpdate ? "Update" : "Add"}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateModal;