import Login from "../components/login"
import "../styles/userReg.css"
import SignUp from "../components/signUp"
export default function UserRegister(props){
    const isLoggingIn=props.isLogin;
    const toggleLogin=props.togle;
    const userObj=props.usrObj;
    const formSignUp=(e)=>{
        e.preventDefault()
        const fData=new FormData(e.target)
        const formObj= Object.fromEntries(fData)
        props.usrSign(formObj.email,formObj.password);
    }
    const toLogDiv=[isLoggingIn?<Login userLogin={formSignUp} error={userObj.error}/>:<SignUp error={userObj.error} userLogin={formSignUp}/>,<button onClick={toggleLogin}>{isLoggingIn?"don't have a user?":"already have a user?"}</button>]
    return(
        <div className="regForm">
            { 
                userObj.id?<div><h1>{userObj.email}</h1><h2>Logged In</h2> </div>:toLogDiv

            }
            
        </div>
    )

}