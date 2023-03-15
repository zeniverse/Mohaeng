package com.mohaeng.backend.course.controller;

import com.mohaeng.backend.course.dto.request.CoursePlaceSearchReq;
import com.mohaeng.backend.common.BaseResponse;
import com.mohaeng.backend.course.dto.response.CoursePlaceSearchRes;
import com.mohaeng.backend.course.service.CourseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/course")
@RequiredArgsConstructor
@Slf4j
public class CourseController {

    private final CourseService courseService;

    @GetMapping("/placeSearch")
    public ResponseEntity placeSearch(@ModelAttribute CoursePlaceSearchReq req, Pageable pageable){

        CoursePlaceSearchRes res = courseService.placeSearch(req, pageable);
        return ResponseEntity.ok().body(BaseResponse.success(res));
    }
}
