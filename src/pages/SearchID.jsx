import "bootstrap-icons/font/bootstrap-icons.css";
import {useParams} from "react-router-dom"
import { requestOptions } from "../../config/config";
import { useEffect,useState } from "react";
import CoinCard from "../components/CoinCard";

export default function SearchID(props){
    const [CoinSearch, setCoinSearch] = useState(null)
    const [ErrorMsg, setErrorMsg]=useState("")
    const paramId=useParams().id;
    useEffect(function fetchAssetsData(){
        if(paramId){

            fetch(`https://api.coincap.io/v2/assets/${paramId}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.data){ setCoinSearch(data.data)}
                else{
                    setErrorMsg(`Error:${data.error}`);
                }
            })
            .catch(error =>{ console.log(error)});
        }
      }
      ,[]
    )
    const coinRender= CoinSearch?<CoinCard coin={CoinSearch} changeFav={props.changeFav} isFav={props.isFavFunc(paramId) } loggedIn={props.loggedIn}/>:<h1 className="text-center">Search to Render</h1>;

    return(
        <>
            <div className="d-flex justify-content-center">
                <div className="input-group rounded w-50">
                    <input type="text" className="form-control rounded" placeholder="search for movies" aria-label="Search" aria-describedby="search-addon" />
                    <span className="input-group-text border-0" id="search-addon">
                        <i className="bi bi-search"></i>
                    </span>
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