package com.mohaeng.backend.place.service;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mohaeng.backend.place.domain.Place;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class PlaceService2 {

    private final WebClient webClient;
    private final ObjectMapper objectMapper;
    private static final Logger logger = LoggerFactory.getLogger(PlaceService2.class);
    @Autowired
    public PlaceService2(WebClient.Builder webClientBuilder, ObjectMapper objectMapper) {
        this.webClient = webClientBuilder.build();
        this.objectMapper = objectMapper;
    }

//    dpTiMvKcFS8NVB1nRTahfmZTMala0uVdt7qu81eNIxznRol2OcYVskpBXHGIfAEIQf1eY2b/jMA4uu5ztw8heg==
    public Mono<List<Place>> getPlaces() {
        return webClient.get()
                .uri("https://apis.data.go.kr/B551011/KorService1/areaBasedList1?numOfRows=300&pageNo=1&MobileOS=ETC&MobileApp=Apptest&_type=json&listYN=Y&arrange=A&contentTypeId=12&serviceKey=dpTiMvKcFS8NVB1nRTahfmZTMala0uVdt7qu81eNIxznRol2OcYVskpBXHGIfAEIQf1eY2b/jMA4uu5ztw8heg==")
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .doOnSuccess(response -> logger.debug("HTTP response: {}", response))
                .doOnError(error -> logger.error("HTTP request failed: {}", error.getMessage()))
                .flatMap(response -> response.bodyToMono(String.class))
                .flatMap(response -> {
                    try {
                        return Mono.justOrEmpty(objectMapper.readValue(response, PlaceResponse.class));
                    } catch (JsonProcessingException e) {
                        return Mono.error(new RuntimeException(e));
                    }
                })
                .map(PlaceResponse::getPlaces);

    }


    private static class PlaceResponse {
        @JsonProperty("response")
        private ResponseBody responseBody;

        public List<Place> getPlaces() {
            return responseBody.body.items;
        }
    }

    private static class ResponseBody {
        @JsonProperty("body")
        private Body body;
    }

    private static class Body {
        @JsonProperty("items")
        private List<Place> items;
    }
}