package com.mohaeng.backend.place.domain;

import com.mohaeng.backend.place.entity.Category;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.Table;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(appliesTo = "place")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Place {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_id")
    private Long id;

    private String name;
    private String addr1;
    //    private String content;
    private String areacode;
    private String firstimage;
    private String firstimage2;
    private String mapx;
    private String mapy;
    private String sigungucode;
    private String contentid;
    private double rating;

    @Builder.Default
    @OneToMany(mappedBy = "place")
    @ToString.Exclude
    private List<PlaceImage> placeImages = new ArrayList<>();

}
