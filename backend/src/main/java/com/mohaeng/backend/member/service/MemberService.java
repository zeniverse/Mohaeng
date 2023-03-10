package com.mohaeng.backend.member.service;

import com.mohaeng.backend.common.BaseResponse;
import com.mohaeng.backend.course.repository.CourseRepository;
import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.dto.response.MyPageCourseBookMarkDto;
import com.mohaeng.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final CourseRepository courseRepository;

    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("INVALID_USER"));
    }

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
}
