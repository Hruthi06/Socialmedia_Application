package com.app.socialmedia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.app.socialmedia.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
