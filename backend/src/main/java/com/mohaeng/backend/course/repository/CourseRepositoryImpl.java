package com.mohaeng.backend.course.repository;

import com.mohaeng.backend.course.domain.Course;
import com.mohaeng.backend.course.dto.CourseSearchDto;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Wildcard;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.ArrayList;
import java.util.List;

import static com.mohaeng.backend.course.domain.QCourse.course;
import static java.util.Objects.isNull;
import static org.springframework.util.ObjectUtils.isEmpty;

public class CourseRepositoryImpl implements CourseRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    public CourseRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<Course> findAllCourseWithKeyword(CourseSearchDto courseSearchDto, Pageable pageable) {
        OrderSpecifier[] orderSpecifiers = createOrderSpecifier(courseSearchDto.getSort());

        List<Course> results = queryFactory
                .selectFrom(course)
                .where(
                        titleEq(courseSearchDto.getKeyword()),
                        regionEq(courseSearchDto.getRegion()),
                        daysEq(courseSearchDto.getDays())
                )
                .orderBy(orderSpecifiers)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> totalCount = queryFactory
                .select(Wildcard.count)
                .from(course)
                .where(
                        titleEq(courseSearchDto.getKeyword()),
                        regionEq(courseSearchDto.getRegion()),
                        daysEq(courseSearchDto.getDays())
                );

        return PageableExecutionUtils.getPage(results, pageable, totalCount::fetchOne);
    }

    private OrderSpecifier[] createOrderSpecifier(String sortCondition) {

        List<OrderSpecifier> orderSpecifiers = new ArrayList<>();

        if(isNull(sortCondition)){
            orderSpecifiers.add(new OrderSpecifier(Order.DESC, course.id));
        } else if (sortCondition.equals("courseId")){
            orderSpecifiers.add(new OrderSpecifier(Order.DESC, course.id));
        }
        else {
            orderSpecifiers.add(new OrderSpecifier(Order.DESC, course.likeCount));
        }
        return orderSpecifiers.toArray(new OrderSpecifier[orderSpecifiers.size()]);
    }
    private BooleanExpression titleEq(String keyword) {
        return isNull(keyword) ? null : course.title.contains(keyword);
    }

    private BooleanExpression regionEq(String region) {
        return isEmpty(region) ? null : course.region.eq(region);
    }

    private BooleanExpression daysEq(String days) {
        return isEmpty(days) ? null : course.courseDays.eq(days);
    }

}
