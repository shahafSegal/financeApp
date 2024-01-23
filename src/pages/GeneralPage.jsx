import CoinCard from "../components/CoinCard"
import"../styles/generalP.css"

export default function GeneralPage(props)  {
    const CoinCardArr=props.cCardArr;
    const isFavFunc=props.isFavFunc;
    
    function createCoinCards(){
        return CoinCardArr.map((newCoin)=>{return <CoinCard 
        coin={newCoin} changeFav={props.changeFav} isFav={isFavFunc(newCoin.id)} >
        </CoinCard>
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
