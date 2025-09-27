package ca.csfoy.investmentSaladApi.controller.user;

import org.springframework.web.bind.annotation.RestController;

import ca.csfoy.investmentSaladApi.api.user.FullUserDto;
import ca.csfoy.investmentSaladApi.api.user.LightUserDto;
import ca.csfoy.investmentSaladApi.api.user.UserDto;
import ca.csfoy.investmentSaladApi.api.user.UserResource;
import ca.csfoy.investmentSaladApi.controller.exception.ErrorMessageLabel;
import ca.csfoy.investmentSaladApi.controller.validations.CustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.ValidatorFactory;
import ca.csfoy.investmentSaladApi.domain.user.CustomUser;
import ca.csfoy.investmentSaladApi.domain.user.UserRepository;

@RestController
public class UserController implements UserResource {

	private final UserRepository repo;
	private final UserConverter converter;
	private final ValidatorFactory validatorFactory;

	public UserController(UserRepository repo, UserConverter converter, ValidatorFactory validatorFactory) {
		this.repo = repo;
		this.converter = converter;
		this.validatorFactory = validatorFactory;
	}

	// CREATE
	@Override
	public void createUser(UserDto user) {
		CustomValidator<UserDto, String> validator = validatorFactory.getUserDtoValidator();
		validator.validate(user);
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		CustomUser converted = converter.fromUserDtoToUser(user);
		repo.create(converted);
	}

	// GET
	@Override
	public LightUserDto getUser(String id) {
		CustomValidator<UserDto, String> validator = validatorFactory.getUserDtoValidator();
		validator.validateId(id);
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		return converter.fromUserToLightDto(repo.getBy(id));
	}

	// UPDATE
	@Override
	public void modifyPassword(String userId, FullUserDto user) {
		CustomValidator<FullUserDto, String> validator = validatorFactory.getFullUserDtoValidator();
		validator.validate(userId, user);
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		repo.save(userId, converter.fromFullDtoUserToUser(user));
	}

	@Override
	public void modifyUserInfos(String userId, LightUserDto user) {
		CustomValidator<LightUserDto, String> validator = validatorFactory.getLightUserDtoValidator();
		validator.validate(userId, user);
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		repo.save(userId, converter.fromLightUserDtoToUser(user));
	}

}
