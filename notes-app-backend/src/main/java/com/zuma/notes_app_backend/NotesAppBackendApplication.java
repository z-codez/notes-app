package com.zuma.notes_app_backend;

//import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NotesAppBackendApplication {

	public static void main(String[] args) {
		// Dotenv dotenv = Dotenv.load();
		SpringApplication.run(NotesAppBackendApplication.class, args);
	}

}
