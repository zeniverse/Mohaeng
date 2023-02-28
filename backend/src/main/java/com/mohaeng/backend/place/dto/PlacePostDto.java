package com.mohaeng.backend.place.dto;

import com.mohaeng.backend.place.entity.Category;
import lombok.*;


@Data
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PlacePostDto {

    private String name;
    private String address;
    private Category category;
    private String availableTime;
    private String menu;
    private String email;
    private String latitude;
    private String longitude;

    public PlacePostDto fromEntity(PlacePostDto placePostDto) {
        return PlacePostDto.builder()
                .name(placePostDto.getName())
                .address(placePostDto.getAddress())
                .category(placePostDto.getCategory())
                .availableTime(placePostDto.getAvailableTime())
//                .image(placePostDto.getimage()) #TODO 이미지 추가해야함
                .menu(placePostDto.getMenu())
                .email(placePostDto.getEmail())
                .email(placePostDto.getLatitude())
                .email(placePostDto.getLongitude())
                .build();
    }
}
