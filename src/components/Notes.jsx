import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { removeFromNotes } from '../redux/notesSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const Notes = () => {
    const notes = useSelector((state) => state.notes.notes);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const [searchTerm, setSearchTerm] = useState('');
    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleDelete(notesId) {
        dispatch(removeFromNotes(notesId)); 
    }

    function handleShare(note) {
        const shareData = {
            title: note.title,
            text: note.value,
        };
        if (navigator.share) {
            navigator.share(shareData)
                .then(() => toast.success('Notes Shared Successfully'))
                .catch(() => toast.error('Sharing Failed'));
        } else {
            toast.error('Sharing not supported on this browser');
        }
    }

    function handleEdit(noteId) {
        navigate(`/?notesId=${noteId}`); 
    }

    function handleView(noteId) {
        navigate(`/notes/${noteId}`); 
    }

    return (
        <div className="grid gap-6">
            <h1 className="text-3xl font-bold text-yellow-600 mb-6">All Notes</h1>
            {filteredNotes.map((note) => (
                <div key={note._id} className="bg-white p-5 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800">{note.title}</h2>
                    <p className="text-gray-600 mt-2">{note.value}</p>
                    <div className="text-sm text-yellow-500 mt-2">
                        Created on: {format(new Date(note.createdAt), 'd MMM yyyy')}
                    </div>
                    <div className="flex justify-end gap-4 mt-4">
                        <button title="Delete" onClick={() => handleDelete(note._id)}>
                            <img
                                src="https://img.icons8.com/ios-filled/24/ffffff/delete-sign.png"
                                alt="Delete"
                                className="invert"
                            />
                        </button>

                        <button title="Edit" onClick={() => handleEdit(note._id)}>
                            <img
                                src="https://img.icons8.com/ios-filled/24/ffffff/edit.png"
                                alt="Edit"
                                className="invert"
                            />
                        </button>

                        <button title="View" onClick={() => handleView(note._id)}>
                            <img
                                src="https://img.icons8.com/ios-filled/24/ffffff/visible.png"
                                alt="View"
                                className="invert"
                            />
                        </button>

                        <button
                            title="Copy"
                            onClick={() => {
                                navigator.clipboard.writeText(note.value);
                                toast.success('Copied!');
                            }}
                        >
                            <img
                                src="https://img.icons8.com/ios-filled/24/ffffff/copy.png"
                                alt="Copy"
                                className="invert"
                            />
                        </button>

                        <button title="Share" onClick={() => handleShare(note)}>
                            <img
                                src="https://img.icons8.com/ios-filled/24/ffffff/share.png"
                                alt="Share"
                                className="invert"
                            />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Notes;
