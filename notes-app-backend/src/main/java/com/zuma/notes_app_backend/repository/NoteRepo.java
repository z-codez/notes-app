package com.zuma.notes_app_backend.repository;

import com.zuma.notes_app_backend.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepo extends JpaRepository<Note, Long> {  
}
