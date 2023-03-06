package com.mohaeng.backend.place.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Table;


@Entity
@Table(appliesTo = "place")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Place {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_id")
    private Long id;

    private String addr1;
    private String areacode;
    private String firstimage;
    private String firstimage2;
    private String mapx;
    private String mapy;
    private String sigungucode;
    private String title;


    public Place(String addr1, String areacode, String firstimage, String firstimage2, String mapx, String mapy, String sigungucode, String title) {
        this.addr1 = addr1;
        this.areacode = areacode;
        this.firstimage = firstimage;
        this.firstimage2 = firstimage2;
        this.mapx = mapx;
        this.mapy = mapy;
        this.sigungucode = sigungucode;
        this.title = title;
    }
}
