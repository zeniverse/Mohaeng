package com.mohaeng.backend.course.controller;

import com.mohaeng.backend.common.BaseResponse;
import com.mohaeng.backend.course.dto.response.CourseLikesRes;
import com.mohaeng.backend.course.service.CourseLikesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "", allowedHeaders = "")
@RestController
@RequestMapping("/api/course/likes")
@RequiredArgsConstructor
public class CourseLikesController {

    private final CourseLikesService courseLikesService;

    @GetMapping("/count/{courseId}")
    public ResponseEntity countCourseLikes(@PathVariable Long courseId){
        CourseLikesRes courseLikesRes = courseLikesService.countLikes(courseId);
        return ResponseEntity.ok().body(BaseResponse.success("OK", courseLikesRes));
    }

    @GetMapping("/{courseId}")
    public ResponseEntity isExistsCourseLikes(@PathVariable Long courseId,
                                    @AuthenticationPrincipal OAuth2User oAuth2User){
        Map<String, Object> attributes = oAuth2User.getAttributes();
        String memberEmail = (String) attributes.get("email");

        boolean isExists = courseLikesService.isExistCourseLikes(courseId, memberEmail);
        return ResponseEntity.ok().body(BaseResponse.success("OK", isExists));
    }

    @PostMapping("/{courseId}")
    public ResponseEntity addCourseLikes(@PathVariable Long courseId,
                                         @AuthenticationPrincipal OAuth2User oAuth2User){
        Map<String, Object> attributes = oAuth2User.getAttributes();
        String memberEmail = (String) attributes.get("email");

        CourseLikesRes courseLikesRes = courseLikesService.addLikes(courseId, memberEmail);
        return ResponseEntity.ok().body(BaseResponse.success("OK", courseLikesRes));
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity cancelCourseLikes(@PathVariable Long courseId,
                                  @AuthenticationPrincipal OAuth2User oAuth2User){
        Map<String, Object> attributes = oAuth2User.getAttributes();
        String memberEmail = (String) attributes.get("email");

        CourseLikesRes courseLikesRes = courseLikesService.cancelLikes(courseId, memberEmail);
        return ResponseEntity.ok().body(BaseResponse.success("OK", courseLikesRes));
    }

}
