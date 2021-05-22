// import axios from 'axios'



//     const URI = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"

//     // Object with RapidAPI authorization headers and Content-Type header
//     const RAPIDAPI_REQUEST_HEADERS = {
//     "X-CMC_PRO_API_KEY": "dd11bdb9-d16e-4018-8de5-4ac4b5bdd7c4",
//      "Accept": "application/json"}

//      const data = "start=1&limit=5000&convert=USD"

//      axios.post(URI, data, { headers: RAPIDAPI_REQUEST_HEADERS })
//   // Handle a successful response from the server
//   .then(response => {
//           // Getting a data object from response that contains the necessary data from the server
//           const data = response.data;
//           console.log('data', data);
//           // Save the unique id that the server gives to our object
          
//   })
//   // Catch and print errors if any
//   .catch(error => console.error('On create student error', error));


// const [contract, setContract] = React.useState()
// React.useEffect(()=>{
//   const web3 = new Web3(Web3.givenProvider);
//   const contractAddr = '0x3FB2dD9fC94fBf559794D5bDbD2A4920C0f2239c';
//   const SimpleContract = new web3.eth.Contract(VS2, contractAddr);
//   setContract(SimpleContract)
// },[])

// console.log("contract",contract)
// import Web3 from 'web3';
// import {VS2} from '../../deployed/VS2'
// var contract_address = '0x3FB2dD9fC94fBf559794D5bDbD2A4920C0f2239c';
// export const abc =  async ()=> {
//   // If using web3 straight away, we need the abi
//   var abi = VS2;
//   // web3.eth.contract(abi).at(contract_address) is the  magic line to get the contract object.
//   let contract = await Web3.eth.contract(abi).at(contract_address);
  
//   //contract.getCertifiedStudentsCount((err, res)=>{
//   //  console.log('contractDeployed:',contract);
//   //});

//   return contract;
// }

import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { VS2 } from '../../deployed/VS2';

//import './App.css';





function Api() {
  const [number, setNumber] = useState(0);
  const [getNumber, setGetNumber] = useState();
  const [contract, setContract] = useState()
 
  useEffect(()=>{
    const web3 = new Web3(Web3.givenProvider);
    const contractAddr = '0x232943Ac14DCdb3971515Aa693D8814F73c719a1';
    const SimpleContract = new web3.eth.Contract(VS2, contractAddr);
    setContract(SimpleContract)
  },[])

  console.log("contract",contract)

  const handleGet = async (e) => {
    e.preventDefault();
    const result = await contract.methods.decimals().call();
    setGetNumber(result);
    console.log(result);
  }

  const handleGet2 = async (e) => {
    e.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const result = await contract.methods.balanceOf(account).call();
    setGetNumber(result);
    console.log(result);
  }


  const handleSet = async (e) => {
    e.preventDefault();    
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const account1 = accounts[1];
    const gas = await contract.methods.approve(account,1000)
                        .estimateGas();
    const result = await contract.methods.approve(account,1000).send({
      from: account,
      gas 
    })
    console.log(result);
    console.log("account1",account1)
  }

  return (
    <div className="App">
      <header className="App-header">
        {getNumber}
        <button onClick={handleGet}>Get Decimals</button>
        <button onClick={handleGet2}>Get balance of</button>
        <button onClick={handleSet}>approve</button>
      </header>
    </div>  

    
);
}

export default Api;

