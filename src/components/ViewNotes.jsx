import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewNotes = () => {
  const { id } = useParams();
  const allNotes = useSelector((state) => state.notes.notes);
  const notes = allNotes.find((note) => note._id === id); 

  if (!notes) {
    return <div>Note not found</div>; 
  }

  return (
   <div className="max-w-3xl mx-auto bg-white p-8 mt-10 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">View Note</h1>

      <label className="block text-gray-600 font-semibold mb-1">Title</label>
      <input
        type="text"
        value={notes.title}
        disabled
        className="w-full p-3 border rounded-lg bg-gray-100 text-gray-800 mb-6"
      />

      <label className="block text-gray-600 font-semibold mb-1">Content</label>
      <textarea
        value={notes.value}
        disabled
        rows={12}
        className="w-full p-4 border rounded-lg bg-gray-100 text-gray-800 resize-none"
      ></textarea>

      <div className="text-sm text-gray-500 mt-4">
        Created on: {new Date(notes.createdAt).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </div>
    </div>
  );
};

export default ViewNotes;
