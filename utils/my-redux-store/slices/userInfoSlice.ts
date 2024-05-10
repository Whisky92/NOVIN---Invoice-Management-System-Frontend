import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserInfo {
    token: String;
    username: String;
}

interface UserInfoState {
    value: UserInfo;
}

const initialState: UserInfoState = {
    value: {
        token: "",
        username: ""
    }
}

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<String>) => {
            state.value.token = action.payload;
        },
        setUserName: (state, action: PayloadAction<String>) => {
            state.value.username = action.payload;
        }
    }
})

export const { setToken, setUserName } = userInfoSlice.actions;

export default userInfoSlice.reducer;