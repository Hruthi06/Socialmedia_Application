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

    @PostMapping("/{userId}/toggle-block")
    public void toggleBlock(@PathVariable Long userId) {
        userService.toggleBlock(userId);
    }
}
