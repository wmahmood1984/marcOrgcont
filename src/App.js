import React,{useState, useEffect} from 'react';
import './App.css'
import Main from "./components/Main/Main";
import { useDispatch, useSelector } from 'react-redux'; 
import { initWeb3,loadArray } from './store/adoptSlice';
import { isBot, useProgressiveImage } from "./helpers";
import axios from 'axios'

function App() {

  
  const headerImage = useProgressiveImage("header-with-text.png");
  const footerImage = useProgressiveImage("footer-bg-characters.png");
  const middleImage = useProgressiveImage("middle-bg.png");
  const loading = !headerImage || !footerImage || !middleImage;
  const [price, setPrice] = useState()
  
  const dispatch = useDispatch()
  
  // const contract = useSelector((state)=>{
  //  return state.adoptReducer.contract
  // })

  useEffect(
    function onLoaded() {
      if (isBot || !loading) {
        const loader = document.getElementById("loader");
        if (loader) loader.remove();
      }
    },
    [loading]
  );


  const address = useSelector((state)=>{
      return state.adoptReducer.YearlyContract
   })

   const toggle = useSelector((state)=>{
    return state.adoptReducer.toggle
  })

  console.log("contract",address)

  // const myArray = useSelector((state)=>{
  //   return state.adoptReducer.arrayResult
  //  })

  useEffect(() => {
    
    dispatch(initWeb3())
    

    axios.get("https://api.pancakeswap.info/api/tokens/0xDD110ce8CC33591E4A2eE75498BB599FFDa60cD9")
        //   // Handle a successful response from the server
           .then(response => {
        //           // Getting a data object from response that contains the necessary data from the server
                   const data = response.data;
                   console.log('data', data.data.price);
                   setPrice(data.data.price)
        //           // Save the unique id that the server gives to our object
                  
           })
        //   // Catch and print errors if any
           .catch(error => console.error('On create student error', error));
  
    
    // eslint-disable-next-line
  }, [toggle])

  // console.log("contract", contract)
  // console.log("address", address)
  // console.log("array", myArray)

//console.log("contract",address)
  

  return (
    <div className={`App ${loading ? "loading" : ""}`}>
      <Main
        headerImage={headerImage}
        footerImage={footerImage}
        middleImage={middleImage}
        //drizzle = {null}
        //drizzleState = {null}
        price={price}
      />
      Hello world
    </div>
  );
}

export default App;