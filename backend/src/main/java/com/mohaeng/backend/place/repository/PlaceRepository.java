package com.mohaeng.backend.place.repository;

import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.dto.FindAllPlacesDto;
import com.mohaeng.backend.place.dto.PlaceSearchDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long>, PlaceRepositoryCustom{
    List<Place> findByAddressContainingIgnoreCase(String searchValue);
    Page<PlaceSearchDto> findByNameContainingOrAddressContaining(String name, String address);
    Page<PlaceSearchDto> findByNameContaining(String name);
    Page<FindAllPlacesDto> findByAreaCodeEquals(String areaCode, Pageable pageable);
}
