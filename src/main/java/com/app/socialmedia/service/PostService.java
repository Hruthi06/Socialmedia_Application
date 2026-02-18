package com.app.socialmedia.service;

import com.app.socialmedia.model.Post;
import com.app.socialmedia.model.User;

import com.app.socialmedia.repository.PostRepository;
import com.app.socialmedia.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    public PostService(PostRepository postRepository, UserRepository userRepository,
            FileStorageService fileStorageService) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.fileStorageService = fileStorageService;
    }

    public Post createPost(Long userId, String content, org.springframework.web.multipart.MultipartFile file) {
        if (userId == null)
            throw new RuntimeException("User ID is null");
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            Post post = new Post();
            post.setUser(userOpt.get());
            post.setContent(content);

            if (file != null && !file.isEmpty()) {
                String fileName = fileStorageService.storeFile(file);
                post.setMediaUrl("/uploads/" + fileName);

                String contentType = file.getContentType();
                if (contentType != null && contentType.startsWith("video")) {
                    post.setMediaType("VIDEO");
                } else {
                    post.setMediaType("IMAGE");
                }
            }

            return postRepository.save(post);
        }
        throw new RuntimeException("User not found");
    }

    public List<Post> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<Post> getPostsByUserId(Long userId) {
        return postRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public void deletePost(Long postId, Long userId) {
        if (postId == null || userId == null)
            return;

        Optional<Post> postOpt = postRepository.findById(postId);
        Optional<User> userOpt = userRepository.findById(userId);

        if (postOpt.isPresent() && userOpt.isPresent()) {
            Post post = postOpt.get();
            User requestingUser = userOpt.get();

            // Allow if owner OR if user is ADMIN
            if (post.getUser().getId().equals(userId) || "ADMIN".equals(requestingUser.getRole())) {
                postRepository.delete(post);
            } else {
                throw new RuntimeException("Unauthorized: Only Admins or the post owner can delete this.");
            }
        }
    }

    public Post likePost(Long postId) {
        if (postId == null)
            throw new RuntimeException("ID cannot be null");
        Optional<Post> postOpt = postRepository.findById(postId);
        if (postOpt.isPresent()) {
            Post post = postOpt.get();
            post.setLikes(post.getLikes() + 1);
            return postRepository.save(post);
        }
        throw new RuntimeException("Post not found");
    }
}
