package com.mohaeng.backend.place.dto;

import com.mohaeng.backend.place.entity.Category;
import lombok.*;


@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AddPlacePostDto {

    private String name;
    private String address;
    private Category category;
    private String availableTime;
    private String menu;
    private String email;
    private String latitude;
    private String longitude;
    private boolean registered; // 등록 요청 여부

    public AddPlacePostDto fromEntity(AddPlacePostDto addPlacePostDto) {
        return AddPlacePostDto.builder()
                .name(addPlacePostDto.getName())
                .address(addPlacePostDto.getAddress())
                .category(addPlacePostDto.getCategory())
                .availableTime(addPlacePostDto.getAvailableTime())
//                .image(placePostDto.getimage()) #TODO 이미지 추가해야함
                .menu(addPlacePostDto.getMenu())
                .email(addPlacePostDto.getEmail())
                .registered(addPlacePostDto.isRegistered())
                .build();
    }
}
