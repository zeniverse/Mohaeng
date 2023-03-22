package com.mohaeng.backend.member.controller;

import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.common.BaseResponse;
import com.mohaeng.backend.member.dto.response.MemberLoginDto;
import com.mohaeng.backend.member.jwt.Token;
import com.mohaeng.backend.member.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;


@Controller
@ResponseBody
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LoginController {

    private final MemberService memberService;

//    @GetMapping("/loginInfo")
//    public ResponseEntity loginInfoController(@AuthenticationPrincipal OAuth2User oAuth2User) {
//        Map<String, Object> attributes = oAuth2User.getAttributes();
//        System.out.println("LoginController.loginInfoController");
//        Member findMember = memberService.findByEmail((String) attributes.get("email"));
//
//        System.out.println("findMember.getName() = " + findMember.getName());
//        MemberLoginDto memberLoginDto = new MemberLoginDto(findMember.getId(), findMember.getNickName(), findMember.getEmail());
//
//        return ResponseEntity.ok().body(BaseResponse.success("ok", memberLoginDto));
//    }

    @GetMapping("/user/logout")
    public ResponseEntity logoutController(HttpServletRequest request, HttpServletResponse response) {
        new SecurityContextLogoutHandler().logout(request, response, SecurityContextHolder.getContext().getAuthentication());
        HttpSession session = request.getSession();
        session.invalidate();

        return ResponseEntity.ok().body(BaseResponse.success("ok"));
    }

    @GetMapping("/oauth/token")
    public Token getLogin(@RequestParam("code") String code) throws IOException {
        String accessToken = memberService.getAccessToken(code);

        Member member = memberService.saveMember(accessToken);
        Token token = memberService.createToken(member);
        return token;
    }

    @GetMapping("/loginInfo")
    public ResponseEntity<Object> loginInfoController(HttpServletRequest request) { //(1)

        String userEmail = (String) request.getAttribute("userEmail");
        Member findMember = memberService.findByEmail(userEmail);
        MemberLoginDto memberLoginDto = new MemberLoginDto(findMember.getId(), findMember.getNickName(), findMember.getEmail());

        return ResponseEntity.ok().body(BaseResponse.success("ok", memberLoginDto));
    }

}
