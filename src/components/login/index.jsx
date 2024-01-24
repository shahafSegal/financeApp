import { useState } from "react"

export default function Login(props){
   
    return(
        <form className="logBox" onSubmit={props.userLogin}>
            <label htmlFor="userName">
                Username: 
                <input type="text" name="email" />
            </label>
            <label htmlFor="password">
                password: 
                <input type="password" name="password" />
            </label>
            <button>login</button>
            {props.error?<h3>{props.error}</h3>:''}

        </form>
    )
}