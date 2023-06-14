import { createSlice } from "@reduxjs/toolkit"
import { InitialUserState } from "../Types";

const initialState: InitialUserState = {
    user: null,
};

export const userSlice = createSlice({
    name: "user", //userがログインしている状態を監視する
    initialState,
    reducers: {
        login: (state, action) =>{
            state.user = action.payload; //現在のユーザーの状態を更新
        },
        logout: (state) => {
            state.user = null;
        }
    }
});
// console.log(userSlice);

export default userSlice.reducer;