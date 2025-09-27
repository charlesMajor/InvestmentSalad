package ca.csfoy.investmentSaladApi.api.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@RequestMapping(value = UserResource.RESOURCE_PATH, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
public interface UserResource {

	String RESOURCE_PATH = "/users";
	String PATH_PARAM_ID = "id";
	String PATH_WITH_ID = "/{" + PATH_PARAM_ID + "}";
	String PATH_WITH_INFO = "infos" + PATH_WITH_ID;
	String PATH_WITH_PASSWD = "password" + PATH_WITH_ID;

	// POST
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	void createUser(@RequestBody UserDto user);

	// GET
	@GetMapping(PATH_WITH_ID)
	LightUserDto getUser(@PathVariable(PATH_PARAM_ID) String id);

	// PUT
	@PutMapping(PATH_WITH_PASSWD)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	void modifyPassword(@PathVariable(PATH_PARAM_ID) String userId, @RequestBody FullUserDto user);

	@PutMapping(PATH_WITH_INFO)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	void modifyUserInfos(@PathVariable(PATH_PARAM_ID) String userId, @RequestBody LightUserDto user);
}
