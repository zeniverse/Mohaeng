package com.mohaeng.backend.course.service;

import com.mohaeng.backend.course.domain.Course;
import com.mohaeng.backend.course.domain.CourseBookmark;
import com.mohaeng.backend.course.dto.response.CourseBookmarkRes;
import com.mohaeng.backend.course.repository.CourseBookmarkRepository;
import com.mohaeng.backend.course.repository.CourseRepository;
import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CourseBookmarkService {

    private final CourseBookmarkRepository courseBookmarkRepository;
    private final MemberRepository memberRepository;
    private final CourseRepository courseRepository;

    @Transactional
    public CourseBookmarkRes addBookmark(Long courseId, String memberEmail) {
        // 1. 유저 확인 & 코스 확인
        Member member = isMember(memberEmail);
        Course course = isCourse(courseId);

        // 3. 이미 북마크를 누른 회원인지 확인
        if (isExistBookmark(member, course)){
            throw new IllegalArgumentException("이미 좋아요를 누른 회원입니다.");
        }

        // 4. CourseBookmark 저장 & member에 bookmark 추가
        CourseBookmark courseBookmark = CourseBookmark.of(member, course);
        courseBookmarkRepository.save(courseBookmark);

        member.addCourseBookMark(courseBookmark);

        return CourseBookmarkRes.from(courseId, member.getId());
    }

    @Transactional
    public CourseBookmarkRes cancelBookmark(Long courseId, String memberEmail) {
        // 1. 유저 확인 & 코스 확인
        Member member = isMember(memberEmail);
        Course course = isCourse(courseId);

        // 2. 이미 북마크를 누른 회원인지 확인
        if (!isExistBookmark(member, course)) {
            throw new IllegalArgumentException("member가 해당 course의 좋아요룰 누르지 않았습니다");
        }

        // 4. 해당 CourseBookmark 찾아서, deletedDate update & member의 courseBookMarkList에서 제거
        CourseBookmark courseBookmark = courseBookmarkRepository.findByMemberAndCourse(member, course);
        courseBookmark.updateDeleteDate();
        member.removeCourseBookMark(courseBookmark);

        return CourseBookmarkRes.from(courseId, member.getId());
    }

    public boolean isExistCourseBookmark(Long courseId, String memberEmail) {
        // 유저 확인 & 코스 확인
        Member member = isMember(memberEmail);
        Course course = isCourse(courseId);

        return isExistBookmark(member, course);
    }

    private boolean isExistBookmark(Member member, Course course) {
        return courseBookmarkRepository.existsCourseBookmarkByMemberAndCourse(member, course);
    }

    private Member isMember(String memberEmail){
        return memberRepository.findByEmailAndDeletedDateIsNull(memberEmail).orElseThrow(
                // TODO: Exception 처리
                () -> new IllegalArgumentException("존재하지 않는 member 입니다.")
        );
    }

    private Course isCourse(Long id){
        return courseRepository.findById(id).orElseThrow(
                // TODO: Exception 처리
                () -> new IllegalArgumentException("존재하지 않는 코스 입니다.")
        );
    }

}
