package com.mohaeng.backend.course.controller;

import com.mohaeng.backend.common.BaseResponse;
import com.mohaeng.backend.course.dto.response.CourseLikesRes;
import com.mohaeng.backend.course.service.CourseLikesService;
import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.jwt.TokenGenerator;
import com.mohaeng.backend.member.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
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
    private final TokenGenerator tokenGenerator;
    private final MemberService memberService;

    private Member findEmailFromHeader(HttpServletRequest request) {
        String userEmail = tokenGenerator.parseEmailFromToken(request.getHeader("Access-Token"));
        Member findMember = memberService.findByEmail(userEmail);
        return findMember;
    }

    @GetMapping("/count/{courseId}")
    public ResponseEntity countCourseLikes(@PathVariable Long courseId){
        CourseLikesRes courseLikesRes = courseLikesService.countLikes(courseId);
        return ResponseEntity.ok().body(BaseResponse.success("OK", courseLikesRes));
    }

    @GetMapping("/{courseId}")
    public ResponseEntity isExistsCourseLikes(@PathVariable Long courseId,
                                              HttpServletRequest request){
        Member member = findEmailFromHeader(request);

        boolean isExists = courseLikesService.isExistCourseLikes(courseId, member);
        return ResponseEntity.ok().body(BaseResponse.success("OK", isExists));
    }

    @PostMapping("/{courseId}")
    public ResponseEntity addCourseLikes(@PathVariable Long courseId,
                                         HttpServletRequest request){
        Member member = findEmailFromHeader(request);
        CourseLikesRes courseLikesRes = courseLikesService.addLikes(courseId, member);
        return ResponseEntity.ok().body(BaseResponse.success("OK", courseLikesRes));
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity cancelCourseLikes(@PathVariable Long courseId,
                                            HttpServletRequest request){
        Member member = findEmailFromHeader(request);
        CourseLikesRes courseLikesRes = courseLikesService.cancelLikes(courseId, member);
        return ResponseEntity.ok().body(BaseResponse.success("OK", courseLikesRes));
    }

}