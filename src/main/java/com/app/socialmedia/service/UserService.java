package com.app.socialmedia.service;

import com.app.socialmedia.model.User;
import com.app.socialmedia.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    public UserService(UserRepository userRepository, FileStorageService fileStorageService) {
        this.userRepository = userRepository;
        this.fileStorageService = fileStorageService;
    }

    public User findById(Long id) {
        if (id == null)
            return null;
        return userRepository.findById(id).orElse(null);
    }

    public User updateProfile(Long userId, String bio, org.springframework.web.multipart.MultipartFile file) {
        if (userId == null)
            throw new RuntimeException("User ID is required");
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (bio != null) {
            user.setBio(bio);
        }

        if (file != null && !file.isEmpty()) {
            String fileName = fileStorageService.storeFile(file);
            user.setProfilePicture("/uploads/" + fileName);
        }

        return userRepository.save(user);
    }

    public User saveUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        if (user.getRole() == null)
            user.setRole("USER");
        return userRepository.save(user);
    }

    public User authenticate(String username, String password) {
        User user = userRepository.findByUsername(username)
                .filter(u -> u.getPassword().equals(password))
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (user.isBlocked()) {
            throw new RuntimeException("ACCESS DENIED: Your account has been suspended from the grid.");
        }
        return user;
    }

    public void toggleBlock(Long userId) {
        if (userId == null)
            return;
        userRepository.findById(userId).ifPresent(u -> {
            if (!"ADMIN".equals(u.getRole())) { // Prevent blocking admins
                u.setBlocked(!u.isBlocked());
                userRepository.save(u);
            }
        });
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }
}
