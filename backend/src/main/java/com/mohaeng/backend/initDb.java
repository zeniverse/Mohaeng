//package com.mohaeng.backend;
//
//import com.mohaeng.backend.place.dto.request.PlaceCreate;
//import com.mohaeng.backend.place.entity.Category;
//import com.mohaeng.backend.place.service.PlaceService;
//import jakarta.annotation.PostConstruct;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Component;
//import org.springframework.transaction.annotation.Transactional;
//
//@Component
//@RequiredArgsConstructor
//public class initDb {
//
//    private final PlaceService placeService;
//    private final InitService initService;
//
//    @PostConstruct
//    public void init() {
//        initService.dbInit1();
//    }
//
//    static class InitService {
//        PlaceCreate placeCreate1 = PlaceCreate.builder()
//                .name("경복궁")
//                .address("서울시")
//                .email("binaryhong@gmail.com")
//                .category(Category.place)
//                .menu("성인 1만원, 소인 5천원")
//                .availableTime("9:00 ~ 18:00")
//                .latitude("latitude xxx")
//                .longitude("longitude xxx")
//                .build();
//
//        placeService.write(placeCreate1);
//        PlaceCreate placeCreate2 = PlaceCreate.builder()
//                .name("카카오")
//                .address("성남시")
//                .email("binaryhong@kakao.com")
//                .category(Category.place)
//                .menu("성인 10만원, 소인 5만원")
//                .availableTime("9:00 ~ 18:00")
//                .latitude("latitude xxx")
//                .longitude("longitude xxx")
//                .build();
//
//
//        placeService.write(placeCreate2);
//    }
//
//
//    }
//}
