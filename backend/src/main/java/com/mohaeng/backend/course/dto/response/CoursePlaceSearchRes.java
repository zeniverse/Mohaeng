package com.mohaeng.backend.course.dto.response;

import com.mohaeng.backend.course.dto.CoursePlaceSearchDto;
import lombok.*;
import org.springframework.data.domain.Slice;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@ToString
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CoursePlaceSearchRes {

    private boolean hasNext;
    private List<CoursePlaceSearchDto> places;

    public static CoursePlaceSearchRes from(Slice<CoursePlaceSearchDto> slice) {
        return new CoursePlaceSearchRes(slice.hasNext(), slice.getContent());
    }
}
