import React, { use } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToNotes, updateToNotes } from '../redux/notesSlice';
import { useEffect } from 'react'



const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [serchParams, setSerchParams] = useSearchParams();
    const notesId = serchParams.get('notesId');
    const dispatch = useDispatch();
    const allNotes = useSelector((state) => state.notes.notes);
     useEffect(() => {
           if (notesId) {
            const notes = allNotes.find((note) => note._id === notesId);
            if (notes) { 
              setTitle(notes.title);
              setValue(notes.value);
            }
           }
        }, [notesId, allNotes]); 
    function createNotes() {
        const notes = {
            title: title,
            value: value,
            _id: notesId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }
               if(notesId) {
        dispatch(updateToNotes(notes))
        }
        else{
            dispatch(addToNotes(notes));
        }
        setValue('');
        setTitle('');
        setSerchParams({});
        
    }
  return (
    <div className="bg-[#1f1f1f] text-white p-6 rounded-xl shadow-md">

    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <input
        className="p-3 border rounded-lg w-full"
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        className="bg-yellow-600 text-orange px-4 py-2 rounded-lg hover:bg-orange-700 transition"
        onClick={createNotes}
      >
        {notesId ? 'Update Note' : 'Create Note'}
      </button>
    </div>
    <textarea
      className="w-full p-3 border rounded-lg min-h-[100vh]"
      placeholder="Enter your note here..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  </div>
  )
}

export default Home
