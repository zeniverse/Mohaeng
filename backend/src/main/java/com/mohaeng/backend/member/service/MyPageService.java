package com.mohaeng.backend.member.service;

import com.mohaeng.backend.course.domain.CourseBookmark;
import com.mohaeng.backend.course.repository.CourseBookmarkRepository;
import com.mohaeng.backend.course.repository.CourseRepository;
import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.dto.response.MyPageCourseBookMarkDto;
import com.mohaeng.backend.member.dto.response.MyPagePlaceBookMarkDto;
import com.mohaeng.backend.member.repository.MemberRepository;
import com.mohaeng.backend.place.domain.PlaceBookmark;
import com.mohaeng.backend.place.repository.PlaceBookmarkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MyPageService {
    private final CourseBookmarkRepository courseBookmarkRepository;
    private final CourseRepository courseRepository;
    private final MemberRepository memberRepository;
    private final PlaceBookmarkRepository placeBookmarkRepository;


    @Transactional
    public List<MyPageCourseBookMarkDto> findAllBookMarkCourse(String email) {
        Member member = isMember(email);

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

    //TODO: 쿼리 수정 or 조회 로직 수정
    public boolean isBookmarkByMemberAndId(Member member, Long bookMarkId) {
        List<CourseBookmark> courseBookMarkList = member.getCourseBookMarkList();
        for (CourseBookmark courseBookmark : courseBookMarkList) {
            if (courseBookmark.getId() == bookMarkId) {
                return true;
            }
        }
        return false;
    }

    public CourseBookmark isCourseBookMark(Long bookMarkId) {
        return courseBookmarkRepository.findById(bookMarkId)
                .orElseThrow(() -> new IllegalArgumentException("NOT_EXIST_COURSE_BOOK_MARK"));
    }

    @Transactional
    public List<MyPagePlaceBookMarkDto> findAllBookMarkedPlace(String email) {
        Member member = isMember(email);
        return member.getPlaceBookmarkList().stream()
                .map(m -> MyPagePlaceBookMarkDto.of(m))
                .sorted(Comparator.comparing(MyPagePlaceBookMarkDto :: getCreatedDate).reversed())
                .collect(Collectors.toList());
    }

    @Transactional
    public MyPagePlaceBookMarkDto findOneBookMarkedPlace(String email, Long bookMarkPlaceId) {
        Member member = isMember(email);
        PlaceBookmark placeBookMark = isPlaceBookMark(bookMarkPlaceId);

        //현재의 Member가 가진 장소북마크가맞는지 확인
        if (!isPlaceBookMarkByMember(member, bookMarkPlaceId)) {
            throw new IllegalArgumentException("DO_NOT_MATCH_MEMBER_AND_PLACE_BOOK_MARK");
        }

        return MyPagePlaceBookMarkDto.of(placeBookMark);
    }

    public PlaceBookmark isPlaceBookMark(Long id) {
        return placeBookmarkRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("NOT_EXIST_PLACE_BOOK_MARK"));
    }

    public boolean isPlaceBookMarkByMember(Member member, Long bookMarkPlaceId) {
        for (PlaceBookmark placeBookmark : member.getPlaceBookmarkList()) {
            if (placeBookmark.getId() == bookMarkPlaceId) {
                return true;
            }
        }
        return false;
    }

    public void deleteMember(Member member){
        memberRepository.delete(member);
    }
}