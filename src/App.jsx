import { useEffect, useState} from 'react'
import {requestOptions,db,auth} from '../config/config'
import GeneralPage from './pages/generalPage';
import{collection , getDocs, query, setDoc, where, doc} from "firebase/firestore"



function App() {
  
  

  function isIdFav(coinId){
    return FavouriteArr.includes(coinId)
  }


  function changeFav(coinId){
    console.log(FavouriteArr,coinId,FavouriteArr.includes(coinId))
    if(isIdFav(coinId)){
      const newFavArr= FavouriteArr.filter((favId)=>{return coinId!=favId})
      setFavouriteObj({...FavouriteObj,favouritesId:newFavArr})
    }
    else{
      const newFavObj={...FavouriteObj,favouritesId:[...FavouriteArr,coinId]}
      console.log(newFavObj)
      setFavouriteObj(newFavObj)
    }

  }
  

  const [CoinCardArr, setCoinCardArr] = useState([])
  const [FavouriteObj, setFavouriteObj] = useState({})
  const FavouriteArr=FavouriteObj.favouritesId?[...FavouriteObj.favouritesId]:[];
  const favRef=collection(db,"favourites")
  const userId="123"


  useEffect(()=>{
    
    async function fetchFav() {
      try {
        const queryRef= await query(favRef,where("userID","==",`${userId}`));
        const docData = await getDocs(queryRef);
       
        const fDoc = docData.docs[0];
        console.log(fDoc.data())
        
        setFavouriteObj({...fDoc.data(),id:fDoc.id});
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    }

    function fetchAssetsData(){
      fetch("https://api.coincap.io/v2/assets", requestOptions)
        .then(response => response.json())
        .then(data => {setCoinCardArr(data.data) })
        .catch(error => console.error('Error:', error));
    }

    fetchAssetsData()
    if( userId){
      fetchFav()
    }
  },[])

  useEffect(()=>{
    async function setFavouriteDb(){
      {
        try{
          await setDoc(doc(db,"favourites",FavouriteObj.id),
          {
            favouritesId:FavouriteArr,
            userID:userId
          }
          )
        }catch (error) {
          console.error("Error setting favorites:", error);
        }
      }
    }
    if(FavouriteObj.id){
      setFavouriteDb()
    }
  }
  ,[FavouriteObj]
  )


 
  
 

  return (
    
    <div>
      <GeneralPage cCardArr={CoinCardArr} changeFav={changeFav} isFavFunc={isIdFav}></GeneralPage>
    </div>
    
  )
}

export default App
