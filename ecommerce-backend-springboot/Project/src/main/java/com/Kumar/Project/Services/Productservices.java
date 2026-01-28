package com.Kumar.Project.Services;

import java.util.List;
import com.Kumar.Project.Model.Product;
// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


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

public void deleteproduct(int pid) 
{  if(!repo.existsById(pid))
    throw new RuntimeException("Product not found for id"+pid);
    else
    repo.deleteById(pid);}

 public void addproduct(Product product)   {repo.save(product);}

  public void updateproduct(Product product ){repo.save(product);}

    
}
