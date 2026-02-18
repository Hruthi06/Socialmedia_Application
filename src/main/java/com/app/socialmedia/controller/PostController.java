package com.app.socialmedia.controller;

import com.app.socialmedia.model.Post;
import com.app.socialmedia.service.PostService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping(consumes = { "multipart/form-data" })
    public Post createPost(@RequestParam("userId") Long userId,
            @RequestParam("content") String content,
            @RequestParam(value = "file", required = false) org.springframework.web.multipart.MultipartFile file) {
        return postService.createPost(userId, content, file);
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/user/{userId}")
    public List<Post> getPostsByUser(@PathVariable Long userId) {
        return postService.getPostsByUserId(userId);
    }

    @PostMapping("/{postId}/like")
    public Post likePost(@PathVariable Long postId) {
        return postService.likePost(postId);
    }

    @DeleteMapping("/{postId}")
    public void deletePost(@PathVariable Long postId, @RequestParam Long userId) {
        postService.deletePost(postId, userId);
    }
}
