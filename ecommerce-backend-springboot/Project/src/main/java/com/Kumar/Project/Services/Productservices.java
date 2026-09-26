package com.Kumar.Project.Services;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.Kumar.Project.Model.Product;
import com.Kumar.Project.Model.Users;
import com.Kumar.Project.Repository.Productrepo;
import com.Kumar.Project.Repository.UsersRepo;

@Service
public class Productservices {

    Productrepo repo;
    UsersRepo usersRepo;

    public Productservices(
            Productrepo repo,
            UsersRepo usersRepo) {

        this.repo = repo;
        this.usersRepo = usersRepo;
    }

    // Get only products belonging to logged-in seller
    public List<Product> getproducts(String username) {

        return repo.findBySellerUsername(username);
    }

    // Get product only if it belongs to logged-in seller
    public Product getProductByid(
            int id,
            String username) {

        return repo.findByIdAndSellerUsername(id, username)
                .orElse(null);
    }

    // Add product and assign logged-in seller
    public Product addproduct(
            Product product,
            MultipartFile imageFile,
            String username) throws IOException {

        Users seller = usersRepo.findByusername(username);

        if (seller == null) {
            throw new RuntimeException("Seller not found");
        }

        // Attach seller to product
        product.setSeller(seller);

        if (imageFile != null && !imageFile.isEmpty()) {

            String type = imageFile.getContentType();

            if (type == null || !type.startsWith("image/")) {
                throw new IllegalArgumentException(
                        "Only image files are allowed"
                );
            }

            product.setImageName(
                    imageFile.getOriginalFilename()
            );

            product.setImageType(type);

            product.setImageDate(
                    imageFile.getBytes()
            );
        }

        return repo.save(product);
    }

    // Delete only seller's own product
    public void deleteproduct(
            int pid,
            String username) {

        Product product =
                repo.findByIdAndSellerUsername(
                        pid,
                        username
                ).orElse(null);

        if (product == null) {
            throw new RuntimeException(
                    "Product not found"
            );
        }

        repo.delete(product);
    }

    // Update only seller's own product
    public Product updateproduct(
            int id,
            Product product,
            MultipartFile imageFile,
            String username) throws IOException {

        Product existingProduct =
                repo.findByIdAndSellerUsername(
                        id,
                        username
                ).orElse(null);

        if (existingProduct == null) {
            return null;
        }

        if (product.getPrice() != null) {
            existingProduct.setPrice(
                    product.getPrice()
            );
        }

        if (product.getName() != null) {
            existingProduct.setName(
                    product.getName()
            );
        }

        if (product.getDescription() != null) {
            existingProduct.setDescription(
                    product.getDescription()
            );
        }

        if (product.getBrand() != null) {
            existingProduct.setBrand(
                    product.getBrand()
            );
        }

        if (product.getCategory() != null) {
            existingProduct.setCategory(
                    product.getCategory()
            );
        }

        if (product.getReleasedate() != null) {
            existingProduct.setReleasedate(
                    product.getReleasedate()
            );
        }

        if (product.getAvailability() != null) {
            existingProduct.setAvailability(
                    product.getAvailability()
            );
        }

        if (product.getQuantity() != null) {
            existingProduct.setQuantity(
                    product.getQuantity()
            );
        }

        if (imageFile != null && !imageFile.isEmpty()) {

            existingProduct.setImageName(
                    imageFile.getOriginalFilename()
            );

            existingProduct.setImageType(
                    imageFile.getContentType()
            );

            existingProduct.setImageDate(
                    imageFile.getBytes()
            );
        }

        return repo.save(existingProduct);
    }

    // Search only logged-in seller's products
    public List<Product> searchProducts(
            String keyword,
            String username) {

        return repo.searchProducts(
                keyword,
                username
        );
    }
}