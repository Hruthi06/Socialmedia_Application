package com.app.socialmedia.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String index() {
        return "<html><body>" +
                "<h1>Social Media App is Running!</h1>" +
                "<p>If you see this, the backend is working.</p>" +
                "<a href='/login.html'>Go to Login Page</a>" +
                "</body></html>";
    }

    @GetMapping("/status")
    public String status() {
        return "🚀 Social Media Application Backend is Running!";
    }
}
