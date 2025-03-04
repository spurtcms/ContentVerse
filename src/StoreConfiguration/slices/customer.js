import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    count: 0,
    EntryListArray_Redux: [],
    header_api_result_redux: [],
    header_keyword: "",
    TenantId_redux:0,
    Header_api_result_redux_function:{},
    fetch_unique_id:0,
    Fetching_MemberDetail_redux:[]
};


export const customerSlice = createSlice({
    name: "cusromer",
    initialState,
    reducers: {
        addCount: (state, action) => {
            state.count = action.payload;
        },
        EntryList_Redux_function: (state, action) => {
            state.EntryListArray_Redux = action.payload;
        },

        Header_api_result_redux_function: (state, action) => {
            state.Header_api_result_redux_function = action.payload;
        },
        Header_keyword_redux_function: (state, action) => {
            state.header_keyword = action.payload;
        },
        TenantId_redux:(state,action)=>{
            state.TenantId_redux=action.payload;
        },
        fetch_unique_id:(state,action)=>{
            state.fetch_unique_id=action.payload;
        },
        Fetching_MemberDetail_redux:(state,action)=>{
            state.Fetching_MemberDetail_redux=action.payload
        }
    },
});


export const {

    addCount,
    EntryList_Redux_function,
    Header_api_result_redux_function,
    Header_keyword_redux_function,
    TenantId_redux,
    fetch_unique_id,
    Fetching_MemberDetail_redux

} = customerSlice.actions;

export default customerSlice.reducer;
