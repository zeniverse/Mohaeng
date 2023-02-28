package com.mohaeng.backend.place.dto.response;

import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.entity.Category;
import lombok.Builder;
import lombok.Getter;

@Getter
public class PlaceResponse {

    private final Long id;
    private final String name;
    private final String address;
    private final Category category;
    private final String availableTime;
    private final String menu;
    private final String email;
    private final String latitude;

    //생성자 오버로딩
    public PlaceResponse(Place place) {
        this.id = place.getId();
        this.name = place.getName();
        this.address = place.getAddress();
        this.category = place.getCategory();
        this.availableTime = place.getAvailableTime();
        this.menu = place.getMenu();
        this.email = place.getEmail();
        this.latitude = place.getLatitude();
        this.longitude = place.getLongitude();
    }


    @Builder
    public PlaceResponse(Long id, String name, String address, Category category,
                         String availableTime, String menu, String email,
                         String latitude, String longitude) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.category = category;
        this.availableTime = availableTime;
        this.menu = menu;
        this.email = email;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    private final String longitude;

}
