import React, { useState } from 'react';
import { toast } from 'react-toastify'
import axios from 'axios';
const LoginForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Login = (e) => {
    e.preventDefault()
    let data = {
        username: email,
        password: password
    }
    axios({
        method: "POST",
        url: `${process.env.REACT_APP_NODE_API_URL}/login`,
        headers: { "Content-Type": "application/json" },
        data: data
    }).then(response => {
        if(response && response.data){
            if(!response.data.success){
                toast.error(response.data.message)
                return
            }
            toast.success("Login successful!")
            localStorage.setItem("token",response.data.token)
            props.setAuth(true)
        }
    })
}
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <form style={{ width: '400px' }}>
        <h2 className="mb-3">Blog Application Login</h2>
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">Username</label>
          <input type="email" className="form-control" id="inputEmail" placeholder="abc@example.com" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit" className={"btn btn-primary"} onClick={(e) => Login(e)}>Sign in</button>
        <div className="row mt-3">
          <div className="col">
            <p className="mb-0">Don't have an account?<button type="button" className="btn btn-link p-1 mb-1" onClick={() => props.setLoginPage(false)}>Register</button></p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
