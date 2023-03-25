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

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.nio.channels.Channels;
import java.nio.channels.FileChannel;
import java.nio.channels.ReadableByteChannel;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final RandomNameService randomNameService;
    private final TokenGenerator tokenGenerator;

    private final String CLIENT_ID = "d7c41513380cc7e5cbbfce173bf86002";
    private final String REDIRECT_URL = "http://localhost:3000/login/kakao";

    private final String GET_ACCESS_TOKEN_URL = "https://kauth.kakao.com/oauth/token";
    private final String GET_PROFILE_URL = "https://kapi.kakao.com/v2/user/me";
    private final String IMG_PATH = "../../../../../../resources/image/";


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
        String profileImage = jsonObject.getJSONObject("properties").getString("profile_image");
        System.out.println("profileImage = " + profileImage);

        return new KakaoUserDto(parsedEmail, parsedName, profileImage);
    }

    public Member saveMember(String token) throws IOException {
        KakaoUserDto kakaoUser = findProfile(token);
        Member member = memberRepository.findByEmail(kakaoUser.getEmail())
                .orElse(new Member(kakaoUser.getName(),
                        kakaoUser.getEmail(), Role.NORMAL, randomNameService.generateNickName()));

        String fileName = downloadFile(kakaoUser.getProfileImage());

        member.changeImageURL(IMG_PATH);
        member.changeImageName(fileName);
        member.setOauthAccessToken(token);
        memberRepository.save(member);
        return member;
    }

    private String downloadFile(String url) throws IOException {
        // URL 객체 생성
        URL fileUrl = new URL(url);

        // 파일 경로 추출
        String fileName = url.substring(url.lastIndexOf("/") + 1);

        System.out.println("fileName = " + fileName);

        // 로컬 디렉토리 경로 생성
        File directory = new File(IMG_PATH);
        if (!directory.exists()) {
            directory.mkdirs();
            System.out.println("directory.exists() = " + directory.exists());
        }

        // 파일 다운로드
        ReadableByteChannel readableByteChannel = Channels.newChannel(fileUrl.openStream());
        FileOutputStream fileOutputStream = new FileOutputStream(IMG_PATH + "/" + fileName);
        FileChannel fileChannel = fileOutputStream.getChannel();
        long transferredBytes = fileChannel.transferFrom(readableByteChannel, 0, Long.MAX_VALUE);


        // 다운로드 완료 후 리소스 해제
        fileOutputStream.close();
        readableByteChannel.close();
        System.out.println(String.format("File downloaded to %s%s%s. Total bytes transferred: %d",
                IMG_PATH, File.separator, fileName, transferredBytes));
        return fileName;
    }

    public Token createToken(Member member) {
        return tokenGenerator.generateToken(member.getEmail(), member.getRole());
    }


    public void deleteMember(Member member, String code){
        memberRepository.delete(member);

        RestTemplate restTemplate = new RestTemplate();
        String reqURL = "https://kapi.kakao.com/v1/user/unlink";

        HttpHeaders header = new HttpHeaders();
        header.add("Authorization", "Bearer " + code);
        header.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<String> entity = new HttpEntity<String>("parameters", header);


        ResponseEntity<String> response = restTemplate.exchange(
                reqURL,
                HttpMethod.POST,
                entity,
                String.class
        );

        String body = response.getBody();

        System.out.println("body:" + body);
    }
}
