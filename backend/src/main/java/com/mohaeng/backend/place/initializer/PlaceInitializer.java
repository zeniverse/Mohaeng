package com.mohaeng.backend.place.initializer;

import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.repository.PlaceRepository;
import com.mohaeng.backend.place.service.PlaceService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.util.List;

@Profile("prod")
@RequiredArgsConstructor
@Component
public class PlaceInitializer {

    private final PlaceRepository placeRepository;
    private final PlaceService placeService;

    @PostConstruct
    public void init() throws IOException, ParserConfigurationException, SAXException {
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        placeService.saveInitImage();
        List<Place> places = placeService.getPlaces(); // 최초생성
        stopWatch.stop();
        long totalTimeMillis = stopWatch.getTotalTimeMillis();
        System.out.println("total time : " + totalTimeMillis);
        placeRepository.saveAll(places);
        System.out.println("total time : " + totalTimeMillis);
        placeRepository.flush();
    }
}
