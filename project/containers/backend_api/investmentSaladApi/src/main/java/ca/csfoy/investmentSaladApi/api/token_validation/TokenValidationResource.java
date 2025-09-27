package ca.csfoy.investmentSaladApi.api.token_validation;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;


@RequestMapping(value = TokenValidationResource.RESOURCE_PATH, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
public interface TokenValidationResource {
	String RESOURCE_PATH = "/validateToken";

	//GET
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	void validateToken();
}