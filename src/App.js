import React,{useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import AuthPage from './components/Auth/Auth';
import BlogMain from './components/BlogApplication/BlogMain';
import { ToastContainer} from 'react-toastify';
import { Provider } from 'react-redux';
import store from './redux/store';
function App() {
  const [auth,setAuth] = useState(false)
  useEffect(() => {
    if(!localStorage.getItem("token")){
      setAuth(false)
    }else{
      setAuth(true)
    }
  },[auth])
  return (
    <>
    <Provider store={store}>
    {!auth?<AuthPage setAuth={setAuth}/>:<BlogMain/>}
    <ToastContainer/>
    </Provider>
    </>
  );
}

export default App;
