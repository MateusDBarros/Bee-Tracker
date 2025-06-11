package mb.project.beetracker_backend.controller;

import mb.project.beetracker_backend.model.Offer;
import mb.project.beetracker_backend.service.OfferServices;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/candidaturas")
@CrossOrigin(origins = "http://localhost:63343")
public class OfferController {

    private final OfferServices services;

    public OfferController(OfferServices services) {
        this.services = services;
    }

    @PostMapping
    public ResponseEntity<Offer> addOffer(@RequestBody Offer offer) {
        services.addOffer(offer);
        return ResponseEntity.status(HttpStatus.CREATED).body(offer);
    }

    @GetMapping
    public ResponseEntity<List<Offer>> retrieveData() {
        List<Offer> data = services.retrieveData();
        return ResponseEntity.status(HttpStatus.OK).body(data);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Offer> updateOffer (@PathVariable Integer id, @RequestBody Offer offer) {
        offer.setId(id);
        Offer updateOffer = services.updateOffer(offer);
        return ResponseEntity.status(HttpStatus.OK).body(updateOffer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOffer(@PathVariable Integer id) {
        services.deleteOffer(id);
        return ResponseEntity.status(HttpStatus.OK).body("Requisição aceita, objeto deletado com sucesso!");
    }
}
