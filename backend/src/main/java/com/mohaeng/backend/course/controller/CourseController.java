package com.mohaeng.backend.course.controller;

import com.mohaeng.backend.common.BaseResponse;
import com.mohaeng.backend.course.dto.CourseSearchDto;
import com.mohaeng.backend.course.dto.request.CoursePlaceSearchReq;
import com.mohaeng.backend.course.dto.request.CourseReq;
import com.mohaeng.backend.course.dto.request.CourseUpdateReq;
import com.mohaeng.backend.course.dto.response.CourseIdRes;
import com.mohaeng.backend.course.dto.CourseListDto;
import com.mohaeng.backend.course.dto.response.CourseListRes;
import com.mohaeng.backend.course.dto.response.CoursePlaceSearchRes;
import com.mohaeng.backend.course.dto.response.CourseRes;
import com.mohaeng.backend.course.service.CourseService;
import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.jwt.TokenGenerator;
import com.mohaeng.backend.member.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "", allowedHeaders = "")
@RestController
@RequestMapping("/api/course")
@RequiredArgsConstructor
@Slf4j
public class CourseController {

    private final CourseService courseService;
    private final TokenGenerator tokenGenerator;
    private final MemberService memberService;

    private Member findEmailFromHeader(HttpServletRequest request) {
        String userEmail = tokenGenerator.parseEmailFromToken(request.getHeader("Access-Token"));
        Member findMember = memberService.findByEmail(userEmail);
        return findMember;
    }

    @GetMapping("/placeSearch")
    public ResponseEntity placeSearch(@ModelAttribute CoursePlaceSearchReq req, Pageable pageable){

        CoursePlaceSearchRes res = courseService.placeSearch(req, pageable);
        return ResponseEntity.ok().body(BaseResponse.success("OK", res));
    }

    @PostMapping
    public ResponseEntity createCourse(HttpServletRequest request,
                                       @Valid @RequestBody CourseReq courseReq){

        //TODO: @Valid 결과를 RestcontrollerAdvice를 통해 처리하도록 수정해야함
        Member member = findEmailFromHeader(request);

        CourseIdRes courseIdRes = courseService.createCourse(courseReq, member);
        return ResponseEntity.ok().body(BaseResponse.success("OK", courseIdRes));
    }

    @GetMapping("/{courseId}")
    public ResponseEntity getCourse(@PathVariable Long courseId){
        CourseRes courseRes = courseService.getCourse(courseId);
        return  ResponseEntity.ok().body(BaseResponse.success("OK", courseRes));
    }

    @PutMapping("/{courseId}")
    public ResponseEntity updateCourse(HttpServletRequest request,
                                       @PathVariable Long courseId,
                                       @Valid @RequestBody CourseUpdateReq courseUpdateReq){

        //TODO: @Valid 결과를 RestcontrollerAdvice를 통해 처리하도록 수정해야함

        Member member = findEmailFromHeader(request);
        CourseIdRes courseIdRes = courseService.updateCourse(member, courseId, courseUpdateReq);
        return ResponseEntity.ok().body(BaseResponse.success("OK", courseIdRes));
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity deleteCourse(HttpServletRequest request,
                                       @PathVariable Long courseId) {

        Member member = findEmailFromHeader(request);
        courseService.deleteCourse(member, courseId);
        return ResponseEntity.ok().body(BaseResponse.success("OK"));
    }

    @GetMapping
    public ResponseEntity getCourseList(HttpServletRequest request,
                                        CourseSearchDto courseSearchDto,
                                        Pageable pageable){

        Member member = findEmailFromHeader(request);
        CourseListRes result = courseService.getCourseList(courseSearchDto, pageable, member);
        return ResponseEntity.ok().body(BaseResponse.success("OK", result));
    }

//    @GetMapping("/main")
//    public ResponseEntity getMainCourse(HttpServletRequest request){
//        Member member = findEmailFromHeader(request);
//        List<MainCourseListDto> mainCourseList = courseService.getMainCourse(member);
//        return ResponseEntity.ok().body(BaseResponse.success("OK", mainCourseList));
//    }
}