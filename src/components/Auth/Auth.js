import React, { useState } from 'react';
import LoginForm from './Login';
import RegisterForm from './Register'
const AuthPage = (props) => {
  const [loginpage,setLoginPage] = useState(true)
  return (
    <>
    {loginpage?<LoginForm loginpage={loginpage} setLoginPage={setLoginPage} setAuth={props.setAuth}/>:<RegisterForm loginpage={loginpage} setLoginPage={setLoginPage}/>}
    </>
  );
};

export default AuthPage;
