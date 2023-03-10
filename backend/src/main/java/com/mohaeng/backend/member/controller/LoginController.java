package com.mohaeng.backend.member.controller;

import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.common.BaseResponse;
import com.mohaeng.backend.member.dto.response.MemberLoginDto;
import com.mohaeng.backend.member.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;
import java.util.Optional;

@Controller
@ResponseBody
@RequiredArgsConstructor
public class LoginController {

    private final MemberRepository memberRepository;

    @GetMapping("/loginInfo")
    public ResponseEntity loginInfoController(@AuthenticationPrincipal OAuth2User oAuth2User) {
        Map<String, Object> attributes = oAuth2User.getAttributes();

        Optional<Member> optionalUser = memberRepository.findByEmail((String) attributes.get("email"));

        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("INVALID_USER");
        }

        Member findMember = optionalUser.get();
        MemberLoginDto memberLoginDto = new MemberLoginDto(findMember.getId(), findMember.getNickName(), findMember.getEmail());

        return ResponseEntity.ok().body(BaseResponse.success("ok", memberLoginDto));
    }

    @GetMapping("/user/logout")
    public ResponseEntity logoutController(HttpServletRequest request, HttpServletResponse response) {
        new SecurityContextLogoutHandler().logout(request, response, SecurityContextHolder.getContext().getAuthentication());

        return ResponseEntity.ok().body(BaseResponse.success("ok"));
    }

}
