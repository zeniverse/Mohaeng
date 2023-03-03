package com.mohaeng.backend.course.dto.response;

import com.mohaeng.backend.course.dto.CoursePlaceSearchDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.domain.Slice;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@ToString
public class CoursePlaceSearchRes {

    private boolean hasNext;
    private List<CoursePlaceSearchDto> places;

    private CoursePlaceSearchRes() {
    }

    private CoursePlaceSearchRes(boolean hasNext, List<CoursePlaceSearchDto> places) {
        this.hasNext = hasNext;
        this.places = places;
    }

    public static CoursePlaceSearchRes from(Slice<CoursePlaceSearchDto> slice) {
        return new CoursePlaceSearchRes(slice.hasNext(), slice.getContent());
    }
}
