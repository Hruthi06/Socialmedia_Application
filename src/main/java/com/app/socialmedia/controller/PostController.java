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

    @PostMapping
    public Post createPost(@RequestBody Map<String, String> payload) {
        Long userId = Long.parseLong(payload.get("userId"));
        String content = payload.get("content");
        String imageUrl = payload.get("imageUrl");
        return postService.createPost(userId, content, imageUrl);
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
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
