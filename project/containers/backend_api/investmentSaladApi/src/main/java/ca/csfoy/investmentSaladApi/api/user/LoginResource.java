package ca.csfoy.investmentSaladApi.api.user;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@RequestMapping(value = LoginResource.RESOURCE_PATH, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
@ResponseBody
public interface LoginResource {

	String RESOURCE_PATH = UserResource.RESOURCE_PATH + "/login";

	@PostMapping
	TokenDto loginUser(@RequestBody UserCredentialsDto user);
	
}
