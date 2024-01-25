import { useEffect, useState} from 'react'
import {requestOptions,db,auth} from '../config/config'
import GeneralPage from './pages/generalPage';
import UserRegister from './pages/UserRegister';
import{collection , getDoc, setDoc, doc} from "firebase/firestore"
import{onAuthStateChanged, createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword}from "firebase/auth"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/navBar';
import "./App.css"
import FavouriteShow from './pages/FavouriteShow';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle"
import SearchID from './pages/searchId';


function App() {
  
  

  function isIdFav(coinId){
    return FavouriteArr.includes(coinId)
  }


  function changeFav(coinId){
    if(isIdFav(coinId)){
      const newFavArr= FavouriteArr.filter((favId)=>{return coinId!=favId})
      setFavouriteObj({...FavouriteObj,favouritesId:newFavArr})
    }
    else{
      const newFavObj={...FavouriteObj,favouritesId:[...FavouriteArr,coinId]}
      setFavouriteObj(newFavObj)
    }

  }

  async function fetchFav() {
    try {
      const docData = await getDoc(favRef);
      console.log(docData.data())
      setFavouriteObj({...docData.data(),id:docData.id});
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  }
  const logOut=()=>{
    signOut(auth).then(() => {
      setUserObj({email:'',id:'',error:''})
    }).catch((error) => {
      console.log(error)
    });
   
  }
  const extractErrorType=(errorString)=> {
    const prefix = "auth/";
    const suffix = ")";
    
    const startIndex = errorString.indexOf(prefix);
    const endIndex = errorString.indexOf(suffix, startIndex + prefix.length);
  
    if (startIndex !== -1 && endIndex !== -1) {
      return errorString.slice(startIndex + prefix.length, endIndex);
    } else {
      // Handle the case where the expected substrings are not found
      return "";
    }
  }

  const userSignUp= (email,pass)=>{
    console.log(email,pass)
    
    createUserWithEmailAndPassword(auth,email,pass)
      .then((userCredential) => {
        setUserObj({email:email,id:userCredential.user.uid,error:''})
      })
      .catch((error) => {
        const errorMessage = extractErrorType(error.message);
        console.log(errorMessage)
        setUserObj({...userObj,error:errorMessage})
      });
  }
  const userLogin=(email,pass)=>{
    console.log(email)
    signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      setUserObj({email:email,id:userCredential.user.uid,error:''})
    })
    .catch((error) => {
      const errorMessage = extractErrorType(error.message);
      setUserObj({...userObj,error:errorMessage})
  });
  }
  

  const [CoinCardArr, setCoinCardArr] = useState([])
  const [FavouriteObj, setFavouriteObj] = useState({})
  const [isLoggingIn,setIsLoggingIn]=useState(true)
  const toggleLogin=()=>{setIsLoggingIn(!isLoggingIn)}
  const[userObj,setUserObj]=useState({email:'',id:'',error:''})
  
  const FavouriteArr=FavouriteObj.favouritesId?[...FavouriteObj.favouritesId]:[];
  const userId=userObj.id;
  const favRef=userObj.id?doc(db,"favourites",userId):null;

  

  useEffect(()=>{

    function fetchAssetsData(){
      fetch("https://api.coincap.io/v2/assets", requestOptions)
        .then(response => response.json())
        .then(data => {setCoinCardArr(data.data) })
        .catch(error => console.error('Error:', error));
    }
    onAuthStateChanged(auth,(user) => {
      if (user) {
        console.log(user.uid)
       setUserObj({email:user.email,id:user.uid,error:''})
      } else {
        console.log("not signed")
      }
    });

    fetchAssetsData()
  },[])
  useEffect(()=>{if(favRef)fetchFav()},[userObj])

  useEffect(()=>{
    async function setFavouriteDb(){
      {
        try{
          await setDoc(doc(db,"favourites",userId),
          {
            favouritesId:FavouriteArr
          }
          )
        }catch (error) {
          console.error("Error setting favorites:", error);
        }
      }
    }
    if(FavouriteObj.id &&userId==FavouriteObj.id){
      setFavouriteDb()
    }
  }
  ,[FavouriteObj]
  )


 
  
 

  return (
    
    <>
      <BrowserRouter>
      <NavBar usrObj={userObj} logOut={logOut}>

      </NavBar>
        <Routes>
          <Route path='/' 
          element={<GeneralPage cCardArr={CoinCardArr} changeFav={changeFav} isFavFunc={isIdFav} loggedIn={userId?true:false}/>}
          />
          <Route path='/favourite' 
          element={<FavouriteShow cCardArr={CoinCardArr} changeFav={changeFav} isFavFunc={isIdFav} loggedIn={userId?true:false}/>}
          />
          <Route path='/search' element={<SearchID changeFav={changeFav} isFavFunc={isIdFav} loggedIn={userId?true:false}/>}>
            <Route path=':id' element={<SearchID changeFav={changeFav} isFavFunc={isIdFav} loggedIn={userId?true:false}/>} />
          </Route>
          <Route path='/register' element={<UserRegister usrSign={isLoggingIn?userLogin:userSignUp} usrObj={userObj} togle={toggleLogin} isLogin={isLoggingIn}/>}/>
        </Routes>
      </BrowserRouter>
      
    </>
    
  )
}

export default App
