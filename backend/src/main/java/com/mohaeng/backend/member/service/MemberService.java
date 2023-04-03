package com.mohaeng.backend.member.service;

import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.domain.Role;
import com.mohaeng.backend.member.dto.request.UserInfoChangeRequest;
import com.mohaeng.backend.member.dto.response.KakaoUserDto;
import com.mohaeng.backend.member.dto.response.MemberLoginDto;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.nio.channels.Channels;
import java.nio.channels.FileChannel;
import java.nio.channels.ReadableByteChannel;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final RandomNameService randomNameService;
    private final TokenGenerator tokenGenerator;
    private final String UPLOAD_PATH = "../../image/";

    private final String CLIENT_ID = "d7c41513380cc7e5cbbfce173bf86002";
    private final String REDIRECT_URL = "http://localhost:3000/login/kakao";

    private final String GET_ACCESS_TOKEN_URL = "https://kauth.kakao.com/oauth/token";
    private final String GET_PROFILE_URL = "https://kapi.kakao.com/v2/user/me";
    private final String IMG_PATH = "../../../../../../resources/image/";


    public Member findByEmail(String email) {
        return memberRepository.findByEmailAndDeletedDateIsNull(email)
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
        long id = jsonObject.getLong("id");
        String parsedEmail = jsonObject.getJSONObject("kakao_account").getString("email");
        String parsedName = jsonObject.getJSONObject("properties").getString("nickname");
        String profileImage = jsonObject.getJSONObject("properties").getString("profile_image");

        return new KakaoUserDto(id, parsedEmail, parsedName, profileImage);
    }

    public Member saveMember(Member member) {
        return memberRepository.save(member);
    }

    public Member saveMember(String token) {
        KakaoUserDto kakaoUser = findProfile(token);
        Member member = memberRepository.findByEmailAndDeletedDateIsNull(kakaoUser.getEmail())
                .orElse(new Member(kakaoUser.getName(),
                        kakaoUser.getEmail(), Role.NORMAL, randomNameService.generateNickName()));

        member.changeImageURL(kakaoUser.getProfileImage());
        member.setOauthAccessToken(token);
        member.setKakaoId(kakaoUser.getKakaoId());
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

    public MemberLoginDto getLoginInfo(Member member) {
        MemberLoginDto memberLoginDto = MemberLoginDto.builder()
                .id(member.getId())
                .email(member.getEmail())
                .nickName(member.getNickName())
                .imgUrl(member.getImageURL() + member.getImageName())
                .build();
        return memberLoginDto;
    }

    @Transactional
    public void changeProfile(Member member, UserInfoChangeRequest userInfoChangeRequest, MultipartFile multipartFile) throws IOException {
        member.changeNickName(userInfoChangeRequest.getNickName());
        if (multipartFile != null) {
            UUID uuid = UUID.randomUUID();
            String fileName = uuid + "_" + multipartFile.getOriginalFilename();
            File profileImg = new File(UPLOAD_PATH, fileName);
            multipartFile.transferTo(profileImg);

            member.changeImageName(fileName);
            member.changeImageURL(UPLOAD_PATH +"/"+fileName);
        }

    }

}
