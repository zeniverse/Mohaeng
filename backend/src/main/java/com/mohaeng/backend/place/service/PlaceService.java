package com.mohaeng.backend.place.service;

import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.exception.PlaceNotFoundException;
import com.mohaeng.backend.place.repository.PlaceRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.springframework.stereotype.Service;
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
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
@RequiredArgsConstructor
public class PlaceService {

    private final PlaceRepository placeRepository;

//    private static final String API_KEY = "dpTiMvKcFS8NVB1nRTahfmZTMala0uVdt7qu81eNIxznRol2OcYVskpBXHGIfAEIQf1eY2b%2FjMA4uu5ztw8heg%3D%3D";
    private static final String API_KEY = "YDqng1hgvEKmXZVWZANhmv%2BKe1qPepQj%2BIxBkqBQTUyLG3XCiAXQtMzCMbNppL8OnNL8sPqvbxybFGIxrRpPnA%3D%3D"; // 승구님 키
//    private static final String API_KEY = "LEZGPi1UafewX40Vl5Yx8J4xwPliJNjaGSVMR8tOLVC7BTWBJMiQLb2gl12QNctUovP3VVtG6qPnrWteZGePOQ%3D%3D"; // 지혜님 키
    private static final String BASE_URL = "https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=" + API_KEY + "&pageNo=1&numOfRows=100&MobileApp=AppTest&_type=xml&MobileOS=ETC&arrange=A&contentTypeId=12";
    private static final String BASE_URL2 = "https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=" + API_KEY + "&MobileOS=ETC&MobileApp=AppTest&_type=xml&contentId=&contentTypeId=12&&overviewYN=Y";

    @PostConstruct
    public void init() throws IOException, ParserConfigurationException, SAXException {
        List<Place> places = getPlaces();

        placeRepository.saveAll(places);
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
            String addr1 = element.getElementsByTagName("addr1").item(0).getTextContent();
            String addr2 = element.getElementsByTagName("addr2").item(0).getTextContent();
            String areacode = element.getElementsByTagName("areacode").item(0).getTextContent();
            String firstimage = element.getElementsByTagName("firstimage").item(0).getTextContent();
            String firstimage2 = element.getElementsByTagName("firstimage2").item(0).getTextContent();
            String mapx = element.getElementsByTagName("mapx").item(0).getTextContent();
            String mapy = element.getElementsByTagName("mapy").item(0).getTextContent();
            String sigungucode = element.getElementsByTagName("sigungucode").item(0).getTextContent();
            String contentid = element.getElementsByTagName("contentid").item(0).getTextContent();
            String overview = getOverview(contentid);

            if (addr1 == null || addr1.isEmpty()) {
                addr1 = addr2;
            }

            Place place = new Place((long) (i + 1), name, addr1, areacode, firstimage, firstimage2, mapx, mapy, sigungucode, contentid, overview);
            places.add(place);
        }
    }
    if (places.isEmpty()) {
        throw new PlaceNotFoundException("No place found.");
    }
    return places;
}

    private String getOverview(String contentid) throws IOException, ParserConfigurationException, SAXException {
        String urlStr = BASE_URL2.replace("contentId=", "contentId=" + contentid);
        Document doc = getXmlDocument(urlStr);

        NodeList nodeList = doc.getElementsByTagName("item");
        String overview = "";

        for (int i = 0; i < nodeList.getLength(); i++) {
            Node node = nodeList.item(i);

            if (node.getNodeType() == Node.ELEMENT_NODE) {
                Element element = (Element) node;
                String overviewText = element.getElementsByTagName("overview").item(0).getTextContent();
                overview = overviewText.substring(0, Math.min(overviewText.length(), 150));
            }
        }

        return overview;
    }

    private Document getXmlDocument(String urlStr) throws IOException, ParserConfigurationException, SAXException {
        URL url = new URL(urlStr);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");

        InputStream responseStream = connection.getInputStream();

        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        DocumentBuilder db = dbf.newDocumentBuilder();
        Document doc = db.parse(responseStream);

        return doc;
    }

   public List<Place> getPlacesByAddr1(String addr1) {
        String searchValue = addr1.substring(0, 2); // get the first two letters of addr1
        return placeRepository.findByAddr1ContainingIgnoreCase(searchValue);
    }

}

