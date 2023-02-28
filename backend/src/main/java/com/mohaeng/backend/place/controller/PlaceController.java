package com.mohaeng.backend.place.controller;

import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.dto.request.PlaceCreate;
import com.mohaeng.backend.place.dto.response.PlaceResponse;
import com.mohaeng.backend.place.service.PlaceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PlaceController {

    private final PlaceService placeService;


    @PostMapping("/place")
    public void postPlace(@RequestBody @Valid PlaceCreate request) {
        placeService.write(request);
    }

    @GetMapping("/place/{placeid}")
    public PlaceResponse get(@PathVariable Long placeId) {
        return placeService.findById(placeId);
    }

    @GetMapping("/posts")
    public List<Place> getList() {
        return placeService.findAll();
    }

    @DeleteMapping ("/posts/{placeId}")
    public void delete(@PathVariable Long placeId){
        placeService.delete(placeId);
    }
}
