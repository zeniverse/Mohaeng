package com.mohaeng.backend.member.controller;

import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.common.BaseResponse;
import com.mohaeng.backend.member.dto.response.MemberLoginDto;
import com.mohaeng.backend.member.jwt.Token;
import com.mohaeng.backend.member.jwt.TokenGenerator;
import com.mohaeng.backend.member.service.MemberService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@ResponseBody
@RequiredArgsConstructor
public class LoginController {

    private final MemberService memberService;
    private final TokenGenerator tokenGenerator;


    @GetMapping("/oauth/token")
    public ResponseEntity getToken(@RequestParam("code") String code, HttpServletResponse response) {
        String accessToken = memberService.getAccessToken(code);

        Member member = memberService.saveMember(accessToken);
        member.setOauthAccessToken(accessToken);
        Token token = memberService.createToken(member);

        Cookie cookie = new Cookie("Access-Token", token.getAccessToken());
        cookie.setAttribute("Response-Token", token.getRefreshToken());
        cookie.setMaxAge(60*60*24);
        response.addCookie(cookie);

        return ResponseEntity.ok().body(BaseResponse.success("ok", ""));
    }

    /**
     * 토큰 재발급
     *
     * @param request
     * @param response
     * @return
     */
    @GetMapping("/oauth/token/refresh")
    public Token refreshAuth(HttpServletRequest request, HttpServletResponse response) {
        String token = request.getHeader("Refresh-token");

        if (token != null && tokenGenerator.checkToken(token)) {
            String email = tokenGenerator.parseEmailFromToken(token);
            Member member = memberService.findByEmail(email);
            Token reGeneratedToken = memberService.createToken(member);

            return reGeneratedToken;
        }

        throw new IllegalArgumentException("NotExistRefreshToken");
    }

    @GetMapping("/loginInfo")
    public ResponseEntity loginInfoController(HttpServletRequest request) {
        String userEmail = (String) request.getAttribute("userEmail");

        Member findMember = memberService.findByEmail(userEmail);
        MemberLoginDto memberLoginDto = new MemberLoginDto(findMember.getId(), findMember.getNickName(), findMember.getEmail(), findMember.getImageURL());

        return ResponseEntity.ok().body(BaseResponse.success("ok", memberLoginDto));
    }


}
