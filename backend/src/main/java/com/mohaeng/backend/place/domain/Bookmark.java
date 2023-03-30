package com.mohaeng.backend.place.domain;

import com.mohaeng.backend.member.domain.Member;
import jakarta.persistence.*;
import lombok.RequiredArgsConstructor;

@Entity
@RequiredArgsConstructor
@Table
public class Bookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place place;

    public Bookmark(Long id, Member member, Place place) {
        this.id = id;
        this.member = member;
        this.place = place;
    }

}
