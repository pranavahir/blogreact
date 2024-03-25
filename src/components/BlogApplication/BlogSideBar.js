import React, { useState } from 'react';
import CreateBlogModal from '../Popup/CreateBlog';
const BlogSidebar = (props) => {
    const [show,setShow] = useState(false)
    const LogOut = () => {
      localStorage.clear()
      window.location.reload(true)
    }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:"#00b7eb"}}>
  <div className="container-fluid">
    <a className="navbar-brand">Blog Website</a>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item" style={{cursor:"pointer"}}>
          <a className={props.nav === "allblogs"?"nav-link active":"nav-link inactive"} aria-current="page" onClick={() => props.setNav("allblogs")}>All Blogs</a>
        </li>
        <li className="nav-item" style={{cursor:"pointer"}}>
          <a className={props.nav === "myblogs"?"nav-link active":"nav-link inactive"} aria-current="page" onClick={() => props.setNav("myblogs")}>My Blogs</a>
        </li>
      </ul>
      {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-light" type="submit">Search</button>
      </form> */}
      <button className="btn btn-outline-light" type="button" onClick={() => setShow(true)}>Add Blog</button>
      <button className="btn btn-danger btn-outline-light" type="button" onClick={() => LogOut()}>Log Out</button>
    </div>
  </div>
</nav>
<CreateBlogModal show={show} handleClose={() => setShow(false)} setNav={props.setNav} setUpdateBlog={props.setUpdateBlog} updateblog={props.updateblog} />
</>
  );
};

export default BlogSidebar;
