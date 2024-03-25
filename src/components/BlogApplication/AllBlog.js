import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { storeBlogs } from "../../redux/actions";
import axios from "axios";
import { toast } from "react-toastify"
const AllBlog = (props) => {
    const [search,setSearch] = useState("")
    const [page,setPage] = useState(1)
    const [sort,setSort] = useState(-1)
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blogs);
    const [opendropdown,setOpenDropdown] = useState(false)
    useEffect(() => {
        let data = {
            sort:sort,
            search:search,
            pagenumber:page
        }
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_NODE_API_URL}/getAllBlogs`,
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
    }, [sort,search,page])
    const HandleSort = (sortid) => {
        setSort(sortid)
        setOpenDropdown(false)
        setPage(1)
    }
    const HandleSearch = (e) => {
        setSearch(e.target.value)
        setPage(1)
    }
    return (
        <div className="container py-5">
            <div className="row mb-4"  style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div className="col">
                    <h2 className="text-left">All Blogs</h2>
                </div>
                <div className="col">
            <input className="form-control mr-sm-2" type="search" placeholder="Search Blogs" aria-label="Search" onChange={(e) => HandleSearch(e)}/>
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
                <div key={blog._id} className="mb-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <div className="card shadow">
                        <div className="card-body">
                            <h5 className="card-title" style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{blog.title}</h5>
                            <p className="card-text" style={{ fontFamily: 'Georgia, serif', fontSize: '18px', color: '#666' }}>{blog.description}</p>
                            <p className="card-text" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#999' }}>Category: {blog.category}</p>
                            <p className="card-text" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#999' }}>Published: {new Date(blog.createdAt).toLocaleDateString()}</p>
                            {/* <div className="d-flex justify-content-end mt-3">
                                <button className="btn btn-primary mr-2">Edit</button>
                                <button className="btn btn-danger">Delete</button>
                            </div> */}
                        </div>
                    </div>
                </div>
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

    );
}

export default AllBlog;