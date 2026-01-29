package com.Kumar.Project.Controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/api")
@CrossOrigin
public class Productcontroller {
  //  @Autowired
   Productservices service;
      
public Productcontroller(Productservices service)
{
    this.service=service;
}

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getproducts(){
        
        return new ResponseEntity<>( service.getproducts(),HttpStatus.OK);
    }


@GetMapping("/products/{id}")
    public ResponseEntity< Product> getprProductbyid(@PathVariable int id){
          Product product=service.getProductByid(id);
          if(product!=null){
        return new ResponseEntity<>(product,HttpStatus.OK);}
    else 
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }
    

    @PostMapping
    public void addproduct( @RequestBody Product product){service.addproduct(product);}

    @DeleteMapping("/products/{id}")
    public void deleteproduct( @PathVariable int id){service.deleteproduct(id);}

     @PutMapping
     public void updateproduct( @RequestBody Product product){service.addproduct(product);}

}
