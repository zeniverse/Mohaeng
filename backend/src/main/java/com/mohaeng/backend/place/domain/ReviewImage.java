package com.mohaeng.backend.place.domain;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class ReviewImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Review review;

    private String imageUrl;
    private String imageName;

    public void setImageUrl(String imageUrl, String imageName) {
        this.imageUrl = imageUrl;
        this.imageName = imageName;
    }
}
