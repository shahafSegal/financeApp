import { useState } from "react"

export default function SignUp(props){
    return(
        <form className="logBox" onSubmit={props.userLogin}>
            <label htmlFor="userName" >
                Username:
                <input type="text" name="email"/>
            </label>
            <label htmlFor="password">
                password:
                <input type="password" name="password" />
            </label>
            <label htmlFor="repeatPass">
                repeat password:
                <input type="password" name="repeatPass" />
            </label>
            <button>login</button>
            {props.error?<h3>{props.error}</h3>:''}

        </form>
    )
}