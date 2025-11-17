package com.zuma.notes_app_backend.service;

import com.zuma.notes_app_backend.entity.Note;

import java.util.List;

public interface NoteService {
    public Note createNote(Note note);

    public Note readNoteById(Long id);

    public List<Note> readAllNotes();

    public Note updateNote(Long id, Note note);

    public void deleteNoteById(Long id);
}
