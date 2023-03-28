package com.mohaeng.backend.member.service;

import com.mohaeng.backend.course.domain.CourseBookmark;
import com.mohaeng.backend.course.repository.CourseBookmarkRepository;
import com.mohaeng.backend.course.repository.CourseRepository;
import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.dto.response.MyPageCourseBookMarkDto;
import com.mohaeng.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MyPageService {
    private final CourseBookmarkRepository courseBookmarkRepository;
    private final CourseRepository courseRepository;
    private final MemberRepository memberRepository;


    public List<MyPageCourseBookMarkDto> findAllBookMarkCourse(String email) {
        Member member = isMember(email);
        List<CourseBookmark> courseBookMarkList = member.getCourseBookMarkList();

        for (CourseBookmark courseBookmark : courseBookMarkList) {
            if (!isBookmarkByMemberAndId(member, courseBookmark.getId())) {
                throw new IllegalArgumentException("DO_NOT_MATCH_MEMBER_AND_BOOK_MARK");
            }
        }

        return member.getCourseBookMarkList().stream()
                .filter(m -> courseRepository.findById(m.getId()).isPresent())
                .map(bookmark -> MyPageCourseBookMarkDto.of(bookmark))
                .collect(Collectors.toList());
    }

    private Member isMember(String email) {
        return memberRepository.findByEmailAndDeletedDateIsNull(email)
                .orElseThrow(() -> new IllegalArgumentException("Not_Exist_Member"));
    }

    public MyPageCourseBookMarkDto findOneBookMarkedCourse(String email, Long bookMarkId) {
        Member member = isMember(email);
        CourseBookmark courseBookMark = isCourseBookMark(bookMarkId);

        //현재의 Member가 가진 북마크가맞는지 확인
        if (!isBookmarkByMemberAndId(member, bookMarkId)) {
            throw new IllegalArgumentException("DO_NOT_MATCH_MEMBER_AND_BOOK_MARK");
        }

        MyPageCourseBookMarkDto data = MyPageCourseBookMarkDto.of(courseBookMark);
        return data;
    }

    private boolean isBookmarkByMemberAndId(Member member, Long bookMarkId) {
        return courseBookmarkRepository.existsCourseBookmarkByMemberAndId(member, bookMarkId);
    }

    private CourseBookmark isCourseBookMark(Long bookMarkId) {
        return courseBookmarkRepository.findById(bookMarkId)
                .orElseThrow(() -> new IllegalArgumentException("NOT_EXIST_COURSE_BOOK_MARK"));
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