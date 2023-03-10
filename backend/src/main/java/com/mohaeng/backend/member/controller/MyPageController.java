package com.mohaeng.backend.member.controller;

import com.mohaeng.backend.common.BaseResponse;
import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.dto.response.MyPageCourseBookMarkDto;
import com.mohaeng.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/api")
@ResponseBody
@RequiredArgsConstructor
public class MyPageController {
    private final MemberService memberService;

    @GetMapping("/myPage/course/bookMark")
    public ResponseEntity getAllBookMarkedCourse(@AuthenticationPrincipal OAuth2User oAuth2User) {
        Member findMember = memberService.findByEmail((String) oAuth2User.getAttributes().get("email"));
        return memberService.findAllBookMarkCourse(findMember);
    }
}
