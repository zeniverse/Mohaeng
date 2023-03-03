package com.mohaeng.backend.place.domain;

import com.mohaeng.backend.place.dto.AddPlacePostDto;
import com.mohaeng.backend.place.entity.Category;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.Table;

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

    public void update(AddPlacePostDto addPlacePostDto) {
        this.name = addPlacePostDto.getName();
        this.address = addPlacePostDto.getAddress();
        this.category = addPlacePostDto.getCategory();
        this.availableTime = addPlacePostDto.getAvailableTime();
        this.menu = addPlacePostDto.getMenu();
        this.latitude = addPlacePostDto.getLatitude();
        this.longitude = addPlacePostDto.getLongitude();

    }

//    @Builder.Default
//    @OneToMany(mappedBy = "review")
//    private List<Review> reviews = new ArrayList<>();
}
