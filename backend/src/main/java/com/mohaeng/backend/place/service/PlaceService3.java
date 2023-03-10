package com.mohaeng.backend.place.service;

public class PlaceService3 {

    //    public String getOverview(String contentId) throws IOException, ParserConfigurationException, SAXException {
//        long startTime = System.nanoTime();
//        String url = BASE_URL2.replace("126508", contentId);
//
//        HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
//        connection.setRequestMethod("GET");
//
//        InputStream responseStream = connection.getInputStream();
//
//        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
//        DocumentBuilder db = dbf.newDocumentBuilder();
//        Document doc = db.parse(responseStream);
//
//        NodeList nodeList = doc.getElementsByTagName("item");
//
//        if (nodeList.getLength() == 0) {
//            return "";
//        }
//
//        Node node = nodeList.item(0);
//
//        if (node.getNodeType() == Node.ELEMENT_NODE) {
//            Element element = (Element) node;
//            String overview = element.getElementsByTagName("overview").item(0).getTextContent();
//            if (overview.length() > 100) {
//                overview = overview.substring(0, 100);
//            }
//            long endTime = System.nanoTime();
//            long elapsedTime = endTime - startTime;
//            System.out.println("getOverview execution time: " + elapsedTime + " nanoseconds");
//            return overview; // Return the truncated overview string
//        }
//        long endTime = System.nanoTime();
//        long elapsedTime = endTime - startTime;
//        System.out.println("getOverview execution time: " + elapsedTime + " nanoseconds");
//        return "";
//    }

    /*
     *
     */


//    public String getOverview(String contentId) throws IOException, ParserConfigurationException, SAXException {
//        String url = BASE_URL2.replace("126508", contentId);
//
//        HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
//        connection.setRequestMethod("GET");
//
//        InputStream responseStream = connection.getInputStream();
//
//        // Create a SAX parser
//        SAXParserFactory saxParserFactory = SAXParserFactory.newInstance();
//        SAXParser saxParser = saxParserFactory.newSAXParser();
//
//        // Create a handler to process the XML events
//        OverviewHandler overviewHandler = new OverviewHandler();
//
//        // Parse the XML document using the SAX parser and the handler
//        saxParser.parse(responseStream, overviewHandler);
//
//        // Get the overview from the handler
//        String overview = overviewHandler.getOverview();
//
//        return overview;
//    }
//
//    // Custom SAX handler for the overview element
//    private static class OverviewHandler extends DefaultHandler {
//        private final StringBuilder builder = new StringBuilder();
//        private boolean insideOverview = false;
//        private int charCount = 0;
//
//        // Handle the start of an XML element
//        @Override
//        public void startElement(String uri, String localName, String qName, Attributes attributes) {
//            if ("overview".equals(qName)) {
//                insideOverview = true;
//            }
//        }
//
//        // Handle the end of an XML element
//        @Override
//        public void endElement(String uri, String localName, String qName) {
//            if ("overview".equals(qName)) {
//                insideOverview = false;
//            }
//        }
//
//        // Handle XML character data
//        @Override
//        public void characters(char[] ch, int start, int length) {
//            if (insideOverview && charCount < 100) {
//                int charsToAppend = Math.min(length, 100 - charCount);
//                builder.append(ch, start, charsToAppend);
//                charCount += charsToAppend;
//            }
//        }
//
//        // Get the extracted overview
//        public String getOverview() {
//            return builder.toString();
//        }
//    }
}
