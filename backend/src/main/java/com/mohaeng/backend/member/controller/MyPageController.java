package com.mohaeng.backend.member.controller;

import com.mohaeng.backend.common.BaseResponse;
import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.dto.request.UserInfoChangeRequest;
import com.mohaeng.backend.member.dto.response.MyPageCourseBookMarkDto;
import com.mohaeng.backend.member.jwt.TokenGenerator;
import com.mohaeng.backend.member.service.MemberService;
import com.mohaeng.backend.member.service.MyPageService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/api")
@ResponseBody
@RequiredArgsConstructor
@Service
public class MyPageController {
    private final MemberService memberService;
    private final MyPageService myPageService;
    private final TokenGenerator tokenGenerator;

    @GetMapping("/myPage/course/bookMark")
    public ResponseEntity getAllBookMarkedCourse(HttpServletRequest request) {
        String email = findEmailFromHeader(request);
        List<MyPageCourseBookMarkDto> data = myPageService.findAllBookMarkCourse(email);
        return ResponseEntity.ok().body(BaseResponse.success("ok", data));
    }

    @GetMapping("/myPage/course/bookMark/{courseLikeId}")
    public ResponseEntity getOneBookMarkedCourse(@PathVariable Long courseLikeId, HttpServletRequest request) {
        String email = findEmailFromHeader(request);
        MyPageCourseBookMarkDto data = myPageService.findOneBookMarkedCourse(email, courseLikeId);
        return ResponseEntity.ok().body(BaseResponse.success("OK", data));
    }

    @PutMapping(value = "/myPage/{memberEmail}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity changeMemberProfile(@PathVariable String memberEmail,
                                              @RequestPart UserInfoChangeRequest userInfoChangeRequest,
                                              @RequestPart MultipartFile multipartFile) throws IOException {
        Member findMember = memberService.findByEmail(memberEmail);
        memberService.changeProfile(findMember, userInfoChangeRequest, multipartFile);
        return ResponseEntity.ok().body(BaseResponse.success("ok", ""));
    }

    @DeleteMapping("/user/drop")
    public ResponseEntity userDropController(HttpServletRequest request) {
        String userEmail = findEmailFromHeader(request);
        Member findMember = memberService.findByEmail(userEmail);
        myPageService.deleteMember(findMember);
        return ResponseEntity.ok().body(BaseResponse.success("ok", ""));
    }

    private String findEmailFromHeader(HttpServletRequest request) {
        return tokenGenerator.parseEmailFromToken(request.getHeader("Access-Token"));
    }
}
