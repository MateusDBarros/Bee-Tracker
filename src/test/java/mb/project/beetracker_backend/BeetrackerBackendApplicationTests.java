package mb.project.beetracker_backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles; // Importe esta anotação

@SpringBootTest
@ActiveProfiles("test") // Ativa o perfil 'test' para este teste
class BeetrackerBackendApplicationTests {

	@Test
	void contextLoads() {
		// Seu teste de carregamento de contexto
	}
}