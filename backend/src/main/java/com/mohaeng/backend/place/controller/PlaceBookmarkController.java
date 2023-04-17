package com.mohaeng.backend.place.controller;

import com.mohaeng.backend.common.BaseResponse;
import com.mohaeng.backend.member.jwt.TokenGenerator;
import com.mohaeng.backend.place.dto.response.PlaceBookmarkResponse;
import com.mohaeng.backend.place.service.PlaceBookmarkService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/place/bookmark")
@RequiredArgsConstructor
public class PlaceBookmarkController {

    private final PlaceBookmarkService placeBookmarkService;
    private final TokenGenerator tokenGenerator;

    @GetMapping("/{placeId}")
    public ResponseEntity isExistsPlaceBookmark(@PathVariable Long placeId,
                                                 HttpServletRequest request){
        String memberEmail = tokenGenerator.parseEmailFromToken(request.getHeader("Access-Token"));
        boolean isExists = placeBookmarkService.isExistPlaceBookmark(placeId, memberEmail);
        return ResponseEntity.ok().body(BaseResponse.success("OK", isExists));
    }

    @PostMapping("/{placeId}")
    public ResponseEntity addPlaceBookmark(@PathVariable Long placeId, HttpServletRequest request){
        String memberEmail = tokenGenerator.parseEmailFromToken(request.getHeader("Access-Token"));
        PlaceBookmarkResponse placeBookmarkResponse = placeBookmarkService.addBookmark(placeId, memberEmail);
        return ResponseEntity.ok().body(BaseResponse.success("OK", placeBookmarkResponse));
    }

    @DeleteMapping("/{placeId}")
    public ResponseEntity cancelPlaceBookmark(@PathVariable Long placeId, HttpServletRequest request){
        String memberEmail = tokenGenerator.parseEmailFromToken(request.getHeader("Access-Token"));
        PlaceBookmarkResponse placeBookmarkResponse = placeBookmarkService.cancelBookmark(placeId, memberEmail);
        return ResponseEntity.ok().body(BaseResponse.success("OK", placeBookmarkResponse));
    }
}
