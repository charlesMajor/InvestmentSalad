package ca.csfoy.investmentSaladApi.controller.tokenValidation;


import org.springframework.web.bind.annotation.RestController;

import ca.csfoy.investmentSaladApi.api.token_validation.TokenValidationResource;

@RestController
public class TokenValidationController implements TokenValidationResource {
	
	
	@Override
	public void validateToken() {
	}

}