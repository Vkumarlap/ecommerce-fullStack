package com.Kumar.Project.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Kumar.Project.Model.Product;
import com.Kumar.Project.Services.Productservices;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class Productcontroller {
  //  @Autowired
   Productservices service;
      
Productcontroller(Productservices service)
{
    this.service=service;
}

    @GetMapping
    public List<Product> getproducts(){ return service.getproducts();}
     
    @GetMapping("/{pid}")
    public Product getprProductbyid(@PathVariable int pid){return service.getProductByid(pid);}
     
    @PostMapping
    public void addproduct( @RequestBody Product product){service.addproduct(product);}

    @DeleteMapping("/{pid}")
    public void deleteproduct( @PathVariable int pid){service.deleteproduct(pid);}

     @PutMapping
     public void updateproduct( @RequestBody Product product){service.addproduct(product);}

}
