package com.mohaeng.backend.course.service;

import com.mohaeng.backend.course.dto.CoursePlaceSearchDto;
import com.mohaeng.backend.course.dto.request.CoursePlaceSearchReq;
import com.mohaeng.backend.course.dto.response.CoursePlaceSearchRes;
import com.mohaeng.backend.place.repository.PlaceRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;


@Service
@Transactional
@RequiredArgsConstructor
public class CourseService {

    private final PlaceRepository placeRepository;
    public CoursePlaceSearchRes placeSearch(CoursePlaceSearchReq req, Pageable pageable) {
        // keyword에 null이 담겨있을 때
        if (req.getKeyword() == null){
            throw new IllegalArgumentException("keyword 값이 비어있습니다.");
        }
        // rating에 점수가 담겨있지 않을 때
        Double rating = req.parseRatingToDouble(req.getLastRating());
        Slice<CoursePlaceSearchDto> placeInCourse = placeRepository.findPlaceInCourse(req.getKeyword(), req.getLastPlaceId(), rating, pageable);

        return CoursePlaceSearchRes.from(placeInCourse);
    }
}
