import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Student } from "../components/Type";

const adminSlice = createSlice({
  name: "aminDetails",
  initialState: {
    user: null,
  },
  reducers: {
    addAdmin: (state: any, action: PayloadAction<any>) => {
      state.user = action.payload;
      // console.log("payload", action.payload);
      // console.log("state", state);
    },
  },
});
export const { addAdmin } = adminSlice.actions;
export default adminSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { StudentType } from "../components/Type";

// interface AdminState {
//   user: StudentType | null;
// }

// const initialState: AdminState = {
//   user: null,
// };

// const adminSlice = createSlice({
//   name: "adminDetails",
//   initialState,
//   reducers: {
//     addAdmin: (state, action: PayloadAction<StudentType>) => {
//       state.user = action.payload;
//       console.log("payload", action.payload);
//       console.log("state", state);
//     },
//   },
// });

// export const { addAdmin } = adminSlice.actions;
// export default adminSlice.reducer;
