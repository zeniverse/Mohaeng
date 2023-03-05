package com.mohaeng.backend.place.domain;

import com.mohaeng.backend.place.entity.Category;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.Table;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(appliesTo = "place")
@Getter
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
public class Place {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_id")
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String address;

//    @NotBlank
//    private String content;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Category category;

    private String availableTime;

    private String menu;

    private String latitude;

    private String longitude;

//    @Builder.Default
//    @OneToMany(mappedBy = "review")
//    private List<Review> reviews = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "place")
    private List<PlaceImage> placeImages = new ArrayList<>();

    private double rating;
}
