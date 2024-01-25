import CoinCard from "../components/CoinCard"
import"../styles/generalP.css"
import { requestOptions } from "../../config/config";
import{useState,useEffect} from "react"

export default function GeneralPage(props)  {
    const [CoinCardArr, setCoinCardArr] = useState([])
    const isFavFunc=props.isFavFunc;

    useEffect(fetchAssetsData, [])

    function fetchAssetsData(){
        fetch("https://api.coincap.io/v2/assets", requestOptions)
            .then(response => response.json())
            .then(data => {setCoinCardArr(data.data) })
            .catch(error => console.error('Error:', error));
    }
    
    
    function createCoinCards(){
        return CoinCardArr.map((newCoin)=>{return <CoinCard 
        coin={newCoin} changeFav={props.changeFav} isFav={isFavFunc(newCoin.id) } loggedIn={props.loggedIn}>
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
