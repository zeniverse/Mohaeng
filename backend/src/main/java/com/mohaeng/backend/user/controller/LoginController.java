package com.mohaeng.backend.user.controller;

import com.mohaeng.backend.user.domain.User;
import com.mohaeng.backend.common.BaseResponse;
import com.mohaeng.backend.user.dto.UserLoginDto;
import com.mohaeng.backend.user.repository.UserRepository;
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

    private final UserRepository userRepository;

    @GetMapping("/loginInfo")
    public ResponseEntity loginInfoController(@AuthenticationPrincipal OAuth2User oAuth2User) {
        Map<String, Object> attributes = oAuth2User.getAttributes();

        Optional<User> optionalUser = userRepository.findByEmail((String) attributes.get("email"));

        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("INVALID_USER");
        }

        User findUser = optionalUser.get();
        UserLoginDto userLoginDto = new UserLoginDto(findUser.getId(), findUser.getNickName(), findUser.getEmail());

        return ResponseEntity.ok().body(BaseResponse.success("ok", userLoginDto));
    }

    @GetMapping("/user/logout")
    public ResponseEntity logoutController(HttpServletRequest request, HttpServletResponse response) {
        new SecurityContextLogoutHandler().logout(request, response, SecurityContextHolder.getContext().getAuthentication());

        return ResponseEntity.ok().body(BaseResponse.success("ok"));
    }

}
