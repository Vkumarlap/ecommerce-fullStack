package com.Kumar.Project.Controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.Kumar.Project.Model.Product;
import com.Kumar.Project.Services.Productservices;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class Productcontroller {

    Productservices service;

    public Productcontroller(Productservices service) {
        this.service = service;
    }

    // Get only logged-in seller's products
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getproducts(
            Authentication authentication) {

        String username = authentication.getName();

        return new ResponseEntity<>(
                service.getproducts(username),
                HttpStatus.OK
        );
    }

    // Get only logged-in seller's product
    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getprProductbyid(
            @PathVariable int id,
            Authentication authentication) {

        String username = authentication.getName();

        Product product =
                service.getProductByid(id, username);

        if (product != null) {
            return new ResponseEntity<>(
                    product,
                    HttpStatus.OK
            );
        }

        return new ResponseEntity<>(
                HttpStatus.NOT_FOUND
        );
    }

    // Add product for logged-in seller
    @PostMapping(
            value = "/product",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<?> addProduct(
            @RequestPart("product") Product product,
            @RequestPart("imageFile") MultipartFile imageFile,
            Authentication authentication) {

        String username = authentication.getName();

        try {

            Product savedProduct =
                    service.addproduct(
                            product,
                            imageFile,
                            username
                    );

            return new ResponseEntity<>(
                    savedProduct,
                    HttpStatus.OK
            );

        } catch (IOException e) {

            return new ResponseEntity<>(
                    e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Get image only if product belongs to logged-in seller
    @GetMapping("/product/{id}/image")
    public ResponseEntity<byte[]> getimgagebyproductid(
            @PathVariable int id,
            Authentication authentication) {

        String username = authentication.getName();

        Product product =
                service.getProductByid(
                        id,
                        username
                );

        if (product != null &&
                product.getImageDate() != null) {

            return new ResponseEntity<>(
                    product.getImageDate(),
                    HttpStatus.OK
            );
        }

        return new ResponseEntity<>(
                HttpStatus.NOT_FOUND
        );
    }

    // Update only seller's own product
    @PutMapping("/product/{id}")
    public ResponseEntity<String> updateproduct(
            @PathVariable int id,
            @RequestPart Product product,
            @RequestPart(
                    value = "imageFile",
                    required = false
            ) MultipartFile imageFile,
            Authentication authentication) {

        String username = authentication.getName();

        try {

            Product product1 =
                    service.updateproduct(
                            id,
                            product,
                            imageFile,
                            username
                    );

            if (product1 != null) {

                return new ResponseEntity<>(
                        "Updated!",
                        HttpStatus.OK
                );
            }

            return new ResponseEntity<>(
                    "Product not found",
                    HttpStatus.NOT_FOUND
            );

        } catch (IOException e) {

            return new ResponseEntity<>(
                    "Failed to update",
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    // Delete only seller's own product
    @DeleteMapping("/product/{id}")
    public ResponseEntity<String> deleteproduct(
            @PathVariable int id,
            Authentication authentication) {

        String username = authentication.getName();

        try {

            service.deleteproduct(
                    id,
                    username
            );

            return new ResponseEntity<>(
                    "Deleted",
                    HttpStatus.OK
            );

        } catch (RuntimeException e) {

            return new ResponseEntity<>(
                    e.getMessage(),
                    HttpStatus.NOT_FOUND
            );
        }
    }

    // Search only logged-in seller's products
    @GetMapping("/product/search")
    public ResponseEntity<List<Product>> searchProducts(
            @RequestParam String keyword,
            Authentication authentication) {

        String username = authentication.getName();

        List<Product> products =
                service.searchProducts(
                        keyword,
                        username
                );

        System.out.println(
                "Searching for " +
                keyword +
                " for seller " +
                username
        );

        return new ResponseEntity<>(
                products,
                HttpStatus.OK
        );
    }
}