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


 public Product addproduct(Product product,MultipartFile imageFile) throws IOException{
    
    product.setImageName(imageFile.getOriginalFilename()); //here we are setting image name type and data
    product.setImageType(imageFile.getContentType());
    product.setImageDate(imageFile.getBytes());
   return  repo.save(product);}



   // public void deleteproduct(int pid) 
// {  if(!repo.existsById(pid))
//     throw new RuntimeException("Product not found for id"+pid);
//     else
//     repo.deleteById(pid);}

//   public void updateproduct(Product product ){repo.save(product);}

    
}
