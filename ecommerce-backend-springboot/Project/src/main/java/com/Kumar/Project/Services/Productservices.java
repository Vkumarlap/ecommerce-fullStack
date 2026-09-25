package com.Kumar.Project.Services;

import java.io.IOException;
import java.util.List;
import com.Kumar.Project.Model.Product;
// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.Kumar.Project.Repository.Productrepo;

@Service
public class Productservices {
    //@Autowired
    Productrepo repo;
    Productservices(Productrepo repo){
        this.repo=repo;
    }
public List<Product> getproducts()  {return repo.findAll();}

public Product getProductByid(int id)     {return repo.findById(id).orElse(null);} //returning null is not a good idea 

public Product addproduct(Product product, MultipartFile imageFile) throws IOException {
    if (imageFile != null && !imageFile.isEmpty()) {
        String type = imageFile.getContentType();
        if (type == null || !type.startsWith("image/")) {
            throw new IllegalArgumentException("Only image files are allowed");
        }
        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(type);
        product.setImageDate(imageFile.getBytes());
    }
    return repo.save(product);
}


   public void deleteproduct(int pid) 
{  if(!repo.existsById(pid))
    throw new RuntimeException("Product not found for id"+pid);
    else
    repo.deleteById(pid);}

  public Product updateproduct(
        int id,
        Product product,
        MultipartFile imageFile) throws IOException {

    Product existingProduct = repo.findById(id).orElse(null);

    if (existingProduct == null) {
        return null;
    }

    if (product.getPrice() != null) {
        existingProduct.setPrice(product.getPrice());
    }

    if (product.getName() != null) {
        existingProduct.setName(product.getName());
    }

    if (product.getDescription() != null) {
        existingProduct.setDescription(product.getDescription());
    }

    if (product.getBrand() != null) {
        existingProduct.setBrand(product.getBrand());
    }

    if (product.getCategory() != null) {
        existingProduct.setCategory(product.getCategory());
    }

    if (product.getReleasedate() != null) {
        existingProduct.setReleasedate(product.getReleasedate());
    }

    if (product.getAvailability() != null) {
        existingProduct.setAvailability(product.getAvailability());
    }

    if (product.getQuantity() != null) {
        existingProduct.setQuantity(product.getQuantity());
    }

    if (imageFile != null && !imageFile.isEmpty()) {
        existingProduct.setImageName(imageFile.getOriginalFilename());
        existingProduct.setImageType(imageFile.getContentType());
        existingProduct.setImageDate(imageFile.getBytes());
    }

    return repo.save(existingProduct);
}
public List<Product> searchProducts(String keyword){

    return repo.searchProducts(keyword);
}

    
}
