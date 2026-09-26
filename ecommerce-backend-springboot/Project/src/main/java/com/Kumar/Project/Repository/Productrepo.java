package com.Kumar.Project.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.Kumar.Project.Model.Product;

@Repository
public interface Productrepo extends JpaRepository<Product, Integer> {

    List<Product> findBySellerUsername(String username);

    java.util.Optional<Product> findByIdAndSellerUsername(
            int id,
            String username
    );

    @Query("""
        SELECT p FROM Product p
        WHERE p.seller.username = :username
        AND (
            LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(p.brand) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword, '%'))
        )
    """)
    List<Product> searchProducts(
            String keyword,
            String username
    );
}