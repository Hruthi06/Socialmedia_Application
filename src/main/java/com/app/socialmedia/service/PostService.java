package com.app.socialmedia.service;

import com.app.socialmedia.model.Post;
import com.app.socialmedia.model.User;

import com.app.socialmedia.repository.PostRepository;
import com.app.socialmedia.repository.UserRepository;
import com.app.socialmedia.repository.CommentRepository;
import com.app.socialmedia.model.Comment;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;
    private final CommentRepository commentRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository,
            FileStorageService fileStorageService, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.fileStorageService = fileStorageService;
        this.commentRepository = commentRepository;
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

    public Post addComment(Long postId, Long userId, String content) {
        Post post = postRepository.findById(postId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();

        Comment comment = new Comment();
        comment.setPost(post);
        comment.setUser(user);
        comment.setContent(content);

        commentRepository.save(comment);
        return postRepository.findById(postId).orElseThrow();
    }

    public Post likePost(Long postId, Long userId) {
        if (postId == null || userId == null)
            throw new RuntimeException("ID cannot be null");

        Post post = postRepository.findById(postId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();

        if (post.getLikedBy().contains(user)) {
            post.getLikedBy().remove(user); // Unlike
        } else {
            post.getLikedBy().add(user); // Like
        }

        return postRepository.save(post);
    }
}
