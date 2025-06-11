package mb.project.beetracker_backend.repository;

import mb.project.beetracker_backend.model.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferRepo extends JpaRepository<Offer, Integer> {
}
