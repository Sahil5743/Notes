import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './redux/notesSlice.js';
import notesSlice from './redux/notesSlice.js';


export const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});