package com.Kumar.Project.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Kumar.Project.Model.Product;
@Repository
public interface Productrepo extends JpaRepository<Product,Integer> {

    
} 
