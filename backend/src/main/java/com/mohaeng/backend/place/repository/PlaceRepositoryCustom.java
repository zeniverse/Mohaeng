package com.mohaeng.backend.place.repository;

import com.mohaeng.backend.course.dto.CoursePlaceSearchDto;
import com.mohaeng.backend.course.dto.response.CoursePlaceSearchRes;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;


public interface PlaceRepositoryCustom {
    Slice<CoursePlaceSearchDto> findPlaceInCourse(String keyword, Long lastPlaceId, Double lastRating, Pageable pageable);
}
