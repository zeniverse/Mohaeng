package com.mohaeng.backend.place.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
public class ApiService {

    @Value("${api.key}") // application.properties에 등록한 API 키 값
    private String apiKey;

    public String getData() throws Exception {
        String url = "http://apis.data.go.kr/B551011/KorService/rest/realtimeTrafficAccident/getRealtimeTrafficAccident?serviceKey=" + apiKey;

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);


        HttpStatusCode statusCode = response.getStatusCode();
        ResponseEntity.status(statusCode);

        if (response.getStatusCode() == HttpStatus.OK) {
            return response.getBody();
        } else {
            throw new Exception("API 호출에 실패하였습니다.");
        }
    }

}
