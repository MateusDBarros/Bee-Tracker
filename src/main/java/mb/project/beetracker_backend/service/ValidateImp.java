package mb.project.beetracker_backend.service;

import mb.project.beetracker_backend.model.Offer;
import org.springframework.stereotype.Component;

@Component
public class ValidateImp implements Validate{

    @Override
    public boolean validate(Offer offer) {
        if (offer.getTitle() == null || offer.getTitle().isBlank() || offer.getCompany() == null || offer.getCompany().isBlank() || offer.getStatus() == null)
            return false;

        return true;
    }
}
