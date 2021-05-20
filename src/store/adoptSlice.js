import Web3 from 'web3'
import YOLOYearly from '../contracts/YOLOYearly.json'

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


var contract;
var address;

export const initWeb3 = createAsyncThunk(
    "InitWeb3",
    async(a,thunkApi)=>{
        //console.log(" init web3 called ")
        
        try {
            if(Web3.givenProvider){
                const web3 = new Web3(Web3.givenProvider);
                
                await Web3.givenProvider.enable()
                console.log("check",web3)
                const networkId = await web3.eth.net.getId()
                const network = YOLOYearly.networks[networkId]
                contract = new web3.eth.Contract(YOLOYearly.abi, network.address);
                const addresses = await web3.eth.getAccounts()
                address = addresses[0];
                // thunkApi.dispatch(loadArray({
                //     contract: contract,
                    
                // }))
                
                
                return {
                    web3,
                    contract,
                    address : addresses[0],
                                   }
            }else {console.log("error in loading web3")}    
        } catch (error) {
            console.log("Error", error)
        }
        
    }
)


// export const loadArray = createAsyncThunk("loadArray", 
//     async ({contract})=>{
//         try {
        
//             const arrayResult = await contract.methods.getData().call()
//             console.log("from server", arrayResult)
//             return arrayResult
            
//         } catch (error) {
//             console.log("Error in ArrayThunk",error)
//         }
//     }
//     )

// export const sendData = createAsyncThunk("sendData", 
//     async ({id,desc,amount})=>{
//         try {
            
//             const result = await contract.methods.addObj(id,desc,amount).send({from : address})
//             console.log("id",id)
//             console.log("desc",desc)
//             console.log("amount",amount)
//             return result;
            
//         } catch (error) {
//             console.log("Error in sendDataThunk",error)
//         }
//     }
//     )




const adoptSlice = createSlice({
    name: "AdopSlice",
    initialState: {
        web3: null,
        contract: null,
        address: null,
        arrayResult: null,
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
            state.contract = action.payload.contract;
            state.address = action.payload.address;
        },
        // [loadArray.fulfilled] : (state,action)=>{
        //     state.arrayResult = action.payload
        // },
        // [sendData.pending] : (state,action)=>{
        //     state.arrayAwait = true;
        //     state.toggle = !state.toggle;
        // },
        // [sendData.fulfilled] : (state,action)=>{
        //     state.arrayAwait = false;
        //     state.toggle = !state.toggle;
            
        // }

    }
})

export const adopreducer = adoptSlice.reducer;
export const { toggle } = adoptSlice.actions