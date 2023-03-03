package com.mohaeng.backend.place.repository;

import com.mohaeng.backend.place.domain.AddPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddPlaceRepository extends JpaRepository<AddPlace, Long> {
}
