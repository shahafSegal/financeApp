import { useEffect, useState } from "react";
import CoinCard from "../components/CoinCard"
import"../styles/generalP.css"
import { NavLink } from "react-router-dom";
import { requestOptions } from "../../config/config";

export default function FavouriteShow(props)  {
    const favArr=props.favArr;
    console.log(favArr)
    const[FavouriteData,setFavouriteData]=useState([])
    useEffect(()=>{
        async function getFData(){
            try{
                const response = await fetch(`https://api.coincap.io/v2/assets?ids=${favArr.join(',')}`, requestOptions);
                const res =await response.json();
                console.log(res.data)
                setFavouriteData(res.data)
            }catch(e){
                console.log(e)
            }
        }
        getFData()
        }
    ,[favArr])
    
    function createCoinCards(){
        return FavouriteData.map((newCoin)=>{return <CoinCard key={newCoin.id}
        coin={newCoin} changeFav={props.changeFav} isFav={true} loggedIn={props.loggedIn}>
        </CoinCard>
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