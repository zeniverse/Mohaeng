package com.mohaeng.backend.course.controller;

import com.mohaeng.backend.common.BaseResponse;
import com.mohaeng.backend.course.dto.request.CoursePlaceSearchReq;
import com.mohaeng.backend.course.dto.request.CourseReq;
import com.mohaeng.backend.course.dto.response.CourseIdRes;
import com.mohaeng.backend.course.dto.response.CoursePlaceSearchRes;
import com.mohaeng.backend.course.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/course")
@RequiredArgsConstructor
@Slf4j
public class CourseController {

    private final CourseService courseService;

    @GetMapping("/placeSearch")
    public ResponseEntity placeSearch(@ModelAttribute CoursePlaceSearchReq req, Pageable pageable){

        CoursePlaceSearchRes res = courseService.placeSearch(req, pageable);
        return ResponseEntity.ok().body(BaseResponse.success("OK", res));
    }

    @PostMapping
    public ResponseEntity createCourse(@AuthenticationPrincipal OAuth2User oAuth2User,
                                       @Valid @RequestBody CourseReq courseReq){

        //TODO: @Valid 결과를 RestcontrollerAdvice를 통해 처리하도록 수정해야함

        Map<String, Object> attributes = oAuth2User.getAttributes();
        String memberEmail = (String) attributes.get("email");

        CourseIdRes courseIdRes = courseService.createCourse(courseReq, memberEmail);

        return ResponseEntity.ok().body(BaseResponse.success("OK", courseIdRes));
    }
}
