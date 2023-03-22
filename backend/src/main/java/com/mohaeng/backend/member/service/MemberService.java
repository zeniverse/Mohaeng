package com.mohaeng.backend.member.service;

import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.domain.Role;
import com.mohaeng.backend.member.dto.response.KakaoUserDto;
import com.mohaeng.backend.member.jwt.Token;
import com.mohaeng.backend.member.jwt.TokenGenerator;
import com.mohaeng.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final RandomNameService randomNameService;
    private final TokenGenerator tokenGenerator;

    private final String CLIENT_ID = "d7c41513380cc7e5cbbfce173bf86002";
    private final String REDIRECT_URL = "http://localhost:8080/login/oauth2/code/kakao";

    private final String GET_ACCESS_TOKEN_URL = "https://kauth.kakao.com/oauth/token";
    private final String GET_PROFILE_URL = "https://kapi.kakao.com/v2/user/me";


    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("INVALID_USER"));
    }

    public String getAccessToken(String code){
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", CLIENT_ID);
        params.add("redirect_uri", REDIRECT_URL);
        params.add("code", code);

        //Header와 Body를 합침
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
                new HttpEntity<>(params, headers);

        //Post로 요청
        ResponseEntity<String> accessTokenResponse = restTemplate.exchange(
                GET_ACCESS_TOKEN_URL,
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        String body = accessTokenResponse.getBody();
        JSONObject jsonObject = new JSONObject(body);
        String access_token = jsonObject.getString("access_token");

        return access_token;
    }

    public KakaoUserDto findProfile(String token) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest =
                new HttpEntity<>(headers);

        ResponseEntity<String> kakaoProfileResponse = restTemplate.exchange(
                GET_PROFILE_URL,
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );

        String body = kakaoProfileResponse.getBody();
        JSONObject jsonObject = new JSONObject(body);
        String parsedEmail = jsonObject.getJSONObject("kakao_account").getString("email");
        String parsedName = jsonObject.getJSONObject("properties").getString("nickname");

        return new KakaoUserDto(parsedEmail, parsedName);
    }

    public Member saveMember(String token) {
        KakaoUserDto kakaoUser = findProfile(token);
        Member member = memberRepository.findByEmail(kakaoUser.getEmail())
                .orElse(new Member(kakaoUser.getName(),
                        kakaoUser.getEmail(), Role.NORMAL, randomNameService.generateNickName()));
        memberRepository.save(member);

        return member;
    }

    public Token createToken(Member member) {
        return tokenGenerator.generateToken(member.getEmail(), member.getRole());
    }


}
