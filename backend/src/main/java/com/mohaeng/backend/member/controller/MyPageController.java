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
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
public class MyPageController {
    private final MemberService memberService;
    private final MyPageService myPageService;
    private final TokenGenerator tokenGenerator;
    private final String UPLOAD_PATH = "../image/";

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

    @PutMapping("/myPage/{memberEmail}")
    public ResponseEntity changeMemberProfile(@PathVariable String memberEmail, @ModelAttribute UserInfoChangeRequest userInfoChangeRequest) throws IOException {
        Member findMember = memberService.findByEmail(memberEmail);
        findMember.changeNickName(userInfoChangeRequest.getNickName());

        MultipartFile multipartFile = userInfoChangeRequest.getMultipartFile();
        UUID uuid = UUID.randomUUID();
        String fileName = uuid + "_" + multipartFile.getOriginalFilename();
        File profileImg=  new File(UPLOAD_PATH, fileName);
        multipartFile.transferTo(profileImg);

        findMember.changeImageName(fileName);
        findMember.changeImageURL(UPLOAD_PATH +"/"+fileName);

        return ResponseEntity.ok().body(BaseResponse.success("ok", ""));
    }

    @DeleteMapping("/user/drop")
    public ResponseEntity userDropController(HttpServletRequest request, HttpServletResponse response) {
        String userEmail = tokenGenerator.parseEmailFromToken(request.getHeader("Access-Token"));
        System.out.println("userEmail = " + userEmail);

        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            cookie.setMaxAge(0);
            response.addCookie(cookie);
        }

        Member findMember = memberService.findByEmail(userEmail);
        myPageService.deleteMember(findMember, findMember.getOauthAccessToken());
        return ResponseEntity.ok().body(BaseResponse.success("ok", ""));
    }

    private String findEmailFromHeader(HttpServletRequest request) {
        return tokenGenerator.parseEmailFromToken(request.getHeader("Access-Token"));
    }
}
