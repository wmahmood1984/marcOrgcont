import { useState, useEffect } from 'react';
import "./App.css";
import Main from "./components/Main/Main";
import { isBot, useProgressiveImage } from "./helpers";
import axios from 'axios'

function App(props) {
  const headerImage = useProgressiveImage("header-with-text.png");
  const footerImage = useProgressiveImage("footer-bg-characters.png");
  const middleImage = useProgressiveImage("middle-bg.png");
  const loading = !headerImage || !footerImage || !middleImage;
  const [dloading, setLoading] = useState(true)
  const [price, setPrice] = useState()
  const [drizzleState, setdrizzleState] = useState(null)
  useEffect(
    function onLoaded() {
      if (isBot || !loading) {
        const loader = document.getElementById("loader");
        if (loader) loader.remove();
      }
    },
    [loading]
  );
  useEffect(() => {

    const { drizzle } = props;
    const unsubscribe = drizzle.store.subscribe(()=>{

      console.log("Drizzle =>>", drizzle)
      const drizzleState = drizzle.store.getState();

      console.log("drizzle state =>>", drizzleState)

      // // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        
        setdrizzleState(drizzleState)
        setLoading(false)



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


  
      }
    })

    return ()=>{
      unsubscribe()
    }
  }, [])


  // useEffect(function onMount() {
  //   const metaImageURL = window.location.origin + "/preview.png";
  //   const ogImage = document.createElement("meta");
  //   ogImage.setAttribute("property", "og:image");
  //   ogImage.setAttribute("content", metaImageURL);
  //   const twitterImage = document.createElement("meta");
  //   twitterImage.setAttribute("property", "twitter:image");
  //   twitterImage.setAttribute("content", metaImageURL);
  //   document.head.prepend(ogImage);
  //   document.head.prepend(twitterImage);
  //   return () => {
  //     document.head.removeChild(ogImage);
  //     document.head.removeChild(twitterImage);
  //   };
  // }, []);
  //if (!isBot && loading) return null;
  
  if (dloading) return "Loading Drizzle...";

  return (
    <div className={`App ${loading ? "loading" : ""}`}>
      <Main
        headerImage={headerImage}
        footerImage={footerImage}
        middleImage={middleImage}
        drizzle = {props.drizzle}
        drizzleState = {drizzleState}
        price={price}
      />
      Hello world
    </div>
  );
}

export default App;






