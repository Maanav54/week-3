package com.example.myapp.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.myapp.dto.LoginRequest;
import com.example.myapp.dto.SignupRequest;
import com.example.myapp.model.User;
import com.example.myapp.repo.UserRepository;

@RestController
public class AuthController {

    private final UserRepository db;

    // Constructor injection
    public AuthController(UserRepository db) {
        this.db = db;
    }

    @PostMapping("/signup")
    public String signUp(@RequestBody SignupRequest sd) {
        System.out.println("\n\t signup DATA : " + sd.toString());
        return "signup success -> {\n\t name: " + sd.getName() +
               "\n\t email: " + sd.getEmail() + "\n}";
    }
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest data) {

        User user = db.findByEmail(data.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(data.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return "Login successful";
    }
}
