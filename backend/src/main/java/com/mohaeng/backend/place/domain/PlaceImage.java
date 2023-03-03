package com.mohaeng.backend.place.domain;

import jakarta.persistence.*;
import lombok.*;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PlaceImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_image_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "place_id")
    private Place place;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String origin_name;

    @Column(nullable = false)
    private String imgUrl;

    @Builder
    public PlaceImage(Place place, String name, String origin_name, String imgUrl) {
        this.place = place;
        this.name = name;
        this.origin_name = origin_name;
        this.imgUrl = imgUrl;
    }
}
