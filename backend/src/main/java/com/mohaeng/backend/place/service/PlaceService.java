package com.mohaeng.backend.place.service;

import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.exception.PlaceNotFoundException;
import com.mohaeng.backend.place.repository.PlaceRepository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class PlaceService {

    private final PlaceRepository placeRepository;

    private static final String API_KEY = "dpTiMvKcFS8NVB1nRTahfmZTMala0uVdt7qu81eNIxznRol2OcYVskpBXHGIfAEIQf1eY2b%2FjMA4uu5ztw8heg%3D%3D";
    private static final String BASE_URL = "https://apis.data.go.kr/B551011/KorService/areaBasedList?serviceKey=" + API_KEY + "&pageNo=1&numOfRows=100&MobileApp=AppTest&MobileOS=ETC&arrange=A&contentTypeId=12";

    @PostConstruct
    public void init() throws IOException, ParserConfigurationException, SAXException {
        List<Place> places = getPlaces();

        placeRepository.saveAll(places);
        placeRepository.flush();
    }



//    @Scheduled(cron = "0 0 5 * * ?") #TODO
    public List<Place> getPlaces() throws IOException, ParserConfigurationException, SAXException {
        URL url = new URL(BASE_URL);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");

        InputStream responseStream = connection.getInputStream();

        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        DocumentBuilder db = dbf.newDocumentBuilder();
        Document doc = db.parse(responseStream);

        List<Place> places = new ArrayList<>();
        NodeList nodeList = doc.getElementsByTagName("item");

        for (int i = 0; i < nodeList.getLength(); i++) {
            Node node = nodeList.item(i);

            if (node.getNodeType() == Node.ELEMENT_NODE) {
                Element element = (Element) node;

                String addr1 = element.getElementsByTagName("addr1").item(0).getTextContent();
                String areacode = element.getElementsByTagName("areacode").item(0).getTextContent();
                String firstimage = element.getElementsByTagName("firstimage").item(0).getTextContent();
                String firstimage2 = element.getElementsByTagName("firstimage2").item(0).getTextContent();
                String mapx = element.getElementsByTagName("mapx").item(0).getTextContent();
                String mapy = element.getElementsByTagName("mapy").item(0).getTextContent();
                String sigungucode = element.getElementsByTagName("sigungucode").item(0).getTextContent();
                String title = element.getElementsByTagName("title").item(0).getTextContent();

                Place place = new Place((long) (i + 1), addr1, areacode, firstimage, firstimage2, mapx, mapy, sigungucode, title);
                places.add(place);
            }
        }
        if (places.isEmpty()) {
            throw new PlaceNotFoundException("No place found.");
        }
        return places;
    }

    public List<Place> getPlacesByAddr1(String addr1) {
        String searchValue = addr1.substring(0, 2); // get the first two letters of addr1
        return placeRepository.findByAddr1ContainingIgnoreCase(searchValue);
    }

}

