import { NavLink } from "react-router-dom";
import{Nav}  from "react-bootstrap"
import "./index.css"
import { Chart as ChartJS, CategoryScale,LinearScale,PointElement,LineElement,Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { requestOptions } from "../../../config/config";
import {useEffect,useState} from "react";

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
            text: 'Chart.js Line Chart',
          },
        },
    };
    
    
    const currCoin=props.coin;
    const changeFavourite=()=>{props.changeFav(currCoin.id)}
    const isFav=props.isFav;
    const turnOffSearch=props.turnOffSearch;
    const[ChartData,setChartData]=useState([])

    async function getChart(){
        try{
            const response = await fetch(`https://api.coincap.io/v2/assets/${currCoin.id}/history?interval=d1`, requestOptions);
            const res =await response.json();
            console.log(res.data)
            setChartData(res.data)
        }catch(e){
            console.log(e)
        }
    }
    useEffect(()=>{if(turnOffSearch)getChart()},[currCoin.id])
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
        {ChartData?<Line options={options} data={getChartRender()} />:null}
        
        
    </div>
    )
    
}