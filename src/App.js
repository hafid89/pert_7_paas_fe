import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import { noteService } from './services/api';

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const response = await noteService.getAllNotes();
      // Perbaikan: ambil data dari response.data jika ada
      const notesData = response?.data || response;
      setNotes(Array.isArray(notesData) ? notesData : []);
      setError(null);
    } catch (err) {
      setError('Failed to load notes. Please check your connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (note) => {
    try {
      const response = await noteService.createNote(note);
      if (response?.success) {
        await loadNotes();
      }
    } catch (err) {
      alert('Failed to create note');
      console.error(err);
    }
  };

  
  const handleUpdateNote = async (noteData) => {
  try {
    const { id, judul, isi } = noteData;
    if (!id) {
      alert('Note ID is missing!');
      return;
    }
    const response = await noteService.updateNote(id, { judul, isi });
    if (response?.success) {
      await loadNotes();
      setEditingNote(null);
    } else {
      alert('Failed to update note');
    }
  } catch (err) {
    alert('Failed to update note');
    console.error(err);
  }
};

  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        const response = await noteService.deleteNote(id);
        if (response?.success) {
          await loadNotes();
        }
      } catch (err) {
        alert('Failed to delete note');
        console.error(err);
      }
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App">
      <Navbar />
      <main className="container">
        {error && <div className="error-message">{error}</div>}
        
        <NoteForm
          onSubmit={editingNote ? handleUpdateNote : handleCreateNote}
          editingNote={editingNote}
          setEditingNote={setEditingNote}
        />
        
        <div className="notes-header">
          <h2>Your Notes ({notes.length})</h2>
        </div>
        
        <NoteList
          notes={notes}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
          loading={loading}
        />
      </main>
    </div>
  );
}

export default App;