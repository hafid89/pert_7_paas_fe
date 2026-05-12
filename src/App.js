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

  // Load notes on component mount
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const data = await noteService.getAllNotes();
      setNotes(data);
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
      const newNote = await noteService.createNote(note);
      setNotes([newNote, ...notes]);
    } catch (err) {
      alert('Failed to create note');
      console.error(err);
    }
  };

  const handleUpdateNote = async (note) => {
    try {
      const updatedNote = await noteService.updateNote(note.id, {
        title: note.title,
        content: note.content,
      });
      setNotes(notes.map(n => n.id === note.id ? updatedNote : n));
      setEditingNote(null);
    } catch (err) {
      alert('Failed to update note');
      console.error(err);
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await noteService.deleteNote(id);
        setNotes(notes.filter(n => n.id !== id));
      } catch (err) {
        alert('Failed to delete note');
        console.error(err);
      }
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    // Scroll to form
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