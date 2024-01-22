import { useEffect, useState} from 'react'
import {requestOptions} from '../config/config'
import GeneralPage from './pages/generalPage';



function App() {
  const [CoinCardArr, setCoinCardArr] = useState([])
  
  useEffect(fetchAssetsData,[])

  function fetchAssetsData(){
    fetch("https://api.coincap.io/v2/assets", requestOptions)
      .then(response => response.json())
      .then(data => {console.log(data.data); setCoinCardArr(data.data) })
      .catch(error => console.error('Error:', error));
  }
  
 

  return (
    
    <div>
      <GeneralPage cCardArr={CoinCardArr}></GeneralPage>
    </div>
    
  )
}

export default App
