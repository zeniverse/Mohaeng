package com.mohaeng.backend.place.repository;

import com.mohaeng.backend.course.dto.CoursePlaceSearchDto;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;

import static org.springframework.util.ObjectUtils.isEmpty;

import java.util.List;

import static com.mohaeng.backend.place.domain.QPlace.place;
import static com.mohaeng.backend.place.domain.QPlaceImage.placeImage;

public class PlaceRepositoryImpl implements PlaceRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public PlaceRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }


    @Override
    public Slice<CoursePlaceSearchDto> findPlaceInCourse(String keyword, Long lastPlaceId, Double lastRating, Pageable pageable) {
        List<CoursePlaceSearchDto> res = queryFactory
                .select(Projections.constructor(CoursePlaceSearchDto.class,
                        place.id,
                        placeImage.imgUrl,
                        place.name,
                        place.addr1,
                        place.rating
                ))
                .from(place)
                .leftJoin(place.placeImages, placeImage)
                .groupBy(place.id)
                .where(
                        titleContain(keyword),
                        placeIdAndRatingLt(lastPlaceId, lastRating),
                        placeImage.imgUrl.eq(
                                JPAExpressions.select(placeImage.imgUrl)
                                        .from(placeImage)
                                        .where(place.id.eq(placeImage.place.id))
                                        .orderBy(placeImage.id.asc())
                                        .groupBy(place.id)
                                        .limit(1L)
                        )
                )
                .orderBy(place.rating.desc(), place.id.desc())
                .limit(pageable.getPageSize()+1)
                .fetch();

        System.out.println("res = " + res);

        boolean hasNext = false;

        if (res.size() > pageable.getPageSize()){
            hasNext = true;
            res.remove(pageable.getPageSize());
        }

        return new SliceImpl<>(res, pageable, hasNext);
    }

    private BooleanExpression titleContain(String keyword) {
        // 검색어에서 공백 제거
        String notBlank = keyword.replaceAll(" ", "");
        // 여행지 title의 공백 제거
        StringTemplate tit = Expressions.stringTemplate("REPLACE({0},' ','')", place.name);
        return isEmpty(keyword) ? null : tit.containsIgnoreCase(keyword).or(tit.containsIgnoreCase(notBlank));
    }

    private BooleanExpression placeIdAndRatingLt(Long placeId, double lastRating) {

        return (placeId == null && lastRating == 0.0) ? null : place.id.lt(placeId).and(place.rating.loe(lastRating));
    }
}
