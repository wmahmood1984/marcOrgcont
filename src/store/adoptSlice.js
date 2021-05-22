import Web3 from 'web3'
import {VS2} from '../deployed/VS2'
import {YOLO} from '../deployed/YOLO'
import {YOLOYearly} from '../deployed/YOLOYearly'
import {YOLOMonthly} from '../deployed/YOLOMonthly'
import {YOLOWeekly} from '../deployed/YOLOWeekly'


const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");




export const initWeb3 = createAsyncThunk(
    "InitWeb3",
    async(a,thunkApi)=>{
        //console.log(" init web3 called ")
        
        try {
            if(Web3.givenProvider){
                const web3 = new Web3(Web3.givenProvider);
                await Web3.givenProvider.enable()
                const networkId = await web3.eth.net.getId()
                const VS2Address = "0x3FB2dD9fC94fBf559794D5bDbD2A4920C0f2239c"
                const YOLOAddress = "0xDD110ce8CC33591E4A2eE75498BB599FFDa60cD9"
                const YOLOYearlyAddress = "0xE44ca100977a15D02EF9187DC47F68f53045DEEE"
                const YOLOMonthlyAddress = "0x4e8d10A6dF0b19F7710d8Be253f1CBBf9C74d149"
                const YOLOWeeklyAddress = "0x9129D45961d961582b769A5563403Ad0b61C5A6A"
                //const network = VS2.networks[networkId]
                var VS2Contract = new web3.eth.Contract(VS2, VS2Address);
                var YOLOContract = new web3.eth.Contract(YOLO, YOLOAddress);
                var YOLOYearlyContract = new web3.eth.Contract(YOLOYearly, YOLOYearlyAddress);
                var YOLOMonthlyContract = new web3.eth.Contract(YOLOMonthly, YOLOMonthlyAddress);
                var YOLOWeeklyContract = new web3.eth.Contract(YOLOWeekly, YOLOWeeklyAddress);
                const addresses = await web3.eth.getAccounts()
                var address = addresses[0];
                thunkApi.dispatch(balanceOfYearly({
                    contract: YOLOYearlyContract,
                    address: address
                    
                }))
                thunkApi.dispatch(balanceOfMonthly({
                    contract: YOLOMonthlyContract,
                    address: address
                    
                }))
                thunkApi.dispatch(balanceOfWeekly({
                    contract: YOLOWeeklyContract,
                    address: address
                    
                }))
                thunkApi.dispatch(rewardOfYearly({
                    contract: YOLOYearlyContract,
                    address: address
                    
                }))
                thunkApi.dispatch(rewardOfMonthly({
                    contract: YOLOMonthlyContract,
                    address: address
                    
                }))
                thunkApi.dispatch(rewardOfWeekly({
                    contract: YOLOWeeklyContract,
                    address: address
                    
                }))
                thunkApi.dispatch(decimalsOfVs2({
                    contract: VS2Contract,
                    address: address
                    
                }))
                

                
                return {
                    web3,
                    VS2Contract,
                    YOLOContract,
                    YOLOYearlyContract,
                    YOLOMonthlyContract,
                    YOLOWeeklyContract,
                    address : addresses[0],
                                   }
            }else {console.log("error in loading web3")}    
        } catch (error) {
            console.log("Error", error)
        }
        
    }
)


export const balanceOfYearly = createAsyncThunk("balanceOfYearly", 
    async ({contract, address})=>{
        try {
            const cacheTime = await contract.methods.stakeTime(address).call()
            const arrayResult = await contract.methods.balanceOf(address).call()
           
            return {arrayResult,cacheTime}
            
        } catch (error) {
            console.log("Error in ArrayThunk",error)
        }
    }
    )
export const balanceOfMonthly = createAsyncThunk("balanceOfMonthly", 
    async ({contract, address})=>{
        try {
        
            const cacheTime = await contract.methods.stakeTime(address).call()
            const arrayResult = await contract.methods.balanceOf(address).call()
            
            return {arrayResult,cacheTime}
            
        } catch (error) {
            console.log("Error in ArrayThunk",error)
        }
    }
    )
export const balanceOfWeekly = createAsyncThunk("balanceOfWeekly", 
    async ({contract, address})=>{
        try {
            
            const cacheTime = await contract.methods.stakeTime(address).call()
            const arrayResult = await contract.methods.balanceOf(address).call()
            
            return {arrayResult,cacheTime}
            
        } catch (error) {
            console.log("Error in ArrayThunk",error)
        }
    }
    )
   
export const rewardOfYearly = createAsyncThunk("rewardOfYearly", 
    async ({contract, address})=>{
        try {
            const rewardPerToken = await contract.methods.rewardPerToken().call();
            const arrayResult = await contract.methods.rewardRate().call()
            
            return {rewardOfYearly: arrayResult,rewardPerToken}
            
        } catch (error) {
            console.log("Error in ArrayThunk",error)
        }
    }
    )

export const rewardOfMonthly = createAsyncThunk("rewardOfMonthly", 
    async ({contract, address})=>{
        try {
            
            const rewardPerToken = await contract.methods.rewardPerToken().call();
            const arrayResult = await contract.methods.rewardRate().call()
            
            return {rewardOfYearly: arrayResult,rewardPerToken}
            
        } catch (error) {
            console.log("Error in ArrayThunk",error)
        }
    }
    )

export const rewardOfWeekly = createAsyncThunk("rewardOfWeekly", 
    async ({contract, address})=>{
        try {
        
            const rewardPerToken = await contract.methods.rewardPerToken().call();
            const arrayResult = await contract.methods.rewardRate().call()
            
            return {rewardOfYearly: arrayResult,rewardPerToken}
            
        } catch (error) {
            console.log("Error in ArrayThunk",error)
        }
    }
    )

export const decimalsOfVs2 = createAsyncThunk("decimalsOfVs2", 
    async ({contract, address})=>{
        try {
        
            const decimals = await contract.methods.decimals().call();
            
            console.log("decimals",decimals)
            return decimals
            
        } catch (error) {
            console.log("Error in ArrayThunk",error)
        }
    }
    )

export const YearlyApproval = createAsyncThunk("YearlyApproval", 
    async ({address,stackValue , StakingToken,sender})=>{
        try {
            
                 
            const result = await StakingToken.methods.approve(address,stackValue).send({from : sender})
            return result;
            
        } catch (error) {
            console.log("Error in sendDataThunk",error)
        }
    }
    )

export const MonthlyApproval = createAsyncThunk("MonthlyApproval", 
    async ({Maddress,MstackValue , StakingToken,sender})=>{
        try {
            
//            console.log("from server",StakingToken)        
            const result = await StakingToken.methods.approve(Maddress,MstackValue).send({from : sender})
            return result;
            
        } catch (error) {
            console.log("Error in sendDataThunk",error)
        }
    }
    )

export const WeeklyApproval = createAsyncThunk("WeeklyApproval", 
    async ({Waddress,WstackValue , StakingToken,sender})=>{
        try {
            
//            console.log("from server",StakingToken)        
            const result = await StakingToken.methods.approve(Waddress,WstackValue).send({from : sender})
            return result;
            
        } catch (error) {
            console.log("Error in sendDataThunk",error)
        }
    }
    )

export const YearlyStaking = createAsyncThunk("YearlyStaking", 
    async ({stackValue,YOLOYearly,sender})=>{
        try {

            
            const result = await YOLOYearly.methods.stake(stackValue).send({from : sender})
            return result;
            
        } catch (error) {
            console.log("Error in sendDataThunk",error)
        }
    }
    )

export const MonthlyStaking = createAsyncThunk("MonthlyStaking", 
    async ({MstackValue,YOLOMonthly,sender})=>{
        try {

            
            const result = await YOLOMonthly.methods.stake(MstackValue).send({from : sender})
            return result;
            
        } catch (error) {
            console.log("Error in sendDataThunk",error)
        }
    }
    )

export const WeeklyStaking = createAsyncThunk("WeeklyStaking", 
    async ({WstackValue,YOLOWeekly,sender})=>{
        try {

            
            const result = await YOLOWeekly.methods.stake(WstackValue).send({from : sender})
            return result;
            
        } catch (error) {
            console.log("Error in sendDataThunk",error)
        }
    }
    )

export const YearlyWithdraw = createAsyncThunk("YearlyWithdraw", 
    async ({stackValue,YOLOYearly,sender})=>{
        try {
            
            const result = await YOLOYearly.methods.withdraw(stackValue).send({from : sender})
            return result;
            
        } catch (error) {
            console.log("Error in sendDataThunk",error)
        }
    }
    )
    
export const MonthlyWithdraw = createAsyncThunk("YearlyWithdraw", 
    async ({MstackValue,YOLOMonthly,sender})=>{
        try {
            
            const result = await YOLOMonthly.methods.withdraw(MstackValue).send({from : sender})
            return result;
            
        } catch (error) {
            console.log("Error in sendDataThunk",error)
        }
    }
    )
    
    export const WeeklyWithdraw = createAsyncThunk("YearlyWithdraw", 
    async ({WstackValue,YOLOWeekly,sender})=>{
        try {
            
            const result = await YOLOWeekly.methods.withdraw(WstackValue).send({from : sender})
            return result;
            
        } catch (error) {
            console.log("Error in sendDataThunk",error)
        }
    }
    )






const adoptSlice = createSlice({
    name: "AdopSlice",
    initialState: {
        web3: null,
        YOLOContract: null,
        VS2Contract:null,
        YearlyContract:null,
        MonthlyContract:null,
        WeeklyContract:null,
        YearlyContractAddress:null,
        MonthlyContractAddress:null,
        WeeklyContractAddress:null,
        address: null,
        balanceOfYearly: null,
        balanceOfMonthly: null,
        balanceOfWeekly : null,
        rewardOfYearly: null,
        rewardOfMonthly: null,
        rewardOfWeekly : null,
        rewardPerTokenYearly:null,
        rewardPerTokenMonthly:null,
        rewardPerTokenWeekly:null,
        cacheTimeYearly:null,
        cacheTimeMonthly:null,
        cacheTimeWeekly:null,
        decimalsOfVs2: null,
        arrayAwait : false,
        toggle: false
         
    },
    reducers: {
        toggle : (state,actions)=>{
            state.toggle = !state.toggle;
        }
    },
    extraReducers: {
        [initWeb3.fulfilled] : (state,action)=>{
            state.web3 = action.payload.web3;
            state.VS2Contract = action.payload.VS2Contract;
            state.YOLOContract = action.payload.YOLOContract;
            state.YearlyContract = action.payload.YOLOYearlyContract;
            state.MonthlyContract = action.payload.YOLOMonthlyContract;
            state.WeeklyContract = action.payload.YOLOWeeklyContract;
            state.address = action.payload.address;
            state.YearlyContractAddress = action.payload.YOLOYearlyContract._address;
            state.MonthlyContractAddress = action.payload.YOLOMonthlyContract._address;
            state.WeeklyContractAddress = action.payload.YOLOWeeklyContract._address;
        
         },
        [balanceOfYearly.fulfilled] : (state,action)=>{
            state.balanceOfYearly = action.payload.arrayResult
            state.cacheTimeYearly = action.payload.cacheTime
        },
        [balanceOfMonthly.fulfilled] : (state,action)=>{
            state.balanceOfMonthly = action.payload.arrayResult
            state.cacheTimeMonthly = action.payload.cacheTime
        },
        [balanceOfWeekly.fulfilled] : (state,action)=>{
            state.balanceOfWeekly = action.payload.arrayResult
            state.cacheTimeWeekly = action.payload.cacheTime
        },
        [rewardOfYearly.fulfilled] : (state,action)=>{
            state.rewardOfYearly = action.payload.rewardOfYearly
            console.log("in loader",action.payload)
            state.rewardPerTokenYearly = action.payload.rewardPerToken
        },
        [rewardOfMonthly.fulfilled] : (state,action)=>{
            state.rewardOfMonthly = action.payload.rewardOfMonthly
            state.rewardPerTokenMonthly = action.payload.rewardPerToken
        },
        [rewardOfWeekly.fulfilled] : (state,action)=>{
            state.rewardOfWeekly = action.payload.rewardOfWeekly
            state.rewardPerTokenWeekly = action.payload.rewardPerToken
        },
        [decimalsOfVs2.fulfilled] : (state,action)=>{

            state.decimalsOfVs2 = action.payload
        
        },


        [YearlyApproval.pending] : (state,action)=>{
            state.arrayAwait = true;
            state.toggle = !state.toggle;
        },
        [YearlyApproval.fulfilled] : (state,action)=>{
            state.arrayAwait = false;
            state.toggle = !state.toggle;
            
        },
        [MonthlyApproval.pending] : (state,action)=>{
            state.arrayAwait = true;
            state.toggle = !state.toggle;
        },
        [MonthlyApproval.fulfilled] : (state,action)=>{
            state.arrayAwait = false;
            state.toggle = !state.toggle;
            
        }
        ,
        [WeeklyApproval.pending] : (state,action)=>{
            state.arrayAwait = true;
            state.toggle = !state.toggle;
        },
        [WeeklyApproval.fulfilled] : (state,action)=>{
            state.arrayAwait = false;
            state.toggle = !state.toggle;
            
        }
        
        ,
        [YearlyStaking.pending] : (state,action)=>{
            state.arrayAwait = true;
            state.toggle = !state.toggle;
        },
        [YearlyStaking.fulfilled] : (state,action)=>{
            state.arrayAwait = false;
            state.toggle = !state.toggle;
            
        },
        [MonthlyStaking.pending] : (state,action)=>{
            state.arrayAwait = true;
            state.toggle = !state.toggle;
        },
        [MonthlyStaking.fulfilled] : (state,action)=>{
            state.arrayAwait = false;
            state.toggle = !state.toggle;
            
        },
        [WeeklyStaking.pending] : (state,action)=>{
            state.arrayAwait = true;
            state.toggle = !state.toggle;
        },
        [WeeklyStaking.fulfilled] : (state,action)=>{
            state.arrayAwait = false;
            state.toggle = !state.toggle;
            
        },
        [YearlyWithdraw.pending] : (state,action)=>{
            state.arrayAwait = true;
            state.toggle = !state.toggle;
        },
        [YearlyWithdraw.fulfilled] : (state,action)=>{
            state.arrayAwait = false;
            state.toggle = !state.toggle;
            
        },
        [MonthlyWithdraw.pending] : (state,action)=>{
            state.arrayAwait = true;
            state.toggle = !state.toggle;
        },
        [MonthlyWithdraw.fulfilled] : (state,action)=>{
            state.arrayAwait = false;
            state.toggle = !state.toggle;
            
        },
        [WeeklyWithdraw.pending] : (state,action)=>{
            state.arrayAwait = true;
            state.toggle = !state.toggle;
        },
        [WeeklyWithdraw.fulfilled] : (state,action)=>{
            state.arrayAwait = false;
            state.toggle = !state.toggle;
            
        },

    }
})

export const adopreducer = adoptSlice.reducer;
export const { toggle } = adoptSlice.actions