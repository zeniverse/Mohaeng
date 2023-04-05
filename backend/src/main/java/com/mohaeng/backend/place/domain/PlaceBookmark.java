package com.mohaeng.backend.place.domain;

import com.mohaeng.backend.common.BaseTimeEntity;
import com.mohaeng.backend.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Where;

import java.time.LocalDateTime;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Where(clause = "deleted_date is NULL")
public class PlaceBookmark extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_bookmark_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "place_id")
    private Place place;

    private LocalDateTime deletedDate;

    @Builder
    public PlaceBookmark(Long id, Place place, Member member, LocalDateTime createdDate, LocalDateTime deletedDate) {
        this.id = id;
        this.place = place;
        this.member = member;
        this.deletedDate = deletedDate;
    }

    public static PlaceBookmark of(Member member, Place place){
        return PlaceBookmark.builder()
                .member(member)
                .place(place)
                .build();
    }

    public void updateDeletedDate() {
        this.deletedDate = LocalDateTime.now();
    }
}
