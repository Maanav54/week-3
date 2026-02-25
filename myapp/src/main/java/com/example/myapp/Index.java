package com.example.myapp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.myapp.dto.R;
import com.example.myapp.model.User;
import com.example.myapp.repo.UserRepository;

@RestController
public class Index {
    @GetMapping("/")
    ResponseEntity<?> m() {
        // return new R();
        return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(new R());    
    }
    

}
