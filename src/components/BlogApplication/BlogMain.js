import React, { useState } from 'react';
import BlogSidebar from './BlogSideBar';
import AllBlog from './AllBlog';
import MyBlog from './MyBlog';
const BlogMain = () => {
  const [nav,setNav] = useState("allblogs")
  const [updateblog,setUpdateBlog] = useState(false)
  return (
        <>
        <BlogSidebar nav={nav} setNav={setNav} setUpdateBlog={setUpdateBlog} updateblog={updateblog}/>
        {nav === "allblogs"?<AllBlog/>:""}
        {nav === "myblogs"?<MyBlog updateblog={updateblog}/>:""}
        </>
  );
};

export default BlogMain;
