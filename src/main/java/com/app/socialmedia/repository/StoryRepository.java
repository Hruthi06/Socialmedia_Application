package com.app.socialmedia.repository;

import com.app.socialmedia.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface StoryRepository extends JpaRepository<Story, Long> {
    List<Story> findByExpiresAtAfterOrderByCreatedAtDesc(LocalDateTime now);
}
