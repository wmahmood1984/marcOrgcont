import React, { useState,useEffect } from "react";
import money from "../../images/money.png";
import clock from "../../images/clock.png";
import bnbLogo from "../../images/BNB+Logo.png";
import "./styles.css";
import YearTimer from "./YearTimer";
import MonthlyTimer from "./MonthlyTimer";
import WeeklyTimer from "./WeeklyTimer";
import { useDispatch, useSelector } from 'react-redux'; 
import { initWeb3,YearlyApproval,MonthlyApproval,WeeklyApproval,YearlyStaking,MonthlyStaking,WeeklyStaking,YearlyWithdraw,MonthlyWithdraw,WeeklyWithdraw } from '../../store/adoptSlice';
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

const Main = ({ headerImage, middleImage, footerImage, price}) => {
const dispatch = useDispatch()
const [WstackValue, setWStackValue] = useState()
const [MstackValue, setMStackValue] = useState()
const [stackValue, setStackValue] = useState()






const StakingToken = useSelector((state)=>{
  return state.adoptReducer.VS2Contract;
});
const sender = useSelector((state)=>{
  return state.adoptReducer.address;
});




const YOLOYearly = useSelector((state)=>{
  return state.adoptReducer.YearlyContract;
});

const address = useSelector((state)=>{
  return state.adoptReducer.YearlyContractAddress;
});

const setApprove = (e)=>{
  e.preventDefault()
      dispatch(YearlyApproval({address,stackValue , StakingToken,sender}))

}
const setStacking = (e)=>{
  e.preventDefault()
  dispatch(YearlyStaking({stackValue,YOLOYearly,sender}))
  setStackValue("")
}
const setwithdraw = (e)=>{
  e.preventDefault()
  dispatch(YearlyWithdraw({stackValue,YOLOYearly,sender}))
  setStackValue("")
}






const YOLOMonthly = useSelector((state)=>{
  return state.adoptReducer.MonthlyContract;
});

const Maddress = useSelector((state)=>{
  return state.adoptReducer.MOnthlyContractAddress;
});


const setMApprove = (e)=>{
  e.preventDefault()
      dispatch(MonthlyApproval({Maddress,MstackValue , StakingToken,sender}))
}


const setMStacking = (e)=>{
  e.preventDefault()
  dispatch(MonthlyStaking({MstackValue,YOLOMonthly,sender}))
  setMStackValue("")
}

const setMwithdraw = (e)=>{
  e.preventDefault()
  dispatch(MonthlyWithdraw({MstackValue,YOLOMonthly,sender}))
  setMStackValue("")
}






const YOLOWeekly = useSelector((state)=>{
  return state.adoptReducer.WeeklyContract;
});

const Waddress = useSelector((state)=>{
  return state.adoptReducer.WeeklyContractAddress;
});


const setWApprove = (e)=>{
  e.preventDefault()
      dispatch(WeeklyApproval({Waddress,WstackValue , StakingToken,sender}))
}


const setWStacking = (e)=>{
  e.preventDefault()
  dispatch(WeeklyStaking({WstackValue,YOLOWeekly,sender}))
  setWStackValue("")
}

const setWwithdraw = (e)=>{
  e.preventDefault()
  dispatch(WeeklyWithdraw({WstackValue,YOLOWeekly,sender}))
  setWStackValue("")
}

var VS2$ = price*2;
var YOLO$ = price;


// using the saved `dataKey`, get the variable we're interested in
var balanceOf = useSelector((state)=>{
  return state.adoptReducer.balanceOfYearly;
})



//const balanceOf = null;
const Allocation = useSelector((state)=>{
  return state.adoptReducer.rewardOfYearly;
});
const RewardPerToken = useSelector((state)=>{
  return state.adoptReducer.rewardPerTokenYearly;
});;

console.log("reward",RewardPerToken)

const decimalsOfVs2 = useSelector((state)=>{
  return state.adoptReducer.decimalsOfVs2;
});



const StakeTime = useSelector((state)=>{
  return state.adoptReducer.cacheTimeYearly;
});


const MbalanceOf = useSelector((state)=>{
  return state.adoptReducer.balanceOfMonthly;
})
const MAllocation = useSelector((state)=>{
  return state.adoptReducer.rewardOfMonthly;
})
const MRewardPerToken = useSelector((state)=>{
  return state.adoptReducer.rewardPerTokenMonthly;
});;;

const MStakeTime = useSelector((state)=>{
  return state.adoptReducer.cacheTimeMonthly;
});;


const WbalanceOf = useSelector((state)=>{
  return state.adoptReducer.balanceOfWeekly;
});
const WAllocation = useSelector((state)=>{
  return state.adoptReducer.rewardOfWeekly;
});
const WRewardPerToken = useSelector((state)=>{
  return state.adoptReducer.rewardPerTokenWeekly;
});;;



const WStakeTime = useSelector((state)=>{
  return state.adoptReducer.cacheTimeWeekly;
});;



//var factor1 =  balanceOf / 10**decimalsOfVs2 * VS2$;
 
//var factor2 =  RewardPerToken == 0? 5000 / 10**9 : RewardPerToken / 10**9 * YOLO$;

// var APR = (factor1 / factor2 * 100).toFixed()
// console.log("balance of ", StakeTime )

 







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
            <div className="">{balanceOf && MbalanceOf && WbalanceOf && (Number(balanceOf)+Number(MbalanceOf)+Number(WbalanceOf))}</div>
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
                  {/* {(Number(WbalanceOf) / 10**(Number(decimalsOfVs2)) * VS2$ / Number(WRewardPerToken) / 10**9 * YOLO$ *100).toFixed()
} */}{Number(WbalanceOf)/10**Number(decimalsOfVs2)*VS2$/ (WRewardPerToken/10**9* YOLO$) * 100}
</div>
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
                      <div className="value">{WAllocation && WAllocation}</div>
                    </div>
                    <div className={`item ${false ? "percent" : ""}`}>
                      <div className="label">Stake Fee</div>
                      <div className="value">{weeklyData[1]}</div>
                    </div>
                    <div className={`item ${false ? "percent" : ""}`}>
                      <div className="label">Total Staked</div>
                      <div className="value">{WbalanceOf && WbalanceOf}</div>
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
              <div className="value"><WeeklyTimer stakeTime={WStakeTime && WStakeTime}></WeeklyTimer></div>
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
                  {Number(MbalanceOf)/10**Number(decimalsOfVs2)*VS2$/ (MRewardPerToken/10**9* YOLO$) * 100}</div>
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
                      <div className="value">{MAllocation && MAllocation}</div>
                    </div>
                    <div className={`item ${false ? "percent" : ""}`}>
                      <div className="label">Stake Fee</div>
                      <div className="value">{yearlyData[1]}</div>
                    </div>
                    <div className={`item ${false ? "percent" : ""}`}>
                      <div className="label">Total Staked</div>
                      <div className="value">{MbalanceOf && MbalanceOf}</div>
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
              <div className="value"><MonthlyTimer stakeTime={MStakeTime && MStakeTime}></MonthlyTimer></div>
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
                  {Number(balanceOf)/10**Number(decimalsOfVs2)*VS2$/ (RewardPerToken/10**9* YOLO$) * 100}</div>
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
                      <div className="value">{Allocation && Allocation}</div>
                    </div>
                    <div className={`item ${false ? "percent" : ""}`}>
                      <div className="label">Stake Fee</div>
                      <div className="value">{yearlyData[1]}</div>
                    </div>
                    <div className={`item ${false ? "percent" : ""}`}>
                      <div className="label">Total Staked</div>
                      <div className="value">{balanceOf && balanceOf}</div>
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
              <div className="value"><YearTimer stakeTime={StakeTime && StakeTime}></YearTimer></div>
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
