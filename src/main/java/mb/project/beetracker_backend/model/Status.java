package mb.project.beetracker_backend.model;

public enum Status {

    ANALISE ("Em Análise"),
    ENTREVISTA ("Entrevista"),
    OFERTA ("Oferta"),
    REJEITADO ("Rejeitado"),
    FINALIZADO ("Finalizado");

    private String description;

    Status (String description) {
        this.description = description;
    }
}
