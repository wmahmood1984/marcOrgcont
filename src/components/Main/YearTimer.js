import React, { useEffect,useState } from 'react'

export default function YearTimer(props) {
    const [seconds, setSeconds] = useState(60);
    const stakeTime = props.stakeTime;
    var currentTimeinSeconds = new Date().getTime() / 1000
    var differenceTimeinSeconds = Math.trunc(stakeTime - currentTimeinSeconds)
    var MonthsRemaining = Math.trunc(differenceTimeinSeconds /60 /60/24 /30)
    var DaysRemaining = Math.trunc((differenceTimeinSeconds /60 /60/24)-(MonthsRemaining*30))
    var HoursRemaining = Math.trunc((differenceTimeinSeconds /60 /60)-(MonthsRemaining*30*24)-(DaysRemaining*24))
    var MinutesRemaining = Math.trunc((differenceTimeinSeconds /60 )-(MonthsRemaining*30*24*60)-(DaysRemaining*24*60)-(HoursRemaining*60))
    var SecondsRemaining = Math.trunc((differenceTimeinSeconds )-(MonthsRemaining*30*24*60*60)-(DaysRemaining*24*60*60)-(HoursRemaining*60*60)-(MinutesRemaining*60))
    
   

    useEffect(() => {
        let interval = null;
        
          interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
          }, 1000);

        return () => clearInterval(interval);
      }, [ seconds]);
    
    return (
      <div>
      {stakeTime !=0 ? <div>
      <span>{MonthsRemaining} Months      </span>
      <span>{DaysRemaining} Days     </span>
      <span>{HoursRemaining} Hours     </span>
      <span>{MinutesRemaining} Minutes     </span>
      <span>{SecondsRemaining} Seconds    </span>
      </div>:
      <div></div>
      }
  </div>
     )
}
