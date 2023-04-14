package com.mohaeng.backend.place.repository;

import com.mohaeng.backend.place.domain.Place;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long>, PlaceRepositoryCustom{
    List<Place> findByAddressContainingIgnoreCase(String searchValue);
    Page<Place> findByNameContainingOrAddressContaining(String name, String address, Pageable pageable);
    Page<Place> findByNameContaining(String name, Pageable pageable);
    Page<Place> findByAreaCodeEquals(String areaCode, Pageable pageable);
    List<Place> findByContentId(String contentId);

    @Query(value = "SELECT p.*, AVG(r.rating) as avg_rating " +
            "FROM place p " +
            "JOIN review r ON p.place_id = r.place_id " +
            "GROUP BY p.place_id " +
            "ORDER BY avg_rating DESC " +
            "LIMIT 10", nativeQuery = true)
    List<Place> findTop10ByAvgRating();

    @Query(value = "SELECT p.* " +
            "FROM place p " +
            "WHERE NOT EXISTS (SELECT 1 FROM review r WHERE r.place_id = p.place_id) " +
            "LIMIT 10", nativeQuery = true)
    List<Place> findTop10WithoutReviews();
}
