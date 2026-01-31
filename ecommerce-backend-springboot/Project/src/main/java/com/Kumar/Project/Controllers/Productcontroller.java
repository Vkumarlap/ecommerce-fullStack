package com.Kumar.Project.Controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.http.codec.CodecConfigurer.MultipartCodecs;
import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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


@GetMapping("/product/{id}")
    public ResponseEntity< Product> getprProductbyid(@PathVariable int id){
          Product product=service.getProductByid(id);
          if(product!=null){
        return new ResponseEntity<>(product,HttpStatus.OK);}
    else 
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }
    

    @PostMapping("/product")
    public ResponseEntity<?> addProduct(@RequestPart Product product, @RequestPart MultipartFile imageFile) {
        Product savedProduct = null;
        try {
            savedProduct = service.addproduct(product, imageFile);
            return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
     @GetMapping("/product/{id}/image")
    public ResponseEntity<byte[]> getimgagebyproductid(@PathVariable int id)
    {     
            Product product=service.getProductByid(id);
            byte[] imageFile=product.getImageDate();

            if (product.getId() > 0) {
            return new ResponseEntity<>(imageFile, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

          
    }
    

     @PutMapping("/product/{id}")
     public ResponseEntity<String> updateproduct( @PathVariable int id,@RequestPart Product product,@RequestPart MultipartFile imageFile){
    Product product1;
    try{
        product1 =service.updateproduct(id,product,imageFile);

    }
    catch(IOException e){
        return new ResponseEntity<>("failed to update",HttpStatus.BAD_REQUEST);
    }
     if(product1!=null)
            return new ResponseEntity<>("Updated !",HttpStatus.OK);
        else
            return new ResponseEntity<>("failed to update !!!",HttpStatus.NOT_FOUND);
    }



    

    @DeleteMapping("/product/{id}")
    public ResponseEntity<String> deleteproduct( @PathVariable int id){
        
        try{
            service.deleteproduct(id);
        return new ResponseEntity<>("Deleted",HttpStatus.OK);
    }

  catch(RuntimeException e)
  {
    return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
  }
        }

}
