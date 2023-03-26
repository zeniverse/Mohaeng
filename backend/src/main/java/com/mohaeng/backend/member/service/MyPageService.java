package com.mohaeng.backend.member.service;

import com.mohaeng.backend.common.BaseResponse;
import com.mohaeng.backend.course.repository.CourseRepository;
import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.dto.response.MyPageCourseBookMarkDto;
import com.mohaeng.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MyPageService {
    private final CourseRepository courseRepository;
    private final MemberRepository memberRepository;


    public ResponseEntity findAllBookMarkCourse(Member member) {
        List<MyPageCourseBookMarkDto> data = member.getCourseBookMarkList().stream()
                .filter(m -> courseRepository.findById(m.getId()).isPresent())
                .map(m -> new MyPageCourseBookMarkDto(m.getId(),
                        m.getCourse().getId(), m.getCourse().getTitle(),
                        m.getCourse().getRegion(), m.getCourse().getContent(),
                        m.getCourse().getIsPublished(), m.getCourse().getCreatedDate(),
                        m.getCourse().getModifiedDate()))
                .collect(Collectors.toList());


        return ResponseEntity.ok().body(BaseResponse.success("OK", data));
    }

    public ResponseEntity findOneBookMarkedCourse(Member member, Long bookMarkId) {
        MyPageCourseBookMarkDto data = member.getCourseBookMarkList()
                .stream()
                .filter(m -> m.getId().equals(bookMarkId))
                .findAny()
                .map(m -> new MyPageCourseBookMarkDto(m.getId(),
                        m.getCourse().getId(), m.getCourse().getTitle(),
                        m.getCourse().getRegion(), m.getCourse().getContent(),
                        m.getCourse().getIsPublished(), m.getCourse().getCreatedDate(),
                        m.getCourse().getModifiedDate()))
                .orElse(null);


        return ResponseEntity.ok().body(BaseResponse.success("OK", data));
    }

    public void deleteMember(Member member, String code){
//        RestTemplate restTemplate = new RestTemplate();
//        String reqURL = "https://kapi.kakao.com/v1/user/unlink";
//
//        HttpHeaders header = new HttpHeaders();
//        header.add("Authorization", "Bearer " + code);
//        header.add("Content-type", "application/x-www-form-urlencoded");
//
//
//        MultiValueMap<String, String> body= new LinkedMultiValueMap<>();
//        body.add("target_id_type", "user_id");
//        body.add("target_id", String.valueOf(member.getKakaoId()));
//
//        HttpEntity<HttpHeaders> request = new HttpEntity<>(header, body);
//
//        ResponseEntity<String> response = restTemplate.exchange(
//                reqURL,
//                HttpMethod.POST,
//                request,
//                String.class
//        );
        memberRepository.delete(member);
    }
}