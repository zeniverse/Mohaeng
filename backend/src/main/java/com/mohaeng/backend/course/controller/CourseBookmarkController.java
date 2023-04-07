package com.mohaeng.backend.course.controller;

import com.mohaeng.backend.common.BaseResponse;
import com.mohaeng.backend.course.dto.response.CourseBookmarkRes;
import com.mohaeng.backend.course.service.CourseBookmarkService;
import com.mohaeng.backend.member.jwt.TokenGenerator;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "", allowedHeaders = "")
@RestController
@RequestMapping("/api/course/bookmark")
@RequiredArgsConstructor
public class CourseBookmarkController {

    private final CourseBookmarkService courseBookmarkService;
    private final TokenGenerator tokenGenerator;

    @GetMapping("/{courseId}")
    public ResponseEntity isExistsCourseBookmark(@PathVariable Long courseId,
                                              HttpServletRequest request){
        String memberEmail = tokenGenerator.parseEmailFromToken(request.getHeader("Access-Token"));
        boolean isExists = courseBookmarkService.isExistCourseBookmark(courseId, memberEmail);
        return ResponseEntity.ok().body(BaseResponse.success("OK", isExists));
    }

    @PostMapping("/{courseId}")
    public ResponseEntity addCourseBookmark(@PathVariable Long courseId, HttpServletRequest request){
        String memberEmail = tokenGenerator.parseEmailFromToken(request.getHeader("Access-Token"));
        CourseBookmarkRes courseLikesRes = courseBookmarkService.addBookmark(courseId, memberEmail);
        return ResponseEntity.ok().body(BaseResponse.success("OK", courseLikesRes));
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity cancelCourseBookmark(@PathVariable Long courseId, HttpServletRequest request){
        String memberEmail = tokenGenerator.parseEmailFromToken(request.getHeader("Access-Token"));
        courseBookmarkService.cancelBookmark(courseId, memberEmail);
        return ResponseEntity.ok().body(BaseResponse.success("OK"));
    }

}
