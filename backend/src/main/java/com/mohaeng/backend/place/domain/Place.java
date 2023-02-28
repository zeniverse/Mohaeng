package com.mohaeng.backend.place.domain;

import com.mohaeng.backend.place.dto.PlacePostDto;
import com.mohaeng.backend.place.entity.Category;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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

    @Enumerated(EnumType.STRING)
    @NotBlank
    private Category category;

    private String availableTime;

    private String menu;

    private String email;

    private String latitude;

    private String longitude;


    public void update(PlacePostDto placePostDto) {
        this.name = placePostDto.getName();
        this.address = placePostDto.getAddress();
        this.category = placePostDto.getCategory();
        this.availableTime = placePostDto.getAvailableTime();
        this.menu = placePostDto.getMenu();
        this.email = placePostDto.getEmail();
        this.latitude = placePostDto.getLatitude();
        this.longitude = placePostDto.getLongitude();

    }

//    @Builder.Default
//    @OneToMany(mappedBy = "review")
//    private List<Review> reviews = new ArrayList<>();
}
