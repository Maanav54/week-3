package com.example.myapp.controller;

import java.lang.runtime.ObjectMethods;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;          

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.myapp.dto.LoginRequest;
import com.example.myapp.dto.SignupRequest;
import com.example.myapp.model.User;
import com.example.myapp.repo.UserRepository;

@CrossOrigin(origins = "*")
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

}
