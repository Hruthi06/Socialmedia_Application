package com.app.socialmedia.controller;

import com.app.socialmedia.model.User;
import com.app.socialmedia.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public User getUser(@PathVariable Long userId) {
        return userService.findById(userId);
    }

    @GetMapping("/search")
    public User getUserByUsername(@RequestParam String username) {
        return userService.findByUsername(username);
    }

    @PostMapping(value = "/{userId}/profile", consumes = { "multipart/form-data" })
    public User updateProfile(@PathVariable Long userId,
            @RequestParam(value = "bio", required = false) String bio,
            @RequestParam(value = "file", required = false) org.springframework.web.multipart.MultipartFile file) {
        return userService.updateProfile(userId, bio, file);
    }

    @PostMapping("/{userId}/toggle-block")
    public void toggleBlock(@PathVariable Long userId) {
        userService.toggleBlock(userId);
    }
}
