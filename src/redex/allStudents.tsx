import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "courseDetails",
  initialState: {
    course: [],
  },
  reducers: {
    // addCourse: (state: any, action: PayloadAction<any>) => {
    //   state.course.push(action.payload);
    //   // state.course = action.payload;
    //   console.log("payload", action.payload);
    //   console.log("state", state);
    // },

    addCourse: (state: any, action: PayloadAction<any>) => {
      const existingCourse = state.course.find(
        (c: any) => c.courseId === action.payload.courseId
      );

      if (!existingCourse) {
        state.course.push(action.payload);
        console.log("Course added:", action.payload);
      } else {
        console.log("Course already exists:", action.payload);
      }
    },
  },
});
export const { addCourse } = courseSlice.actions;
export default courseSlice.reducer;
