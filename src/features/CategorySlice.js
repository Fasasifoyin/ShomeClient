import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../actions/Products";

const initialState = {
    categories: [],
    status: "idle",
    error: null
}

const categoriesSlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getCategories.pending, (state, action) => {
            return {
                ...state,
                status: "pending",
            }
        })
        .addCase(getCategories.fulfilled, (state, action) => {
            return {
                ...state,
                status: "success",
                categories: action.payload
            }
        })
        .addCase(getCategories.rejected, (state, action) => {
            return {
                ...state,
                status: "failed",
                error: action.payload
            }
        })
    }
})

export const Categories = (state) => state.category.categories
export const CategoriesError = (state) => state.category.error
export const CategoriesStatus = (state) => state.category.status

export default categoriesSlice.reducer