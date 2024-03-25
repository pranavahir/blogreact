import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { storeBlogs } from "../../redux/actions";
import axios from "axios";
import { toast } from "react-toastify"
import EditBlogModal from "../Popup/EditBlog";
const MyBlog = (props) => {
    const [show,setShow] = useState(false)
    const [page,setPage] = useState(1)
    const [sort,setSort] = useState(-1)
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blogs);
    const [update,setUpdate] = useState(false)
    const [opendropdown,setOpenDropdown] = useState(false)
    useEffect(() => {
        let data = {
            sort:sort,
            pagenumber:page
        }
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_NODE_API_URL}/getBlogsByUserID`,
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
            data:data
        }).then(response => {
            if (response && response.data) {
                if (!response.data.success) {
                    if (response.data.message === "UnAuthorized!") {
                        localStorage.clear()
                        window.location.reload(true)
                    }
                    toast.error(response.data.message)
                    return
                }
                dispatch(storeBlogs(response.data.data));
            }
        })
    }, [update,sort,props.updateblog,page])
    const DeleteBlog = (blogid) => {
        let data = {
            blogid:blogid
        }
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_NODE_API_URL}/deleteBlog`,
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
                toast.success("Blog Deleted Succesfully")
                setUpdate(!update)
            }
        })
    }
    const HandleSort = (sortid) => {
        setPage(1)
        setSort(sortid)
        setOpenDropdown(false)
    }
    return (
        <>
        <div className="container py-5">
        <div className="row mb-4"  style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div className="col">
                    <h2 className="text-left">My Blogs</h2>
                </div>
                <div className="col d-flex justify-content-end">
                    <div className="dropdown">
                        <button className="btn btn-danger dropdown-toggle" type="button" id="sortDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded={opendropdown} onClick={() => setOpenDropdown(!opendropdown)}>
                            Sort by Date
                        </button>
                        <div className={opendropdown?"dropdown-menu-show":"dropdown-menu"} aria-labelledby="sortDropdown">
                            <button className={`dropdown-item rounded-0 border ${sort === -1?"bg-primary text-white":""}`} onClick={() => HandleSort(-1)}>Latest</button>
                            <button className={`dropdown-item rounded-0 border ${sort === 1?"bg-primary text-white":""}`} onClick={() => HandleSort(1)}>Oldest</button>
                        </div>
                    </div>
                </div>
            </div>
            {blogs.map(blog => (
                <>
                <div key={blog._id} className="mb-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <div className="card shadow">
                        <div className="card-body">
                            <h5 className="card-title" style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{blog.title}</h5>
                            <p className="card-text" style={{ fontFamily: 'Georgia, serif', fontSize: '18px', color: '#666' }}>{blog.description}</p>
                            <p className="card-text" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#999' }}>Category: {blog.category}</p>
                            <p className="card-text" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#999' }}>Published: {new Date(blog.createdAt).toLocaleDateString()}</p>
                            <div className="d-flex justify-content-end mt-3"> {/* align buttons to the right */}
                                <button className="btn btn-primary mr-2" onClick={() => setShow(blog._id)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => DeleteBlog(blog._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
        <EditBlogModal show={show === blog._id} handleClose={() => setShow(false)} BlogData={show === blog._id && blog} update={update} setUpdate={setUpdate}/>
                </>
            ))}
            {!blogs.length?<div key={1} className="mb-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <div className="card shadow">
                        <div className="card-body text-center">
                            <h5 className="card-title" style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>No Blogs Found!</h5>
                        </div>
                    </div>
                </div>:""}
                <div className="d-flex justify-content-between mt-3" style={{ maxWidth: '600px', margin: '0 auto' }}>
    <button className="btn btn-secondary" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
    <p className="m-0">Page {page}</p>
    <button className="btn btn-secondary" disabled={blogs.length === 0 || blogs.length !== 100} onClick={() => setPage(page + 1)}>Next</button>
</div>
        </div>
        </>
    );
}

export default MyBlog;