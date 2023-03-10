package com.mohaeng.backend.place.domain;

import com.fasterxml.jackson.databind.JsonNode;
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

    private String name;
    private String addr1;
    private String areacode;
    private String firstimage;
    private String firstimage2;
    private String mapx;
    private String mapy;
    private String sigungucode;
    private String contentid;
    private String overview;


//    public Place(String name, String addr1, String areacode, String firstimage, String firstimage2, String mapx, String mapy, String sigungucode, String contentid) {
//        this.name = name;
//        this.addr1 = addr1;
//        this.areacode = areacode;
//        this.firstimage = firstimage;
//        this.firstimage2 = firstimage2;
//        this.mapx = mapx;
//        this.mapy = mapy;
//        this.sigungucode = sigungucode;
//        this.contentid = contentid;
//    }

}