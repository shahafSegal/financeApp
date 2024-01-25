import { NavLink } from "react-router-dom";
import{Nav}  from "react-bootstrap"
import "./index.css"
export default function CoinCard(props){
    const currCoin=props.coin;
    const changeFavourite=()=>{props.changeFav(currCoin.id)}
    const isFav=props.isFav;
    const turnOffSearch=props.turnOffSearch;

    return(
    <div className="coinCard">
        <div className="topTitle">
            <h2>{currCoin.rank}. {currCoin.name} </h2>
            <h3>{currCoin.symbol}</h3>
        </div>
       
        <h3>{currCoin.priceUsd} <span style={{color:'greenyellow'}}>$</span></h3>
        <div className="btnCont">
            {(props.loggedIn)? <button className={`btn ${isFav?'btn-danger':'btn-primary'}`} onClick={changeFavourite}>{isFav?"remove from":"add to"}  favourites </button>:
            <NavLink className="btn btn-danger" to={"/register"}>register to add favourites</NavLink>
                
            }
            {turnOffSearch?<></>:<NavLink to={`/search/${currCoin.id}`} className="btn btn-warning">To page</NavLink>}
        </div>
        
        
    </div>
    )
    
}