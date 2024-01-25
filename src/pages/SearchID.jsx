import "bootstrap-icons/font/bootstrap-icons.css";
import {NavLink, useParams} from "react-router-dom"
import { requestOptions } from "../../config/config";
import { useEffect,useState } from "react";
import CoinCard from "../components/CoinCard";

export default function SearchID(props){
    const [CurrCoin, setCurrCoin] = useState(null)
    const [ErrorMsg, setErrorMsg]=useState("")
    const [searchValue,setSearchValue]=useState("")
    const paramId=useParams().id;

    function fetchAssetsData(){
        if(paramId){
            

            fetch(`https://api.coincap.io/v2/assets/${paramId}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.data){ setCurrCoin(data.data)}
                else{
                    setErrorMsg(`Error:${data.error}`);
                }
            })
            .catch(error =>{ console.log(error)});
        }else{
            setCurrCoin("")
            setErrorMsg("")
        }
    }


    useEffect(()=>{setErrorMsg("")},[CurrCoin])
    useEffect(fetchAssetsData,[paramId])

    function changeHandler(e){
        setSearchValue(e.target.value)
    }

    function navHandler(){
        setSearchValue("")
    }

    const coinRender= CurrCoin?<CoinCard turnOffSearch={true} coin={CurrCoin} changeFav={props.changeFav} isFav={props.isFavFunc(paramId) } loggedIn={props.loggedIn}/>:<h1 className="text-center">Search to Render</h1>;

    return(
        <>
            <div className="d-flex justify-content-center bg-dark py-2">
                <div className="input-group rounded w-50">
                    <input value={searchValue} onChange={changeHandler} type="text" className="form-control rounded text-center" placeholder="search for coins" aria-label="Search" aria-describedby="search-addon" />
                    <NavLink className="input-group-text border-0" to={`/search/${searchValue}`}onClick={navHandler}>
                        <i className="bi bi-search"></i>
                    </NavLink>
                </div>
            </div>
            
            <div className="closeCont">
                <div className="coinContainer">
                    {ErrorMsg?<h1 className="text-center">{ErrorMsg}</h1>:coinRender}
                </div>
            </div>
        </>
    )
}