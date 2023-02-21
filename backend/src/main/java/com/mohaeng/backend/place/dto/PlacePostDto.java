package com.mohaeng.backend.place.dto;

import com.mohaeng.backend.place.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlacePostDto {

    private String name;
    private String address;
    private Category category;
    private String availableTime;
    private String menu;
    private String email;

    public PlacePostDto fromEntity(PlacePostDto placePostDto) {
        return PlacePostDto.builder()
                .name(placePostDto.getName())
                .address(placePostDto.getAddress())
                .category(placePostDto.getCategory())
                .availableTime(placePostDto.getAvailableTime())
//                .image(placePostDto.getimage()) #
                .menu(placePostDto.getMenu())
                .email(placePostDto.getEmail())
                .build();
    }
}
