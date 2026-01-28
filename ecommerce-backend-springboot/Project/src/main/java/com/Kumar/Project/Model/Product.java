package com.Kumar.Project.Model;

import java.math.BigDecimal;
import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product {
    @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY) //for automate increment of id
    private int id;
    private BigDecimal price;
    private String name;
    private boolean availability;
    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern="dd-MM-yyyy")
    private Date releasedate;
    private String  Description;
    private String brand;
    private String category;
    private int Quantity;

}
