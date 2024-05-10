import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Token {
    token: String;
}

interface TokenState {
    value: Token;
}

const initialState: TokenState = {
    value: {
        token: ""
    }
}

const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<String>) => {
            state.value.token = action.payload;
        }
    }
})

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;