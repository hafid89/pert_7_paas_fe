import axios from 'axios';

// Ganti dengan URL backend Cloud Run Anda
const API_BASE_URL = 'https://be-rest-805566040091.us-central1.run.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const noteService = {
  // Get all notes
  getAllNotes: async () => {
    try {
      const response = await api.get('/notes');
      return response.data;
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  },

  // Create note
  createNote: async (note) => {
    try {
      const response = await api.post('/notes', note);
      return response.data;
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  },

  // Update note
  updateNote: async (id, note) => {
    try {
      const response = await api.put(`/notes/${id}`, note);
      return response.data;
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  },

  // Delete note
  deleteNote: async (id) => {
    try {
      const response = await api.delete(`/notes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  },
};