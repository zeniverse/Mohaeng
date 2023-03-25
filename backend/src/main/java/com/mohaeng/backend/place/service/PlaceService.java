package com.mohaeng.backend.place.service;

import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.dto.request.PlaceDTO;
import com.mohaeng.backend.place.exception.PlaceNotFoundException;
import com.mohaeng.backend.place.repository.PlaceRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StopWatch;
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
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class PlaceService {

    private final PlaceRepository placeRepository;

    //    private static final String API_KEY = "dpTiMvKcFS8NVB1nRTahfmZTMala0uVdt7qu81eNIxznRol2OcYVskpBXHGIfAEIQf1eY2b%2FjMA4uu5ztw8heg%3D%3D";
//    private static final String API_KEY = "YDqng1hgvEKmXZVWZANhmv%2BKe1qPepQj%2BIxBkqBQTUyLG3XCiAXQtMzCMbNppL8OnNL8sPqvbxybFGIxrRpPnA%3D%3D"; // 승구님 키
    private static final String API_KEY = "LEZGPi1UafewX40Vl5Yx8J4xwPliJNjaGSVMR8tOLVC7BTWBJMiQLb2gl12QNctUovP3VVtG6qPnrWteZGePOQ%3D%3D"; // 지혜님 키
//    private static final String API_KEY = "DZSCfwbqP6kQHPDOAlDjWAhu63OBBX4BjGKHVNB2ocF6YW6Xpd6Do1IhFCg%2B1TfYiqZFngr57pUk3Tvs%2FYUukw%3D%3D"; // 지혜님 키

    private static final String BASE_URL = "https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=" + API_KEY + "&pageNo=1&numOfRows=12100&MobileApp=AppTest&_type=xml&MobileOS=ETC&arrange=A&contentTypeId=12";
    private static final String BASE_URL2 = "https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=" + API_KEY + "&MobileOS=ETC&MobileApp=AppTest&_type=xml&contentId=&contentTypeId=12&&overviewYN=Y";


    @PostConstruct
    public void init() throws IOException, ParserConfigurationException, SAXException {
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        List<Place> places = getPlaces(); // 최초생성
//        List<Place> places = new ArrayList<>(); // overview update
//        List<Place> updatePlaces = placeRepository.findAll();
//        for (Place place : updatePlaces) {
//            if (place.getOverview().isEmpty()) {
//                updateOverview(place.getContentid());
//                places.add(place);
//            }
//        }
        stopWatch.stop();
        long totalTimeMillis = stopWatch.getTotalTimeMillis();
        System.out.println("total time : " + totalTimeMillis);
        placeRepository.saveAll(places);
        System.out.println("total time : " + totalTimeMillis);
        placeRepository.flush();
    }

    //    @Scheduled(cron = "0 0 5 * * ?") #TODO
    public List<Place> getPlaces() throws IOException, ParserConfigurationException, SAXException {
        Document doc = getXmlDocument(BASE_URL);
        List<Place> places = new ArrayList<>();
        NodeList nodeList = doc.getElementsByTagName("item");
        for (int i = 0; i < nodeList.getLength(); i++) {
            Node node = nodeList.item(i);
            if (node.getNodeType() == Node.ELEMENT_NODE) {
                Element element = (Element) node;
                String name = element.getElementsByTagName("title").item(0).getTextContent();
                String address = element.getElementsByTagName("addr1").item(0).getTextContent();
                String addr2 = element.getElementsByTagName("addr2").item(0).getTextContent();
                String areaCode = element.getElementsByTagName("areacode").item(0).getTextContent();
                String firstImage = element.getElementsByTagName("firstimage").item(0).getTextContent();
                String firstImage2 = element.getElementsByTagName("firstimage2").item(0).getTextContent();
                String mapX = element.getElementsByTagName("mapx").item(0).getTextContent();
                String mapY = element.getElementsByTagName("mapy").item(0).getTextContent();
                String sigunguCode = element.getElementsByTagName("sigungucode").item(0).getTextContent();
                String contentId = element.getElementsByTagName("contentid").item(0).getTextContent();
//                String overview = "";
//                String overview = getOverview(contentid);
                if (firstImage == null || firstImage.isEmpty()) {
                    firstImage = "https://lh3.google.com/u/1/d/1ic2_89fYMLjZMCN0BoEirSEai_FarJvP=w2560-h1370-iv1";
                }

                if (address == null || address.isEmpty()) {
                    address = addr2;
                }
                Place place = new Place(name, address, areaCode, sigunguCode, contentId, firstImage, firstImage2, mapX, mapY);
                places.add(place);
            }
        }
        if (places.isEmpty()) {
            throw new PlaceNotFoundException("No place found.");
        }
        return places;
    }

    private String getOverview(String contentId) {
        String urlStr = BASE_URL2.replace("contentId=", "contentId=" + contentId);
        Document doc;
        NodeList nodeList;
        String overviewText = "";
        String overview = "";
        List<String> excludedIds = Arrays.asList("2763773", "2784642", "2946071", "2930677", "2891338",
                "2725011", "2891349", "2777911", "2750886", "2946230",
                "2760807", "2930681");

        try {
            doc = getXmlDocument(urlStr);
            nodeList = doc.getElementsByTagName("item");
            if (nodeList.getLength() > 0) {
                Node node = nodeList.item(0);
                if (node.getNodeType() == Node.ELEMENT_NODE) {
                    Element element = (Element) node;
                    overviewText = element.getElementsByTagName("overview").item(0).getTextContent();
                }
            }
        } catch (Exception e) {
            log.info("Exception:", e);
            // retry
        }
        return overviewText;
    }

//    @Transactional
//    public void updateOverview(String contentid) {
//        String overview = getOverview(contentid);
//        // Update database using JDBC and DataSource
//        try (Connection conn = dataSource.getConnection()) {
//            String sql = "UPDATE Place SET overview = ? WHERE contentid = ?";
//            PreparedStatement pstmt = conn.prepareStatement(sql);
//            pstmt.setString(1, overview);
//            pstmt.setString(2, contentid);
//            pstmt.executeUpdate();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }

    private Document getXmlDocument(String urlStr) throws IOException, ParserConfigurationException, SAXException {
        URL url = new URL(urlStr);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");

        InputStream responseStream = connection.getInputStream();

        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        DocumentBuilder db = dbf.newDocumentBuilder();

        return db.parse(responseStream);
    }

    public List<Place> getPlacesAll() { // TODO: 정렬(페이지네이션 구현해야함)
        return placeRepository.findAll();
    }

    public List<Place> getPlacesByAddr1(String address) {
        String searchValue = address.substring(0, 2); // get the first two letters of address
        return placeRepository.findByAddr1ContainingIgnoreCase(searchValue);
    }

    public Place getPlace(String contentId) throws IOException, ParserConfigurationException, SAXException {
        List<Place> places = getPlaces();
        for (Place place : places) {
            if (place.getContentId().equals(contentId)) {
                return place;
            }
        }
        return null;
    }

    public PlaceDTO toPlaceDTO(Place place) {
        return PlaceDTO.builder()
                .name(place.getName())
                .addr1(place.getAddr1())
                .areaCode(place.getAreaCode())
                .sigunguCode(place.getSigunguCode())
                .firstIimage(place.getFirstImage())
                .firstImage2(place.getFirstImage2())
                .mapX(place.getMapX())
                .mapY(place.getMapY())
                .contentId(place.getContentId())
                .build();
    }

    public List<String> getPlaceOverview(String placeName) throws IOException, ParserConfigurationException, SAXException {
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();

        List<Place> places = getPlaces();
        List<String> overviews = new ArrayList<>();
        for (Place place : places) {
            if (place.getName().contains(placeName)) {
                String overview = getOverview(place.getContentId());
                overview = overview.replaceAll("<br>|<br >|< br>|<br />|</br>|<strong>|</ strong>", "");
                overviews.add(overview);
            }
        }
        stopWatch.stop();
        long totalTimeMillis = stopWatch.getTotalTimeMillis();
        System.out.println("total time : " + totalTimeMillis);
        return overviews;
    }

    public List<Place> filterPlaces(List<Place> places, String areaCode) {
        if ("ALL".equals(areaCode)) {
            return places;
        }
        return places.stream()
                .filter(place -> place.getAreaCode().equals(areaCode))
                .collect(Collectors.toList());
    }
}

