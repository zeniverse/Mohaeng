package com.mohaeng.backend.place.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.hibernate.cfg.AvailableSettings;
import org.hibernate.id.enhanced.SequenceStyleGenerator;


@Entity
@Builder
@Getter
@Table(name = "place")
@RequiredArgsConstructor
public class Place {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "test-sequence-generator")
    @GenericGenerator(
            name = "test-sequence-generator",
            strategy = "sequence",
            parameters = {
                    @Parameter(name = SequenceStyleGenerator.SEQUENCE_PARAM, value = SequenceStyleGenerator.DEF_VALUE_COLUMN),
                    @Parameter(name = SequenceStyleGenerator.INITIAL_PARAM, value = "1"),
                    @Parameter(name = SequenceStyleGenerator.INCREMENT_PARAM, value = "100"),
                    @Parameter(name = AvailableSettings.PREFERRED_POOLED_OPTIMIZER, value = "pooled-lo")
            }
    )
    @Column(name = "place_id")
    private Long id;

    private String name;
    private String addr1;
    private String addr2;
    private String areacode;
    private String firstimage;
    private String firstimage2;
    private String mapx;
    private String mapy;
    private String sigungucode;
    private String contentid;
    @Column(length = 500)
    private String overview;

    public Place(Long id, String name, String addr1, String addr2, String areacode, String firstimage, String firstimage2, String mapx, String mapy, String sigungucode, String contentid, String overview) {
        this.id = id;
        this.name = name;
        this.addr1 = addr1;
        this.addr2 = addr2;
        this.areacode = areacode;
        this.firstimage = firstimage;
        this.firstimage2 = firstimage2;
        this.mapx = mapx;
        this.mapy = mapy;
        this.sigungucode = sigungucode;
        this.contentid = contentid;
        this.overview = overview;
    }

    public Place(long id, String name, String addr1, String areacode, String firstimage, String firstimage2, String mapx, String mapy, String sigungucode, String contentid, String overview) {
        this.id = id;
        this.name = name;
        this.addr1 = addr1;
        this.areacode = areacode;
        this.firstimage = firstimage;
        this.firstimage2 = firstimage2;
        this.mapx = mapx;
        this.mapy = mapy;
        this.sigungucode = sigungucode;
        this.contentid = contentid;
        this.overview = overview;

    }


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