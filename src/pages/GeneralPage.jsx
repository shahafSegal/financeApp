import CoinCard from "../components/CoinCard"
import"../styles/generalP.css"

export default function GeneralPage(props)  {
    const CoinCardArr=props.cCardArr;
    return (
        <div className="closeCont">
            <div className="coinContainer">
                {CoinCardArr.map((newCoin)=><CoinCard coin={newCoin}></CoinCard>)}

            </div>
        </div>
      
    )
  
}
