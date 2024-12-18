import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    const [userName,setUserName]=useState(""); 
    const [password,setPassword]=useState(""); 
    const navigate=useNavigate(); 
    const userNameChangeHanlder=(e)=>{
        setUserName(e.target.value); 
    }
    const passwordChangeHandler=(e)=>{
        setPassword(e.target.value); 
    }
    const formSubmitHandler=(e)=>{
        e.preventDefault(); 
        console.log("function called")
        fetch('https://fakestoreapi.com/auth/login',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json', // Specify the content type
            },
            body:JSON.stringify({
                username: userName,
                password: password
            })
        })
            .then(res=>{
                console.log(res); 
                if(res.status==200){
                    console.log("login successful"); 
                    navigate('/home'); 
                }
                else{
                    console.log("login not successful -- try again"); 
                }
                return res.json()
            })
            .then(json=>console.log(json))
    }
    return (
        <>
            <form>
                <div>
                    <legend htmlFor="userName">UserName: </legend>
                    <input id="userName" type="text" onChange={userNameChangeHanlder} required/>
                    <legend htmlFor ="password">Password:</legend>
                    <input type="text" id="password" onChange={passwordChangeHandler} required/>
                </div>
                <div>
                    <button onClick={formSubmitHandler}>Login</button>
                </div>
            </form>
            <div>
                {userName && <p>{userName} Is the Username entered</p>}
                {password && <p>{password} Is the Username entered</p>}
            </div>
        </>
    )
}