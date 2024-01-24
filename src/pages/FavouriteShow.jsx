import CoinCard from "../components/CoinCard"
import"../styles/generalP.css"
import { NavLink } from "react-router-dom";

export default function FavouriteShow(props)  {
    const CoinCardArr=props.cCardArr;
    const isFavFunc=props.isFavFunc;
    
    function createCoinCards(){
        return CoinCardArr.map((newCoin)=>{return isFavFunc(newCoin.id)? <CoinCard 
        coin={newCoin} changeFav={props.changeFav} isFav={isFavFunc(newCoin.id) } loggedIn={props.loggedIn}>
        </CoinCard>:<></>
        })
    }

    return (
        <div className="closeCont">
            <div className="coinContainer">
                {props.loggedIn?createCoinCards():<NavLink className="btn btn-primary" to={"/register"}>register to add favourites</NavLink>}
            </div>
        </div>
      
    )
  
}