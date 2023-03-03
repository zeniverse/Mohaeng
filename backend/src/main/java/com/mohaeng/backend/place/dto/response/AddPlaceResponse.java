package com.mohaeng.backend.place.dto.response;

import com.mohaeng.backend.place.domain.AddPlace;
import com.mohaeng.backend.place.entity.Category;
import lombok.Builder;
import lombok.Getter;

@Getter
public class AddPlaceResponse {

    private final Long id;
    private final String name;
    private final String address;
    private final Category category;
    private final String availableTime;
    private final String menu;
    private final String email;
    private final String latitude;
    private final String longitude;
    private final Boolean registered;

    //생성자 오버로딩
    public AddPlaceResponse(AddPlace addPlace, Boolean registered) {
        this.id = addPlace.getId();
        this.name = addPlace.getName();
        this.address = addPlace.getAddress();
        this.category = addPlace.getCategory();
        this.availableTime = addPlace.getAvailableTime();
        this.menu = addPlace.getMenu();
        this.email = addPlace.getEmail();
        this.latitude = addPlace.getLatitude();
        this.longitude = addPlace.getLongitude();
        this.registered = registered;
    }


    @Builder
    public AddPlaceResponse(Long id, String name, String address, Category category,
                            String availableTime, String menu, String email,
                            String latitude, String longitude, Boolean registered) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.category = category;
        this.availableTime = availableTime;
        this.menu = menu;
        this.email = email;
        this.latitude = latitude;
        this.longitude = longitude;
        this.registered = registered;
    }


}
