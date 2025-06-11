package mb.project.beetracker_backend.service;
import mb.project.beetracker_backend.model.Offer;
import org.springframework.stereotype.Component;

public interface Validate {
    boolean validate(Offer offer);
}
