package com.mohaeng.backend.member.controller;

import com.mohaeng.backend.common.BaseResponse;
import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.dto.request.UserInfoChangeRequest;
import com.mohaeng.backend.member.service.MemberService;
import com.mohaeng.backend.member.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Controller
@RequestMapping("/api")
@ResponseBody
@RequiredArgsConstructor
public class MyPageController {
    private final MemberService memberService;
    private final MyPageService myPageService;
    private final String UPLOAD_PATH = "../image/";

    @GetMapping("/myPage/course/bookMark")
    public ResponseEntity getAllBookMarkedCourse(@AuthenticationPrincipal OAuth2User oAuth2User) {
        Member findMember = memberService.findByEmail((String) oAuth2User.getAttributes().get("email"));
        return myPageService.findAllBookMarkCourse(findMember);
    }

    @GetMapping("/myPage/course/bookMark/{bookMarkId}")
    public ResponseEntity getOneBookMarkedCourse(@PathVariable Long bookMarkId, @AuthenticationPrincipal OAuth2User oAuth2User) {
        Member findMember = memberService.findByEmail((String) oAuth2User.getAttributes().get("email"));
        return myPageService.findOneBookMarkedCourse(findMember, bookMarkId);
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
}
