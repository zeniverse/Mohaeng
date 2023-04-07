package com.mohaeng.backend.place.repository;

import com.mohaeng.backend.place.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
