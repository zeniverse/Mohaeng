package com.mohaeng.backend.place.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "test-sequence-generator")
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
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long id;
    private String name;
    private String addr1;
    private String areaCode;
    private String sigunguCode;
    private String firstImage;
    private String firstImage2;
    private String mapX;
    private String mapY;
    private String contentId;

    public Place(String name, String address, String areaCode, String sigunguCode, String contentId, String firstImage, String firstImage2, String mapX, String mapY) {
        this.name = name;
        this.addr1 = address;
        this.areaCode = areaCode;
        this.sigunguCode = sigunguCode;
        this.contentId = contentId;
        this.firstImage = firstImage;
        this.firstImage2 = firstImage2;
        this.mapX = mapX;
        this.mapY = mapY;
    }

    public Place(Long id, String name, String address, String areaCode, String firstImage, String firstImage2, String mapX, String mapY, String sigunguCode, String contentId) {
        this.id = id;
        this.name = name;
        this.addr1 = address;
        this.areaCode = areaCode;
        this.firstImage = firstImage;
        this.firstImage2 = firstImage2;
        this.mapX = mapX;
        this.mapY = mapY;
        this.sigunguCode = sigunguCode;
        this.contentId = contentId;
    }
}