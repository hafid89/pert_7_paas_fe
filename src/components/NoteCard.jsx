import React from 'react';
import './NoteCard.css';

const NoteCard = ({ note, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="note-card">
      <div className="note-card-content">
        <h3 className="note-title">{note.judul}</h3>
        <p className="note-content">{note.isi}</p>
        <small className="note-date">Created: {formatDate(note.tanggal_dibuat)}</small>
        <div className="note-actions">
          <button onClick={() => onEdit(note)} className="edit-btn">
            Edit
          </button>
          <button onClick={() => onDelete(note.id)} className="delete-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;