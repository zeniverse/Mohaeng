package com.mohaeng.backend.place.repository;

import com.mohaeng.backend.place.domain.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
    List<Place> findByAddr1ContainingIgnoreCase(String searchValue);
    List<Place> findByNameContainingOrAddr1Containing(String name, String address);
    List<Place> findByNameContaining(String name);
}
