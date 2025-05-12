import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

const initialState = {
  notes: localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [],
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addToNotes: (state, action) => {
      const newNote = action.payload;
      state.notes.push(newNote);
      localStorage.setItem('notes', JSON.stringify(state.notes));
      toast.success('Note Created Successfully');
    },
    updateToNotes: (state, action) => {
      const updatedNote = action.payload;
      const index = state.notes.findIndex((note) => note._id === updatedNote._id);
      if (index !== -1) {
        state.notes[index] = updatedNote;
        localStorage.setItem('notes', JSON.stringify(state.notes));
        toast.success('Note Updated Successfully');
      } else {
        toast.error('Note not found');
      }
    },
    resetAllNotes: (state) => {
      state.notes = [];
      localStorage.removeItem('notes');
      toast.success('All Notes Deleted Successfully');
    },
    removeFromNotes: (state, action) => {
      const noteId = action.payload;
      const index = state.notes.findIndex((note) => note._id === noteId);
      if (index !== -1) {
        state.notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(state.notes));
        toast.success('Note Deleted Successfully');
      } else {
        toast.error('Note not found');
      }
    },
  },
});

export const { addToNotes, updateToNotes, resetAllNotes, removeFromNotes } = notesSlice.actions;

export default notesSlice.reducer;