import { NavLink } from "react-router-dom";
import{Nav}  from "react-bootstrap"
import "./index.css"
import { Chart as ChartJS, CategoryScale,LinearScale,PointElement,LineElement,Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { requestOptions } from "../../../config/config";
import {useContext, useEffect,useRef,useState} from "react";
import { ThemeContext } from "../../contexts/Theme";

export default function CoinCard(props){
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: `${props.coin.id} price history`,
          },
        },
    };
    
    
    const currCoin=props.coin;
    const changeFavourite=()=>{props.changeFav(currCoin.id)}
    const isFav=props.isFav;
    const turnOffSearch=props.turnOffSearch;
    const[ChartData,setChartData]=useState([])
    const[ShowExpand,setShowExpand]=useState(props.turnOffSearch)
    const jumpRef=useRef(null)

    const toggleExpand=()=>{setShowExpand(!ShowExpand);handleScroll()}

    async function getChartData(){
        try{
            const response = await fetch(`https://api.coincap.io/v2/assets/${currCoin.id}/history?interval=d1`, requestOptions);
            const res =await response.json();
            console.log(res.data)
            setChartData(res.data)
        }catch(e){
            console.log(e)
        }
    }

    function getChartRender(){
      return{
          labels: ChartData.map((item) => {return item.date.substring(5, 10)}),
          datasets: [
            {
              label: 'Price (USD)',
              data: ChartData.map(item => parseFloat(item.priceUsd)),
              fill: false,
              borderColor: 'rgba(75, 192, 192, 1)',
            }
          ]
        };
  }



    useEffect(()=>{if(ShowExpand&&(ChartData.length==0))getChartData()},[currCoin.id,ShowExpand])

    const {currStyle}=useContext(ThemeContext) 

    return(
    <div className="coinCard">
        <div className="topTitle" ref={jumpRef}>
            <h2 style={{...currStyle}}>{currCoin.rank}. {currCoin.name} </h2>
            <h3>{currCoin.symbol}</h3>
        </div>
       
        <h3>{currCoin.priceUsd} <span style={{color:'greenyellow'}}>$</span></h3>
        <div className="btnCont">
            {(props.loggedIn)? <button className={`btn ${isFav?'btn-danger':'btn-primary'}`} onClick={changeFavourite}>{isFav?"remove from":"add to"}  favourites </button>:
            <NavLink className="btn btn-danger" to={"/register"}>register to add favourites</NavLink>
                
            }
            {turnOffSearch?<></>:<NavLink to={`/search/${currCoin.id}`} className="btn btn-warning">To page</NavLink>}
        </div>

        <button className="btn btn-primary"  onClick={toggleExpand}>{ShowExpand?"Hide History":"Show History"}</button>
        {ChartData&&ShowExpand?<Line options={options} data={getChartRender()}/>:null}
        <div></div>
        
    </div>
    )
    
}