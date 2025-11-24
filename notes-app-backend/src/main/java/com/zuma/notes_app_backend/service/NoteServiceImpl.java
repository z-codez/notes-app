package com.zuma.notes_app_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.zuma.notes_app_backend.entity.Note;
import com.zuma.notes_app_backend.repository.NoteRepo;

@Service
public class NoteServiceImpl implements NoteService {
    
    private final NoteRepo noteRepo;

    // Constructor Injection
    public NoteServiceImpl(NoteRepo noteRepo) {
        this.noteRepo = noteRepo;
    }

    @Override
    public Note createNote(Note note) {
        return this.noteRepo.save(note);
    }    
    
    @Override
    public Note readNoteById(Long id) {
        return this.noteRepo.findById(id).orElseThrow(() -> new RuntimeException("Note not found with id: " + id));
    }

    @Override
    public List<Note> readAllNotes() {
        return this.noteRepo.findAll();
    }

    @Override
    public Note updateNote(Long id, Note note) {
        Note existingNote = this.noteRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found with id: " + id));
        // Update other fields as necessary
        existingNote.setTitle(note.getTitle());
        existingNote.setContent(note.getContent());
        
        return this.noteRepo.save(existingNote);
    }

    @Override
    public void deleteNoteById(Long id) {
        throw new UnsupportedOperationException("Unimplemented method 'deleteNoteById'");
    }


}
