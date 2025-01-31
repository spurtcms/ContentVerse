import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    count: 0,
    EntryListArray_Redux: [],
    header_api_result_redux: [],
    header_keyword: ""

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
            state.header_api_result_redux = action.payload;
        },
        Header_keyword_redux_function: (state, action) => {
            state.header_keyword = action.payload;
        }



    },
});


export const {

    addCount,
    EntryList_Redux_function,
    Header_api_result_redux_function,
    Header_keyword_redux_function

} = customerSlice.actions;

export default customerSlice.reducer;
