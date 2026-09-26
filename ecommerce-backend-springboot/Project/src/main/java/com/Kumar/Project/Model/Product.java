package com.Kumar.Project.Model;

import java.math.BigDecimal;
import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private BigDecimal price;

    private String name;

    private Boolean availability;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private Date releasedate;

    private String description;

    private String brand;

    private String category;

    private Integer Quantity;

    private String imageName;

    private String imageType;

    @Lob
    private byte[] imageDate;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private Users seller;

    public Product(int id) {
        this.id = id;
    }
}