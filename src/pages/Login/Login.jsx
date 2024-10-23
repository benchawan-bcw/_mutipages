import { useRef } from "react";
import Form from "react-bootstrap/Form";
import "./Login.css";
import { verifyUser } from "../../data/username";
import image from '../pic/this-is.gif'

function Login({setToken}) {
    const userRef = useRef();
    const passRef = useRef();

  return (
    <div style={{ textAlign: "center", margin: "2rem auto" }} className="login-container">
      <h1>LOG-IN</h1>
      <img src={image}/> <br />

      <div className="login">
      <Form.Label htmlFor="username">Username</Form.Label>
      <Form.Control
        type="text"
        id="username"
        aria-describedby="passwordHelpBlock"
        placeholder="Username"
        ref={userRef}/>

<Form.Label htmlFor="password">Password</Form.Label>
      <Form.Control
        type="password"
        id="password"
        aria-describedby="passwordHelpBlock"
        placeholder="Pass"
        style={{textAlign: "center"}}
        ref={passRef}
      /></div>

      <button className="btn btn-info mt-3 btn-lg" onClick={()=>{
        const user = userRef.current.value.trim()
        const pass = passRef.current.value.trim()
        userRef.current.value = ""
        passRef.current.value = ""
        const userInfo = verifyUser(user, pass)
        if(userInfo === null){
            alert("Wrong username or password")
            userRef.current.focus()
        }else{
            setToken(userInfo.token)
        
        }
      }} 
      >Log-in</button>
    </div>
  );
}

export default Login;
