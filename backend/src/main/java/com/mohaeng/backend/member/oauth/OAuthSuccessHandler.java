package com.mohaeng.backend.member.oauth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mohaeng.backend.member.domain.Role;
import com.mohaeng.backend.member.jwt.Token;
import com.mohaeng.backend.member.jwt.TokenGenerator;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.PrintWriter;

@RequiredArgsConstructor
@Component
public class OAuthSuccessHandler implements AuthenticationSuccessHandler {
    private final TokenGenerator tokenGenerator;
    private final ObjectMapper objectMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Token token = tokenGenerator.generateToken((String) oAuth2User.getAttributes().get("email"), Role.NORMAL);

        response.addHeader("Access-Token", token.getAccessToken());
        response.addHeader("Refersh-Token", token.getRefreshToken());
        response.setContentType("application/json;charset=UTF-8");

        PrintWriter writer = response.getWriter();
        writer.println(objectMapper.writeValueAsString(token));
        writer.flush();
    }
}
