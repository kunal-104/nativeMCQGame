// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
//   name: '',
//   username: '',
//   mobileNumber: '',
//   avatar: '',
//   currentLeague: '',
//   followers: 0,
//   following: 0,
//   streak: 0,
//   xp: 0,
//   diamonds: 0,
//   firstTimeGameOpening:true,

};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    hearts: 999,
    diamonds: 999,
    mcqData: null,
    currentMCQlevel: 0,
  },
  reducers: {
    setUserSession: (state, action) => {
      state.userData = action.payload;
    },
    setUpdateUserSession: (state, action) => {
      state.userData = { ...state.userData, ...action.payload }; // Merges existing userData with new fields
    },
    setAvatar: (state, action) => {
      state.userData = {...state.userData, avatar: action.payload}
    },
    setUpdateUnlockedLevels: (state) => {
      state.userData = {
        ...state.userData,
        levelsUnlocked: state.userData.levelsUnlocked + 1,
        xp: state.userData.xp + 20,
      };
    },
    setIncreaseXP: (state) => {
      state.userData = {
        ...state.userData,
        xp: state.userData.xp + 20,
      };
    },
    setMCQData: (state, action) => {
      state.mcqData = action.payload;
    },
    setcurrentMCQlevel: (state, action) => {
      state.currentMCQlevel = action.payload;
    },
    // setHearts: (state, action) => {
    //   state.hearts = action.payload;
    // },
    // setDiamonds: (state, action) => {
    //   state.diamonds = action.payload;
    // },
    // Other reducers can go here as needed
  },
//   reducers: {
//     setUser(state, action) {
//       return { ...state, ...action.payload };
//     },
//     updateFollowers(state, action) {
//       state.followers += action.payload;
//     },
//     updateFollowing(state, action) {
//       state.following += action.payload;
//     },
//     updateAvatar(state, action) {
//       state.avatar = action.payload;
//     },
//     updateStreak(state, action) {
//       state.streak += action.payload;
//     },
//     updateXP(state, action) {
//       state.xp += action.payload;
//     },
//     updateCurrentLeague(state, action) {
//       state.currentLeague = action.payload;
//     },
//     setfirstTimeGameOpening(state, action) {
//         state.firstTimeGameOpening = action.payload;
//     }
//   },
});


export const { setUserSession, setAvatar, setUpdateUserSession, setUpdateUnlockedLevels, setMCQData, setcurrentMCQlevel,setIncreaseXP } = userSlice.actions;
// export const { setUser, updateFollowers, updateFollowing, updateAvatar, updateStreak, updateXP, updateCurrentLeague } = userSlice.actions;
export default userSlice.reducer;
