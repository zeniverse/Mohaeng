package com.mohaeng.backend.course.controller;

import com.mohaeng.backend.common.BaseResponse;
import com.mohaeng.backend.course.dto.request.CoursePlaceSearchReq;
import com.mohaeng.backend.course.dto.request.CourseReq;
import com.mohaeng.backend.course.dto.request.CourseUpdateReq;
import com.mohaeng.backend.course.dto.response.CourseIdRes;
import com.mohaeng.backend.course.dto.response.CoursePlaceSearchRes;
import com.mohaeng.backend.course.dto.response.CourseRes;
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

    @GetMapping("/{courseId}")
    public ResponseEntity getCourse(@PathVariable Long courseId){
        CourseRes courseRes = courseService.getCourse(courseId);
        return  ResponseEntity.ok().body(BaseResponse.success("OK", courseRes));
    }

    @PutMapping("/{courseId}")
    public ResponseEntity updateCourse(@AuthenticationPrincipal OAuth2User oAuth2User,
                                       @PathVariable Long courseId,
                                       @Valid @RequestBody CourseUpdateReq courseUpdateReq){

        //TODO: @Valid 결과를 RestcontrollerAdvice를 통해 처리하도록 수정해야함

        Map<String, Object> attributes = oAuth2User.getAttributes();
        String memberEmail = (String) attributes.get("email");

        CourseIdRes courseIdRes = courseService.updateCourse(memberEmail, courseId, courseUpdateReq);
        return ResponseEntity.ok().body(BaseResponse.success("OK", courseIdRes));
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity deleteCourse(@AuthenticationPrincipal OAuth2User oAuth2User,
                                       @PathVariable Long courseId) {

        Map<String, Object> attributes = oAuth2User.getAttributes();
        String memberEmail = (String) attributes.get("email");

        courseService.deleteCourse(memberEmail, courseId);
        return ResponseEntity.ok().body(BaseResponse.success("OK"));
    }
}
