package com.mohaeng.backend.place.domain;

import com.mohaeng.backend.place.entity.Category;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Table;

@Entity
@Table(appliesTo = "place")
@Getter
@RequiredArgsConstructor
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "content")
    private String content;

    @Column(name = "address")
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private Category category;

    @Column(name = "available_time")
    private String availableTime;

    @Column(name = "menu")
    private String menu;

    @Column(name = "email")
    private String email;
}
