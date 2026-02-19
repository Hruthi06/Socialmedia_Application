package com.app.socialmedia.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String role;
    private boolean isBlocked = false;

    @ManyToMany
    @JoinTable(name = "user_follows", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "follower_id"))
    private java.util.Set<User> followers = new java.util.HashSet<>();

    @ManyToMany(mappedBy = "followers")
    private java.util.Set<User> following = new java.util.HashSet<>();

    public User() {
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isBlocked() {
        return isBlocked;
    }

    public void setBlocked(boolean blocked) {
        isBlocked = blocked;
    }

    public java.util.Set<User> getFollowers() {
        return followers;
    }

    public void setFollowers(java.util.Set<User> followers) {
        this.followers = followers;
    }

    public java.util.Set<User> getFollowing() {
        return following;
    }

    public void setFollowing(java.util.Set<User> following) {
        this.following = following;
    }
}
