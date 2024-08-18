package com.example.demo.Controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entity.ChatMessage;
import com.example.demo.Entity.Product;
import com.example.demo.Entity.UserEntity;
import com.example.demo.Service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public UserEntity signup(@RequestBody UserEntity user) {
        // Handle user registration
        return userService.signup(user);
    }

    @GetMapping("/login")
    public boolean login(@RequestParam String username, @RequestParam String password) {
        // Handle user login
        return userService.login(username, password);
    }

    @PostMapping("/sell")
    public String sellProduct(@RequestBody Product product, @RequestHeader("username") String username) {
        // Handle product selling
        product.setUsername(username);
        userService.saveProduct(product);
        return "Product listed successfully!";
    }

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        // Retrieve all products
        return userService.getAllProducts();
    }

    @GetMapping("/products/{id}")
    public Optional<Product> getProductById(@PathVariable Long id) {
        // Retrieve product by ID
        return userService.getProductById(id);
    }

    @GetMapping("/products/user/{userId}")
    public List<Product> getProductsByUserId(@PathVariable Long userId) {
        // Retrieve products by user ID
        return userService.getProductsByUserId(userId);
    }

    @GetMapping("/products/username/{username}")
    public List<Product> getProductsByUsername(@PathVariable String username) {
        // Retrieve products by username
        return userService.getProductsByUsername(username);
    }
 

    // Delete a product by ID
    @DeleteMapping("products/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long productId) {
        boolean isDeleted = userService.deleteProduct(productId);
        if (isDeleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }
    }
    @PutMapping("products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        try {
            Product product = userService.updateProduct(id, updatedProduct);
            return ResponseEntity.ok(product);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/chat")
    public List<ChatMessage> getAllMessages() {
        return userService.getAllMessages();
    }

    @PostMapping("/chat")
    public ChatMessage sendMessage(@RequestBody ChatMessage message) {
        return userService.saveMessage(message);
    }
   
    
    @PutMapping("user/update-password")
    public String updatePassword(@RequestParam String username, 
                                 @RequestParam String oldPassword, 
                                 @RequestParam String newPassword) {
        boolean success = userService.updatePassword(username, oldPassword, newPassword);
        if (success) {
            return "Password updated successfully";
        } else {
            return "Old password is incorrect";
        }
    }
    
}

