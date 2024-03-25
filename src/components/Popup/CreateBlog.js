import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios"
import {toast} from "react-toastify"
const CreateBlogModal = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const CreateBlog = () => {
    let data = {
        title: title,
        description: description,
        category: category
    }
    axios({
        method: "POST",
        url: `${process.env.REACT_APP_NODE_API_URL}/createBlog`,
        headers: { "Content-Type": "application/json" ,"Authorization": `Bearer ${localStorage.getItem("token")}`},
        data: data
    }).then(response => {
        if(response && response.data){
            if(!response.data.success){
                if(response.data.message === "UnAuthorized!"){
                    localStorage.clear()
                    window.location.reload(true)
                }
                toast.error(response.data.message)
                return
            }
            toast.success("Blog Posted Succesfully")
            props.handleClose()
            props.setNav("myblogs")
            props.setUpdateBlog(!props.updateblog)
            setDescription('')
            setTitle('')
            setCategory('')
        }
    })
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={CreateBlog}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBlogModal;
