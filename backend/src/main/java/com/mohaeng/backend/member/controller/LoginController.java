package com.mohaeng.backend.member.controller;

import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.common.BaseResponse;
import com.mohaeng.backend.member.dto.response.MemberLoginDto;
import com.mohaeng.backend.member.jwt.Token;
import com.mohaeng.backend.member.jwt.TokenGenerator;
import com.mohaeng.backend.member.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@Controller
@ResponseBody
@RequiredArgsConstructor
public class LoginController {

    private final MemberService memberService;
    private final TokenGenerator tokenGenerator;


    @GetMapping("/oauth/token")
    public Token getToken(@RequestParam("code") String code) {
        String accessToken = memberService.getAccessToken(code);// 카카오 AccessToken
        Member member = memberService.saveMember(accessToken);
        Token token = memberService.createToken(member);
        return token;
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

    // TODO: 이미지 byteArray이 아닌 다른 방법
    @GetMapping("/loginInfo")
    public ResponseEntity loginInfoController(HttpServletRequest request) throws IOException {
        String userEmail = tokenGenerator.parseEmailFromToken(request.getHeader("Access-Token"));
        Member findMember = memberService.findByEmail(userEmail);
//        InputStream inputStream = new FileInputStream(findMember.getImageURL() + "/" + findMember.getImageName());
//        byte[] imageByteArray = inputStream.readAllBytes();
//        inputStream.close();
        MemberLoginDto loginInfo = memberService.getLoginInfo(findMember);
        return ResponseEntity.ok().body(BaseResponse.success("ok", loginInfo));
    }
}
