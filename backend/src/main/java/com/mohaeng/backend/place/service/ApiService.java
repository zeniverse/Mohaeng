//package com.mohaeng.backend.place.service;
//
//import javax.xml.parsers.DocumentBuilderFactory;
//import javax.xml.parsers.DocumentBuilder;
//
//import com.mohaeng.backend.place.domain.Place;
//import com.mohaeng.backend.place.dto.response.PlaceResponseDto;
//import com.mohaeng.backend.place.repository.PlaceRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.w3c.dom.Document;
//import org.w3c.dom.Element;
//import org.w3c.dom.Node;
//import org.w3c.dom.NodeList;
//import org.xml.sax.InputSource;
//
//import java.net.HttpURLConnection;
//import java.net.URL;
//import java.io.BufferedReader;
//import java.io.InputStreamReader;
//import java.io.StringReader;
//import java.util.ArrayList;
//import java.util.List;
//
//
//@Slf4j
//@Service
//@RequiredArgsConstructor
//public class ApiService {
//
//    private static final String SERVICE_KEY = "dpTiMvKcFS8NVB1nRTahfmZTMala0uVdt7qu81eNIxznRol2OcYVskpBXHGIfAEIQf1eY2b%2FjMA4uu5ztw8heg%3D%3D";
//    private static final String BASE_URL = "https://apis.data.go.kr/B551011/KorService/areaBasedList";
//
//    private final PlaceRepository placeRepository;
//    private static final Logger logger = LoggerFactory.getLogger("ApiService");
//
//
//    public List<Place> getTouristAttractions(int numOfRows, int pageNo, int contentTypeId, int areaCode) {
//        List<Place> places = new ArrayList<>();
//
//        try {
//            String urlString = String.format("%s?serviceKey=%s&pageNo=%d&numOfRows=%d&MobileApp=AppTest&MobileOS=ETC&arrange=A&contentTypeId=%d", BASE_URL, SERVICE_KEY, pageNo, numOfRows, contentTypeId);
//            URL url = new URL(urlString);
//            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
//            connection.setRequestMethod("GET");
//
//            BufferedReader in = new BufferedReader(
//                    new InputStreamReader(connection.getInputStream()));
//            String inputLine;
//            StringBuilder content = new StringBuilder();
//            while ((inputLine = in.readLine()) != null) {
//                content.append(inputLine);
//            }
//            in.close();
//
//            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
//            DocumentBuilder builder = factory.newDocumentBuilder();
//            Document doc = builder.parse(new InputSource(new StringReader(content.toString())));
//
//            doc.getDocumentElement().normalize();
//            NodeList nodeList = doc.getElementsByTagName("item");
//
//            for (int i = 0; i < nodeList.getLength(); i++) {
//                Node node = nodeList.item(i);
//                if (node.getNodeType() == Node.ELEMENT_NODE) {
//                    Element element = (Element) node;
//                    String addr1 = element.getElementsByTagName("addr1").item(0).getTextContent();
//                    String areacode = element.getElementsByTagName("areacode").item(0).getTextContent();
//                    String firstimage = element.getElementsByTagName("firstimage").item(0).getTextContent();
//                    String firstimage2 = element.getElementsByTagName("firstimage2").item(0).getTextContent();
//                    String mapx = element.getElementsByTagName("mapx").item(0).getTextContent();
//                    String mapy = element.getElementsByTagName("mapy").item(0).getTextContent();
//                    String sigungucode = element.getElementsByTagName("sigungucode").item(0).getTextContent();
//                    String title = element.getElementsByTagName("title").item(0).getTextContent();
////                    Place place = new Place(addr1, areacode, firstimage, firstimage2, mapx, mapy, sigungucode, title);
////                    places.add(place);
//                }
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        placeRepository.saveAll(places);
//        logger.info("Retrieved places: {}", places);
//        logger.info(places.size() + "개 저장 완료");
//        return places;
//    }
//}
//
