package com.mohaeng.backend.place.repository;

import com.mohaeng.backend.place.domain.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {

    List<Place> findAllByAddr1Containing(String keyword);
    List<Place> findAllByTitleContaining(String keyword);

    List<Place> findAllByAddr1StartingWithIgnoreCase(String substring);

    List<Place> findByAddr1LikeIgnoreCase(String escapedValue);

    List<Place> findByAddr1ContainingIgnoreCase(String searchValue);

}
