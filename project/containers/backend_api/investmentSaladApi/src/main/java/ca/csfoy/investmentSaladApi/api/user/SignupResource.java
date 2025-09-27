package ca.csfoy.investmentSaladApi.api.user;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@RequestMapping(value = SignupResource.RESOURCE_PATH, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
@ResponseBody
public interface SignupResource {

	String RESOURCE_PATH = UserResource.RESOURCE_PATH + "/signup";

	//POST
	@PostMapping
	TokenDto signUpUser(@RequestBody UserDto user);
	
}