package com.mohaeng.backend.member.service;

import com.mohaeng.backend.course.domain.CourseBookmark;
import com.mohaeng.backend.course.repository.CourseBookmarkRepository;
import com.mohaeng.backend.course.repository.CourseRepository;
import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.dto.response.MyPageCourseBookMarkDto;
import com.mohaeng.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MyPageService {
    private final CourseBookmarkRepository courseBookmarkRepository;
    private final CourseRepository courseRepository;
    private final MemberRepository memberRepository;


    @Transactional
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

    public Member isMember(String email) {
        return memberRepository.findByEmailAndDeletedDateIsNull(email)
                .orElseThrow(() -> new IllegalArgumentException("Not_Exist_Member"));
    }

    @Transactional
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

    public boolean isBookmarkByMemberAndId(Member member, Long bookMarkId) {
        return courseBookmarkRepository.existsCourseBookmarkByMemberAndId(member, bookMarkId);
    }

    public CourseBookmark isCourseBookMark(Long bookMarkId) {
        return courseBookmarkRepository.findById(bookMarkId)
                .orElseThrow(() -> new IllegalArgumentException("NOT_EXIST_COURSE_BOOK_MARK"));
    }

    public void deleteMember(Member member){
        memberRepository.delete(member);
    }
}