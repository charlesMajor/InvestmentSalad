package ca.csfoy.investmentSaladApi;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.client.RestTemplate;


@Configuration
@ComponentScan({ "ca.csfoy.investmentSaladApi" })
@EnableJpaAuditing
@EnableJpaRepositories({ "ca.csfoy.investmentSaladApi.infra" })
public class MainConfig {
	
	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

}