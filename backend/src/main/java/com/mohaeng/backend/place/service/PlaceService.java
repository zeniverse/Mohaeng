package com.mohaeng.backend.place.service;

import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.exception.PlaceNotFoundException;
import com.mohaeng.backend.place.repository.PlaceRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.Attributes;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import javax.xml.parsers.*;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class PlaceService {

    private final PlaceRepository placeRepository;

    private static final String API_KEY = "dpTiMvKcFS8NVB1nRTahfmZTMala0uVdt7qu81eNIxznRol2OcYVskpBXHGIfAEIQf1eY2b%2FjMA4uu5ztw8heg%3D%3D";
    private static final String BASE_URL = "https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=" + API_KEY + "&pageNo=1&numOfRows=300&MobileApp=AppTest&_type=xml&MobileOS=ETC&arrange=A&contentTypeId=12";
    private static final String BASE_URL2 = "https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=" + API_KEY + "&MobileOS=ETC&MobileApp=AppTest&_type=xml&contentId=126508&contentTypeId=12&&overviewYN=Y";

//    https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=126508&contentTypeId=12&&overviewYN=Y

    @PostConstruct
    public void init() throws IOException, ParserConfigurationException, SAXException {
        List<Place> places = getPlaces();

        placeRepository.saveAll(places);
        placeRepository.flush();
    }
//    public List<Place> getPlaces() throws IOException, ParserConfigurationException, SAXException {
//        List<Place> places = new ArrayList<>();
//        places.addAll(getPlaces1());
//        places.addAll(getPlaces2());
//        return places;
//    }


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

            String name = element.getElementsByTagName("title").item(0).getTextContent();
            String addr1 = element.getElementsByTagName("addr1").item(0).getTextContent();
            String areacode = element.getElementsByTagName("areacode").item(0).getTextContent();
            String firstimage = element.getElementsByTagName("firstimage").item(0).getTextContent();
            String firstimage2 = element.getElementsByTagName("firstimage2").item(0).getTextContent();
            String mapx = element.getElementsByTagName("mapx").item(0).getTextContent();
            String mapy = element.getElementsByTagName("mapy").item(0).getTextContent();
            String sigungucode = element.getElementsByTagName("sigungucode").item(0).getTextContent();
            String contentid = element.getElementsByTagName("contentid").item(0).getTextContent();

            String overview = getOverview(contentid);

            Place place = new Place((long) (i + 1), name, addr1, areacode, sigungucode, firstimage, firstimage2, mapx, mapy, contentid, overview);
            places.add(place);
        }
    }
    if (places.isEmpty()) {
        throw new PlaceNotFoundException("No place found.");
    }
    return places;
}

    private static final int BUFFER_SIZE = 8192;
    private static final PoolingHttpClientConnectionManager connManager = new PoolingHttpClientConnectionManager();
    private final Map<String, String> cache = new HashMap<>();

//    public String getOverview(String contentId) throws IOException, ParserConfigurationException, SAXException {
//        String url = BASE_URL2.replace("126508", contentId);
//
//        CloseableHttpClient httpClient = HttpClients.custom().setConnectionManager(connManager).build();
//        HttpGet httpGet = new HttpGet(url);
//        CloseableHttpResponse response = httpClient.execute(httpGet);
//
//        try {
//            HttpEntity entity = response.getEntity();
//            InputStream responseStream = entity.getContent();
//            BufferedReader reader = new BufferedReader(new InputStreamReader(responseStream, StandardCharsets.UTF_8));
//
//            StringBuilder stringBuilder = new StringBuilder();
//            char[] buffer = new char[BUFFER_SIZE];
//            int bytesRead;
//            while ((bytesRead = reader.read(buffer, 0, BUFFER_SIZE)) != -1) {
//                stringBuilder.append(buffer, 0, bytesRead);
//            }
//
//            String xml = stringBuilder.toString();
//
//            SAXParserFactory saxParserFactory = SAXParserFactory.newInstance();
//            SAXParser saxParser = saxParserFactory.newSAXParser();
//            OverviewHandler overviewHandler = new OverviewHandler();
//            saxParser.parse(new InputSource(new StringReader(xml)), overviewHandler);
//
//            return overviewHandler.getOverview();
//        } finally {
//            response.close();
//        }
//    }
public String getOverview(String contentId) throws IOException, ParserConfigurationException, SAXException {
    if (cache.containsKey(contentId)) {
        return cache.get(contentId);
    }

    String url = BASE_URL2.replace("126508", contentId);

    CloseableHttpClient httpClient = HttpClients.custom().setConnectionManager(connManager).build();
    HttpGet httpGet = new HttpGet(url);
    CloseableHttpResponse response = httpClient.execute(httpGet);

    try {
        HttpEntity entity = response.getEntity();
        InputStream responseStream = entity.getContent();
        BufferedReader reader = new BufferedReader(new InputStreamReader(responseStream, StandardCharsets.UTF_8));

        StringBuilder stringBuilder = new StringBuilder();
        char[] buffer = new char[BUFFER_SIZE];
        int bytesRead;
        while ((bytesRead = reader.read(buffer, 0, BUFFER_SIZE)) != -1) {
            stringBuilder.append(buffer, 0, bytesRead);
        }

        String xml = stringBuilder.toString();

        SAXParserFactory saxParserFactory = SAXParserFactory.newInstance();
        SAXParser saxParser = saxParserFactory.newSAXParser();
        OverviewHandler overviewHandler = new OverviewHandler();
        saxParser.parse(new InputSource(new StringReader(xml)), overviewHandler);

        String overview = overviewHandler.getOverview();
        cache.put(contentId, overview);
        return overview;
    } finally {
        response.close();
    }
}


    private static class OverviewHandler extends DefaultHandler {
        private final StringBuilder sb = new StringBuilder();
        private boolean isInOverviewTag = false;

        @Override
        public void startElement(String uri, String localName, String qName, Attributes attributes) {
            if (qName.equalsIgnoreCase("overview")) {
                isInOverviewTag = true;
            }
        }

        @Override
        public void endElement(String uri, String localName, String qName) {
            if (qName.equalsIgnoreCase("overview")) {
                isInOverviewTag = false;
            }
        }

        @Override
        public void characters(char[] ch, int start, int length) {
            if (isInOverviewTag) {
                sb.append(ch, start, length);
            }
        }

        public String getOverview() {
            return sb.substring(0, Math.min(sb.length(), 50));
        }
    }


   public List<Place> getPlacesByAddr1(String addr1) {
        String searchValue = addr1.substring(0, 2); // get the first two letters of addr1
        return placeRepository.findByAddr1ContainingIgnoreCase(searchValue);
    }

}

