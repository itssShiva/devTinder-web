import { createSlice } from "@reduxjs/toolkit";

const requestSlice=createSlice({
    name:"requests",
    initialState:[],
    reducers:{
        addRequests:(state,action)=>action.payload,
        removeRequests:(state,action)=>{
            const newArr=state.filter(r=>r._id!=action.payload)
            return newArr;
        },
    }
})

export const{addRequests,removeRequests}=requestSlice.actions;
export default requestSlice.reducer