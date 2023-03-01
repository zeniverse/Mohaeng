package com.mohaeng.backend.user.controller;

import com.mohaeng.backend.user.domain.User;
import com.mohaeng.backend.user.dto.UserLoginDto;
import com.mohaeng.backend.user.oauth.OAuthService;
import com.mohaeng.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Controller
@ResponseBody
@RequiredArgsConstructor
public class LoginController {

    private final UserRepository userRepository;

    @GetMapping("/loginInfo")
    public Map<String, Object> loginInfoController(Authentication authentication) {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();
        Optional<User> optionalUser = userRepository.findByEmail((String) attributes.get("email"));

        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("INVALID_USER");
        }

        User findUser = optionalUser.get();
        UserLoginDto userLoginDto = new UserLoginDto(findUser.getId(), findUser.getNickName(), findUser.getEmail());

        HashMap<String, Object> result = new HashMap<>();
        result.put("status", 200);
        result.put("result", "ok");
        result.put("data", userLoginDto);

        return result;
    }
}
