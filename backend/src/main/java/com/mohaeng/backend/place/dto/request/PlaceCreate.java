package com.mohaeng.backend.place.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PlaceCreate {

    @NotBlank(message = "여행지 이름을 입력해주세요.")
    private String title;

    @NotBlank(message = "주소를 입력해주세요.")
    private String address;

    @NotBlank(message = "카테고리 입력해주세요.")
    private String category;

//    @NotBlank(message = "이용시간을 입력해주세요.")
    private String availableTime;

//    @NotBlank(message = "이미지를 첨부해주세요.")
//    private String image;

//    @NotBlank(message = "주소를 입력해주세요.")
    private String menu;

    @NotBlank(message = "이메일을 입력해주세요.")
    private String email;

    @Builder
    public PlaceCreate(String title, String address, String category, String availableTime, String menu, String email) {
        this.title = title;
        this.address = address;
        this.category = category;
        this.availableTime = availableTime;
        this.menu = menu;
        this.email = email;
    }
}
