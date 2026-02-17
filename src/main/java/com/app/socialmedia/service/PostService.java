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

    public PostService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public Post createPost(Long userId, String content, String imageUrl) {
        if (userId == null)
            throw new RuntimeException("User ID is null");
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            Post post = new Post();
            post.setUser(userOpt.get());
            post.setContent(content);
            post.setImageUrl(imageUrl);
            return postRepository.save(post);
        }
        throw new RuntimeException("User not found");
    }

    public List<Post> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc();
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
