import React, { useState, useEffect } from 'react';
import './NoteForm.css';

const NoteForm = ({ onSubmit, editingNote, setEditingNote }) => {
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');

  useEffect(() => {
    if (editingNote) {
      setJudul(editingNote.judul || '');
      setIsi(editingNote.isi || '');
    } else {
      setJudul('');
      setIsi('');
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!judul.trim() || !isi.trim()) {
      alert('Please fill all fields');
      return;
    }
    onSubmit({ judul, isi });
    setJudul('');
    setIsi('');
    if (setEditingNote) setEditingNote(null);
  };

  return (
    <div className="note-form-container">
      <h2>{editingNote ? 'Edit Note' : 'Create New Note'}</h2>
      <form onSubmit={handleSubmit} className="note-form">
        <input
          type="text"
          placeholder="Note Title"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          className="form-input"
        />
        <textarea
          placeholder="Note Content"
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
          className="form-textarea"
          rows="5"
        />
        <button type="submit" className="submit-btn">
          {editingNote ? 'Update Note' : 'Add Note'}
        </button>
        {editingNote && (
          <button
            type="button"
            onClick={() => setEditingNote(null)}
            className="cancel-btn"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default NoteForm;