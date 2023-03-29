package com.mohaeng.backend.place.repository;

import com.mohaeng.backend.course.dto.CoursePlaceSearchDto;
import com.mohaeng.backend.course.dto.response.CoursePlaceSearchRes;
import com.mohaeng.backend.place.domain.Place;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;


public interface PlaceRepositoryCustom {
    Slice<Place> findPlaceInCourse(String keyword, Long lastPlaceId, double lastRating, Pageable pageable);
}
