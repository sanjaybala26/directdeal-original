package com.example.demo.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.ChatMessage;
import com.example.demo.Entity.Product;
import com.example.demo.Entity.UserEntity;
import com.example.demo.Repo.ChatMessageRepository;
import com.example.demo.Repo.ProductRepository;
import com.example.demo.Repo.UserRepo;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ProductRepository productRepository;

    public UserEntity signup(UserEntity user) {
        // Save user details
        return userRepo.save(user);
    }

    public boolean login(String username, String password) {
        // Validate user credentials
        UserEntity user = userRepo.findByUsername(username);
        return user != null && user.getPassword().equals(password);
    }

    public Product saveProduct(Product product) {
        // Save product details
        return productRepository.save(product);
    }

    public Optional<Product> getProductById(Long id) {
        // Retrieve product by ID
        return productRepository.findById(id);
    }

    public List<Product> getAllProducts() {
        // Retrieve all products
        return productRepository.findAll();
    }

    public List<Product> getProductsByUserId(Long userId) {
        // Retrieve products by user ID
        return productRepository.findByUserId(userId);
    }

    public List<Product> getProductsByUsername(String username) {
        // Retrieve products by username
        return productRepository.findByUsername(username);
    }
    

    // Delete a product by ID
    public boolean deleteProduct(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isPresent()) {
            productRepository.deleteById(productId);
            return true;
        } else {
            return false;
        }
    }
    public Product updateProduct(Long id, Product updatedProduct) {
        return productRepository.findById(id).map(product -> {
            product.setName(updatedProduct.getName());
            product.setPrice(updatedProduct.getPrice());
            product.setLocation(updatedProduct.getLocation());
            product.setCategory(updatedProduct.getCategory());
            product.setProductCondition(updatedProduct.getProductCondition());
            product.setDescription(updatedProduct.getDescription());
            product.setImageUrl(updatedProduct.getImageUrl());
            return productRepository.save(product);
        }).orElseThrow(() -> new RuntimeException("Product not found with id " + id));
    }
   
    
    
    @Autowired
    private ChatMessageRepository chatMessageRepository;

    public List<ChatMessage> getAllMessages() {
        return chatMessageRepository.findAll();
    }

    public ChatMessage saveMessage(ChatMessage message) {
        return chatMessageRepository.save(message);
    }
    


    public boolean updatePassword(String username, String oldPassword, String newPassword) {
        UserEntity user = userRepo.findByUsername(username);
        if (user != null && user.getPassword().equals(oldPassword)) {
            user.setPassword(newPassword);
            userRepo.save(user);
            return true;
        }
        return false;
    }
    
   
}
