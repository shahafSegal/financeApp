import CoinCard from "../components/CoinCard"
import"../styles/generalP.css"

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
                {createCoinCards()}
            </div>
        </div>
      
    )
  
}