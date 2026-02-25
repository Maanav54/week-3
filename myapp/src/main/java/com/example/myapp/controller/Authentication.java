package com.example.myapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

import com.example.myapp.dto.LoginRequest;
import com.example.myapp.dto.SignupRequest;
import com.example.myapp.dto.PageResponse;
import com.example.myapp.model.User;
import com.example.myapp.repo.UserRepository;
import com.example.myapp.security.JwtService;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class Authentication {

    @Autowired
    UserRepository db;
    @Autowired
    JwtService jwtService;

    @PostMapping("/signup")
    String m(@RequestBody SignupRequest obj) {
        System.out.println("\t name :" + obj.getName());
        System.out.println("\t name :" + obj.getEmail());
        System.out.println("\t name :" + obj.getPassword());

        User u = new User();

        u.setName(obj.getName());
        u.setEmail(obj.getEmail());
        u.setPassword(obj.getPassword());

        db.save(u);

        return "signup sucess";
    }

    @PostMapping("/login")
    public Map<Object, Object> login(@RequestBody LoginRequest req) {
        Map<Object, Object> res = new HashMap<>();
        Optional<User> op = db.findByEmail(req.getEmail());
        if (op.isEmpty()) {
            res.put("message", "Invalid credentials");
            return res;
        }
        User user = op.get();
        if (!user.getPassword().equals(req.getPassword())) {
            res.put("message", "Invalid credentials");
            return res;
        }
        String token = jwtService.generateToken(user.getEmail());
        res.put("token", token);
        return res;
    }

    @GetMapping("/users")
    List<User> getALlUsers() {

        return db.findAll();
    }
  
    @PutMapping("/user/{id}")
    public Map<Object, Object> updateUser(
            @PathVariable Long id,
            @RequestBody SignupRequest obj) {

        Map<Object, Object> res = new HashMap<>();

        Optional<User> op = db.findById(id);
        if (op.isEmpty()) {
            res.put("sucess", false);
            res.put("msg", "User not found");
            return res;
        }
        User user = op.get();

        user.setName(obj.getName());
        user.setEmail(obj.getEmail());
        user.setPassword(obj.getPassword());
        db.save(user);
        res.put("sucess", true);
        res.put("msg", "user updated sucessfullty!");
        res.put("name", user.getName());
        res.put("email", user.getEmail());
        return res;

    }

    @DeleteMapping("/user/{id}")
    public Map<Object, Object> deleteUser(@PathVariable Long id) {
        Map<Object, Object> res = new HashMap<>();
        Optional<User> op = db.findById(id);
        if (op.isEmpty()) {
            res.put("msg", "user not found ");
            res.put("sucess", "failed to delete ");
        }
        db.deleteById(id);

        return res;
    }

}
