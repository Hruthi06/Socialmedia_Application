package com.app.socialmedia.config;

import com.app.socialmedia.model.User;

import com.app.socialmedia.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataInitializer(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Ensure Admin exists
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword("admin123");
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println("✅ Admin user created: admin / admin123");
        }

        if (userRepository.count() <= 1) { // If only admin or nothing
            // Regular Users
            User firstUser = null;
            String[] names = { "Alice", "Bob", "Charlie", "Diana", "Ethan" };
            for (String name : names) {
                if (userRepository.findByUsername(name).isEmpty()) {
                    User user = new User();
                    user.setUsername(name);
                    user.setPassword("pass123");
                    user.setRole("USER");
                    User saved = userRepository.save(user);
                    if (firstUser == null)
                        firstUser = saved;
                }
            }
            System.out.println("✅ Sample members verified.");
        }
    }
}
