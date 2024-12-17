import { useState } from "react"

export default function LoginPage(){
    const [userName,setUserName]=useState(""); 
    const [password,setPassword]=useState(""); 
    const userNameChangeHanlder=(e)=>{
        setUserName(e.target.value); 
    }
    const passwordChangeHandler=(e)=>{
        setPassword(e.target.value); 
    }
    return (
        <>
            <form action="">
                <div>
                    <legend for="userName">UserName: </legend>
                    <input id="userName" type="text" onChange={userNameChangeHanlder}/>
                    <legend for ="password">Password:</legend>
                    <input type="text" id="password" onChange={passwordChangeHandler}/>
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
            <div>
                {userName && <p>{userName} Is the Username entered</p>}
                {password && <p>{password} Is the Username entered</p>}
            </div>
        </>
    )
}