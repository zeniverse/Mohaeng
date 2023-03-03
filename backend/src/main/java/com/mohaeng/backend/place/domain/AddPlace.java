package com.mohaeng.backend.place.domain;

import com.mohaeng.backend.place.dto.AddPlacePostDto;
import com.mohaeng.backend.place.entity.Category;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.Table;

@Entity
@Table(appliesTo = "add_place")
@Getter
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
public class AddPlace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "add_place_id")
    private Long id;

    @NotNull
    private String username;

    @NotBlank
    private String name;

    @NotBlank
    private String address;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Category category;

    private String availableTime;

    private String menu;

    private String email;

    private String latitude;

    private String longitude;

    private boolean isRegistered; // 등록 요청 여부

    public void update(AddPlacePostDto addPlacePostDto) {
        this.username = addPlacePostDto.getUsername();
        this.name = addPlacePostDto.getName();
        this.address = addPlacePostDto.getAddress();
        this.category = addPlacePostDto.getCategory();
        this.availableTime = addPlacePostDto.getAvailableTime();
        this.menu = addPlacePostDto.getMenu();
        this.email = addPlacePostDto.getEmail();
        this.latitude = addPlacePostDto.getLatitude();
        this.longitude = addPlacePostDto.getLongitude();
        this.isRegistered = addPlacePostDto.isRegistered();
    }
}