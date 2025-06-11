package mb.project.beetracker_backend.service;

import mb.project.beetracker_backend.model.Offer;
import mb.project.beetracker_backend.repository.OfferRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OfferServices {

    private final OfferRepo repository;
    private final Validate validate;

    public OfferServices(OfferRepo repository, Validate validate) {
        this.repository = repository;
        this.validate = validate;
    }

    public void addOffer(Offer offer) {
        if (validate.validate(offer)) {
            repository.save(offer);
            return;
        }
        throw new IllegalStateException("Dados Inválidos, por favor, verifique as informações novamente");
    }

    public List<Offer> retrieveData() {
        return repository.findAll();
    }

    @Transactional
    public Offer updateOffer(Offer offer) {

        Offer updatedOffer = repository.findById(offer.getId())
                .orElseThrow(() -> new IllegalStateException("Oferta não encontrada para o ID: " + offer.getId()));


        updatedOffer.setTitle(offer.getTitle());
        updatedOffer.setCompany(offer.getCompany());
        updatedOffer.setStatus(offer.getStatus());

        if (validate.validate(updatedOffer))
            return repository.save(updatedOffer);

        else
            throw new IllegalStateException("Dados Inválidos, por favor, verifique as informações novamente");
    }

    public void deleteOffer(Integer id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return;
        }
        throw new IllegalStateException("Oferta não encontrada, verifique o ID: " + id + " e tente novamente.");
    }
}
