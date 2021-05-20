import React, { useState,useEffect } from "react";
import money from "../../images/money.png";
import clock from "../../images/clock.png";
import bnbLogo from "../../images/BNB+Logo.png";
import "./styles.css";
import YearTimer from "./YearTimer";
import MonthlyTimer from "./MonthlyTimer";
import WeeklyTimer from "./WeeklyTimer";
import axios from 'axios'
const labels = [
  {
    label: "Allocation:",
    key: "allocation",
    percent: false,
  },
  {
    label: "Stake Fee:",
    key: "stakeFee",
    percent: false,
  },
  {
    label: "Total Staked",
    key: "totalStaked",
    percent: false,
  },
  {
    label: "Early Unstake Fee",
    key: "earlyUnstakeFee",
    percent: true,
  },
];

const Main = ({ headerImage, middleImage, footerImage, drizzle, drizzleState, price}) => {
  
  const [stackID, setStackID] = useState(null)
  const [MstackID, setMStackID] = useState(null)
  const [WstackID, setWStackID] = useState(null)
  const [stackValue, setStackValue] = useState();
  const [MstackValue, setMStackValue] = useState();
  const [WstackValue, setWStackValue] = useState();



  const setApprove = value => {
    const contract = drizzle.contracts.PancakePair;
    const sender = drizzleState.accounts[0];
    const recepient = drizzle.contracts.YOLOYearly.address;

    // let drizzle know we want to call the `set` method with `value`
    //address sender, address recipient, uint256 amount
    const stackId = contract.methods["approve"].cacheSend(recepient,stackValue, {
      from: sender
    });

    // save the `stackId` for later reference
    setStackID( stackId );
  };
  
  const setMApprove = value => {
    const contract = drizzle.contracts.PancakePair;
    const sender = drizzleState.accounts[0];
    const recepient = drizzle.contracts.YOLOMonthly.address;

    // let drizzle know we want to call the `set` method with `value`
    //address sender, address recipient, uint256 amount
    const MstackId = contract.methods["approve"].cacheSend(recepient,MstackValue, {
      from: sender
    });

    // save the `stackId` for later reference
    setMStackID( MstackId );
  };
  const setWApprove = value => {
    const contract = drizzle.contracts.PancakePair;
    const sender = drizzleState.accounts[0];
    const recepient = drizzle.contracts.YOLOWeekly.address;

    // let drizzle know we want to call the `set` method with `value`
    //address sender, address recipient, uint256 amount
    const WstackId = contract.methods["approve"].cacheSend(recepient,WstackValue, {
      from: sender
    });

    // save the `stackId` for later reference
    setWStackID( WstackId );
  };

  const setStacking = value => {
    //stake(uint256 amount)
    const contract = drizzle.contracts.YOLOYearly;
    const sender = drizzleState.accounts[0];
    

    // let drizzle know we want to call the `set` method with `value`
    //address sender, address recipient, uint256 amount
    const stackId = contract.methods["stake"].cacheSend(stackValue, {
      from: sender
    });

    // save the `stackId` for later reference
    setStackID( stackId );
    setStackValue("")
  };

  const setMStacking = value => {
    //stake(uint256 amount)
    const contract = drizzle.contracts.YOLOMonthly;
    const sender = drizzleState.accounts[0];
    

    // let drizzle know we want to call the `set` method with `value`
    //address sender, address recipient, uint256 amount
    const MstackId = contract.methods["stake"].cacheSend(MstackValue, {
      from: sender
    });

    // save the `stackId` for later reference
    setMStackID( MstackId );
    setMStackValue("")
  };

  const setWStacking = value => {
    //stake(uint256 amount)
    const contract = drizzle.contracts.YOLOWeekly;
    const sender = drizzleState.accounts[0];
    

    // let drizzle know we want to call the `set` method with `value`
    //address sender, address recipient, uint256 amount
    const WstackId = contract.methods["stake"].cacheSend(WstackValue, {
      from: sender
    });

    // save the `stackId` for later reference
    setWStackID( WstackId );
    setWStackValue("")
  };

  const setwithdraw = value => {
    const contract = drizzle.contracts.YOLOYearly;
    const sender = drizzleState.accounts[0];
    
    // let drizzle know we want to call the `set` method with `value`
    //address sender, address recipient, uint256 amount
    const stackId = contract.methods["withdraw"].cacheSend(stackValue, {
      from: sender
    });

    // save the `stackId` for later reference
    setStackID( stackId );
    setStackValue("")
  };

  const setMwithdraw = value => {
    const contract = drizzle.contracts.YOLOMonthly;
    const sender = drizzleState.accounts[0];
    
    // let drizzle know we want to call the `set` method with `value`
    //address sender, address recipient, uint256 amount
    const MstackId = contract.methods["withdraw"].cacheSend(MstackValue, {
      from: sender
    });

    // save the `stackId` for later reference
    setMStackID( MstackId );
    setMStackValue("")
  };

  const setWwithdraw = value => {
    const contract = drizzle.contracts.YOLOWeekly;
    const sender = drizzleState.accounts[0];
    
    // let drizzle know we want to call the `set` method with `value`
    //address sender, address recipient, uint256 amount
    const WstackId = contract.methods["withdraw"].cacheSend(WstackValue, {
      from: sender
    });

    // save the `stackId` for later reference
    setWStackID( WstackId );
    setWStackValue("")
  };


  const getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[stackID];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
  };

  const getMTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[MstackID];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
  };

  const getWTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[WstackID];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
  };

  console.log("txstatus", getTxStatus())

  //Calling Total supply 

  const [dataKey, setdataKey] = useState()
  const [dataKey2, setdataKey2] = useState()
  const [dataKey3, setdataKey3] = useState()
  const [dataKey4, setdataKey4] = useState()
  const [dataKey5, setdataKey5] = useState()
  const [dataKey6, setdataKey6] = useState()
  const [dataKey7, setdataKey7] = useState()
  const [dataKey8, setdataKey8] = useState()
  const [dataKey9, setdataKey9] = useState()
  const [dataKey10, setdataKey10] = useState()
  const [dataKey11, setdataKey11] = useState()
  const [dataKey12, setdataKey12] = useState()
  const [dataKey13, setdataKey13] = useState()
  const [dataKey14, setdataKey14] = useState()
  const [dataKey15, setdataKey15] = useState()
  var VS2$ = YOLO$*2;
  var YOLO$ = price*10000;
  console.log("price in main",price)
  
  useEffect(()=>{
      
    
    const contractVS2 = drizzle.contracts.PancakePair;
    const contractYOLO = drizzle.contracts.YOLO;
    const sender = drizzleState.accounts[0];
  
    ///Yearly Data 
    
    // let drizzle know we want to watch the `myString` method
    const contract = drizzle.contracts.YOLOYearly;
    const dataKey = contract.methods["balanceOf"].cacheCall(sender);
    const dataKey2 = contract.methods["rewardRate"].cacheCall();
    const dataKey3 = contract.methods["rewardPerToken"].cacheCall();
    const dataKey4 = contractVS2.methods["decimals"].cacheCall();
    const dataKey5 = contract.methods["stakeTime"].cacheCall(sender);
      
  
    // save the `dataKey` to local component state for later reference
    setdataKey( dataKey );
    setdataKey2( dataKey2)
    setdataKey3( dataKey3)
    setdataKey4( dataKey4)
    setdataKey5(dataKey5)
  

  ///Monthly Data 

        // let drizzle know we want to watch the `myString` method
        const Mcontract = drizzle.contracts.YOLOMonthly;
        const dataKey6 = Mcontract.methods["balanceOf"].cacheCall(sender);
        const dataKey7 = Mcontract.methods["rewardRate"].cacheCall();
        const dataKey8 = Mcontract.methods["rewardPerToken"].cacheCall();
        const dataKey9 = contractVS2.methods["decimals"].cacheCall();
        const dataKey10 = Mcontract.methods["stakeTime"].cacheCall(sender);


        // save the `dataKey` to local component state for later reference
        setdataKey6( dataKey6 );
        setdataKey7( dataKey7)
        setdataKey8( dataKey8)
        setdataKey9( dataKey9)
        setdataKey10(dataKey10)


  ///Weekly Data 

        // let drizzle know we want to watch the `myString` method
        const Wcontract = drizzle.contracts.YOLOWeekly;
        const dataKey11 = Wcontract.methods["balanceOf"].cacheCall(sender);
        const dataKey12 = Wcontract.methods["rewardRate"].cacheCall();
        const dataKey13 = Wcontract.methods["rewardPerToken"].cacheCall();
        const dataKey14 = contractVS2.methods["decimals"].cacheCall();
        const dataKey15 = Wcontract.methods["stakeTime"].cacheCall(sender);


        // save the `dataKey` to local component state for later reference
        setdataKey11( dataKey11 );
        setdataKey12( dataKey12)
        setdataKey13( dataKey13)
        setdataKey14( dataKey14)
        setdataKey15(dataKey15)

      
  },[])


const { YOLOYearly,PancakePair,YOLOMonthly,YOLOWeekly } = drizzleState.contracts;

// using the saved `dataKey`, get the variable we're interested in
const balanceOf = YOLOYearly.balanceOf[dataKey];
const Allocation = YOLOYearly.rewardRate[dataKey2];
const RewardPerToken = YOLOYearly.rewardPerToken[dataKey3];
const DecimalsVS2 = PancakePair.decimals[dataKey4];
const StakeTime = YOLOYearly.stakeTime[dataKey5];


const MbalanceOf = YOLOMonthly.balanceOf[dataKey6];
const MAllocation = YOLOMonthly.rewardRate[dataKey7];
const MRewardPerToken = YOLOMonthly.rewardPerToken[dataKey8];
const MDecimalsVS2 = PancakePair.decimals[dataKey9];
const MStakeTime = YOLOMonthly.stakeTime[dataKey10];


const WbalanceOf = YOLOWeekly.balanceOf[dataKey11];
const WAllocation = YOLOWeekly.rewardRate[dataKey12];
const WRewardPerToken = YOLOWeekly.rewardPerToken[dataKey13];
const WDecimalsVS2 = PancakePair.decimals[dataKey14];
const WStakeTime = YOLOWeekly.stakeTime[dataKey15];



//var factor1 =  balanceOf.value / 10**DecimalsVS2.value * VS2$;
 
//var factor2 =  RewardPerToken.value == 0? 5000 / 10**9 : RewardPerToken.value / 10**9 * YOLO$;

// var APR = (factor1 / factor2 * 100).toFixed()
// console.log("balance of ", StakeTime.value )

 







  const [weeklyData] = useState({
    apr: 0,
    allocation: 0,
    stakeFee: 0,
    totalStaked: 0,
    earlyUnstakeFee: 10,
  });
  const [monthlyData] = useState({
    apr: 0,
    allocation: 0,
    stakeFee: 0,
    totalStaked: 0,
    earlyUnstakeFee: 35,
  });
  const [yearlyData] = useState({
    apr: 0,
    allocation: 0,
    stakeFee: 0,
    totalStaked: 0,
    earlyUnstakeFee: 50,
  });

  return (
    <div className="main">
      <div
        className="header"
        style={{ backgroundImage: `url(${headerImage})` }}
      />
      <div className="middle-content">
        <div className="tvl-bar">
          <img src={money} className="icon" alt="Money Icon" />
          <div className="details">
            <div className="title">TOTAL VALUE LOCKED</div>
            <div className="">{balanceOf && MbalanceOf && WbalanceOf && (Number(balanceOf.value)+Number(MbalanceOf.value)+Number(WbalanceOf.value))}</div>
          </div>
        </div>
        <div
          className="main-charts"
          style={{ backgroundImage: `url(${middleImage})` }}
        >
          {" "}
          <div className="title">THE WEEKLY POOL</div>
          <div className="title">THE MONTHLY POOL</div>
          <div className="title">THE YEARLY POOL</div>
          <div className="chart weekly">
            <div className="card">
              <div className="title">
                <img
                  src={bnbLogo}
                  className="image"
                  alt="SYOLO and BNB logos"
                />
                <div className="text">STAKE YOLO-BNB</div>
              </div>
              <div className="details">
                <div className="item percent">
                  <div className="label">APR:</div>
                  <div className="value">
                  {WbalanceOf && WDecimalsVS2 && WRewardPerToken && 
(WbalanceOf.value / 10**WDecimalsVS2.value * VS2$ / Math.max(WRewardPerToken.value,0.00000000000000005) / 10**9 * YOLO$ *100).toFixed()}</div>
                </div>
                <div className="stats">
                  {/* {labels.map((item) => (
                    <div className={`item ${item.percent ? "percent" : ""}`}>
                      <div className="label">{item.label}</div>
                      <div className="value">{weeklyData[item.key]}</div>
                    </div>
                  ))} */}
                <div className={`item ${false ? "percent" : ""}`}>
                      <div className="label">Allocation</div>
                      <div className="value">{WAllocation && WAllocation.value}</div>
                    </div>
                    <div className={`item ${false ? "percent" : ""}`}>
                      <div className="label">Stake Fee</div>
                      <div className="value">{weeklyData[1]}</div>
                    </div>
                    <div className={`item ${false ? "percent" : ""}`}>
                      <div className="label">Total Staked</div>
                      <div className="value">{WbalanceOf && WbalanceOf.value}</div>
                    </div>
                    <div className={`item ${true ? "percent" : ""}`}>
                      <div className="label">Early UnStake Fee</div>
                      <div className="value">{weeklyData[3]}</div>
                    </div>


                </div>
                <input className="input" type="number" 
                value={WstackValue}
                onChange={(e)=>{setWStackValue(e.target.value)}} 
                placeholder="Enter text"
                />
                <div className="first-btns">
                <div className="btn approve-btn" onClick={setWApprove}>Approve</div>
                  <div className="btn decline-btn" onClick={setWStacking}>Stake</div>
                </div>
                <div className="btn withdraw-btn" onClick={setWwithdraw}>Withdraw</div>
              </div>
            </div>
            <div className="countdown">
              <img src={clock} className="icon" alt="Clock Icon" />
              <div className="value"><WeeklyTimer stakeTime={WStakeTime && WStakeTime.value}></WeeklyTimer></div>
            </div>
          </div>
          <div className="chart monthly">
            <div className="card">
              <div className="title">
                <img
                  src={bnbLogo}
                  className="image"
                  alt="SYOLO and BNB logos"
                />
                <div className="text">STAKE YOLO-BNB</div>
              </div>
              <div className="details">
                <div className="item percent">
                  <div className="label">APR:</div>
                  <div className="value">
                  {MbalanceOf && MDecimalsVS2 && MRewardPerToken && 
(MbalanceOf.value / 10**MDecimalsVS2.value * VS2$ / Math.max(MRewardPerToken.value,0.00000000000000005) / 10**9 * YOLO$ *100).toFixed()}</div>
                </div>
                <div className="stats">
                  {/* {labels.map((item) => (
                    <div className={`item ${item.percent ? "percent" : ""}`}>
                      <div className="label">{item.label}</div>
                      <div className="value">{monthlyData[item.key]}</div>
                    </div>
                  ))} */}
                  <div className={`item ${false ? "percent" : ""}`}>
                      <div className="label">Allocation</div>
                      <div className="value">{MAllocation && MAllocation.value}</div>
                    </div>
                    <div className={`item ${false ? "percent" : ""}`}>
                      <div className="label">Stake Fee</div>
                      <div className="value">{yearlyData[1]}</div>
                    </div>
                    <div className={`item ${false ? "percent" : ""}`}>
                      <div className="label">Total Staked</div>
                      <div className="value">{MbalanceOf && MbalanceOf.value}</div>
                    </div>
                    <div className={`item ${true ? "percent" : ""}`}>
                      <div className="label">Early UnStake Fee</div>
                      <div className="value">{yearlyData[3]}</div>
                    </div>
                </div>{" "}
                <input className="input" type="text" 
                value={MstackValue}
                onChange={(e)=>{setMStackValue(e.target.value)}}
                placeholder="Enter text" />
                <div className="first-btns">
                <div className="btn approve-btn" onClick={setMApprove}>Approve</div>
                  <div className="btn decline-btn" onClick={setMStacking}>Stake</div>
                </div>
                <div className="btn withdraw-btn" onClick={setMwithdraw}>Withdraw</div>

              </div>
            </div>
            <div className="countdown">
              <img src={clock} className="icon" alt="Clock Icon" />
              <div className="value"><MonthlyTimer stakeTime={MStakeTime && MStakeTime.value}></MonthlyTimer></div>
            </div>
          </div>
          <div className="chart yearly">
            <div className="card">
              <div className="title">
                <img
                  src={bnbLogo}
                  className="image"
                  alt="SYOLO and BNB logos"
                />
                <div className="text">STAKE YOLO-BNB</div>
              </div>
              <div className="details">
                <div className="item percent">
                  <div className="label">APR:</div>
                  <div className="value">
{balanceOf && DecimalsVS2 && RewardPerToken && 
(balanceOf.value / 10**DecimalsVS2.value * VS2$ / Math.max(RewardPerToken.value,0.00000000000000005) / 10**9 * YOLO$ *100).toFixed()}</div>
                </div>
                <div className="stats">
                  {/* {labels.map((item) => (
                    <div className={`item ${item.percent ? "percent" : ""}`}>
                      <div className="label">{item.label}</div>
                      <div className="value">{yearlyData[item.key]}</div>
                    </div>
                  ))} */}
                  <div className={`item ${false ? "percent" : ""}`}>
                      <div className="label">Allocation</div>
                      <div className="value">{Allocation && Allocation.value}</div>
                    </div>
                    <div className={`item ${false ? "percent" : ""}`}>
                      <div className="label">Stake Fee</div>
                      <div className="value">{yearlyData[1]}</div>
                    </div>
                    <div className={`item ${false ? "percent" : ""}`}>
                      <div className="label">Total Staked</div>
                      <div className="value">{balanceOf && balanceOf.value}</div>
                    </div>
                    <div className={`item ${true ? "percent" : ""}`}>
                      <div className="label">Early UnStake Fee</div>
                      <div className="value">{yearlyData[3]}</div>
                    </div>
                  

                </div>{" "}
                <input className="input" 
                value={stackValue}
                onChange={(e)=>{setStackValue(e.target.value)}} 
                type="text" placeholder="Enter text" />
                <div className="first-btns">
                  <div className="btn approve-btn" onClick={setApprove}>Approve</div>
                  <div className="btn decline-btn" onClick={setStacking}>Stake</div>
                </div>
                <div className="btn withdraw-btn" onClick={setwithdraw}>Withdraw</div>
              </div>
            </div>
            <div className="countdown">
              <img src={clock} className="icon" alt="Clock Icon" />
              <div className="value"><YearTimer stakeTime={StakeTime && StakeTime.value}></YearTimer></div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="footer"
        style={{ backgroundImage: `url(${footerImage})` }}
      >
        <div className="text">EARN, STAKE, $YOLO </div>
      </div>
    </div>
  );
};
export default Main;
