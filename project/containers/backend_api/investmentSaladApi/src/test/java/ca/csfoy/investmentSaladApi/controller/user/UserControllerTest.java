package ca.csfoy.investmentSaladApi.controller.user;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import ca.csfoy.investmentSaladApi.api.user.FullUserDto;
import ca.csfoy.investmentSaladApi.api.user.LightUserDto;
import ca.csfoy.investmentSaladApi.api.user.UserDto;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.InputValidationException;
import ca.csfoy.investmentSaladApi.controller.validations.ValidatorFactory;
import ca.csfoy.investmentSaladApi.controller.validations.user.FullUserDtoCustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.user.LightUserDtoValidator;
import ca.csfoy.investmentSaladApi.controller.validations.user.UserDtoCustomValidator;
import ca.csfoy.investmentSaladApi.domain.Roles;
import ca.csfoy.investmentSaladApi.domain.user.CustomUser;
import ca.csfoy.investmentSaladApi.domain.user.Role;
import ca.csfoy.investmentSaladApi.domain.user.UserRepository;
import jakarta.validation.Validation;

@Tag("Unit")
@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

	@Mock
	private UserRepository repo;

	@Mock
	private UserConverter converter;

	@Mock
	ValidatorFactory validatorFactory;

	@InjectMocks
	private UserController controller;

	private final String ANY_ID = "e10c429f-5870-429a-bdcb-fbba7f792380";
	private final String ANY_USERNAME = "John";
	private final String ANY_EMAIL = "John.Smith@anymail.com";
	private final String ANY_HASED_PASSWORD = "$2a$10$cC7KDFOWPAJ0pyHaRkLvVu6lVYR2dVTGkfKC/2GvD4SlQLo7spBiS";
	private final String ANY_PASSWORD = "allo123456789!";
	private final String ANY_ROLE_ID = "1";

	private final Role ANY_ROLE = new Role(ANY_ROLE_ID, Roles.ADMIN);
	private final FullUserDto ANY_FULL_USER_DTO = new FullUserDto(ANY_ID, ANY_USERNAME, ANY_EMAIL, ANY_PASSWORD);
	private final UserDto ANY_USER_DTO = new UserDto(ANY_USERNAME, ANY_EMAIL, ANY_PASSWORD);
	private final LightUserDto ANY_LIGHT_USER_DTO = new LightUserDto(ANY_ID, ANY_USERNAME);
	private final CustomUser ANY_CUSTOM_USER = new CustomUser(ANY_ID, ANY_USERNAME, ANY_EMAIL, ANY_HASED_PASSWORD,
			ANY_ROLE);


	// CREATE ///////////////////////////////////////////////
	@Test
	void canCreateUser() {
		// Arrange
		Mockito.when(validatorFactory.getUserDtoValidator())
				.thenReturn(new UserDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		Mockito.when(repo.create(ArgumentMatchers.any())).thenReturn(ANY_CUSTOM_USER);
		Mockito.when(converter.fromUserDtoToUser(ANY_USER_DTO)).thenReturn(ANY_CUSTOM_USER);
		// Act
		// Assert
		Assertions.assertDoesNotThrow(() -> controller.createUser(ANY_USER_DTO));
		Mockito.verify(repo).create(ANY_CUSTOM_USER);
		Mockito.verify(converter).fromUserDtoToUser(ANY_USER_DTO);
	}

	@Test
	void canManageCreateAttemptWithInvalidName() {
		// Arrange
		Mockito.when(validatorFactory.getUserDtoValidator())
				.thenReturn(new UserDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		final UserDto ANY_INVALID_USER = new UserDto("1111111111111111111111111111111", ANY_EMAIL, ANY_PASSWORD);
		// Act
		// Assert
		Assertions.assertThrows(InputValidationException.class, () -> controller.createUser(ANY_INVALID_USER));
	}

	@Test
	void canManageCreateAttemptWithBlankName() {
		// Arrange
		final UserDto ANY_INVALID_USER = new UserDto(" ", ANY_EMAIL, ANY_PASSWORD);
		Mockito.when(validatorFactory.getUserDtoValidator())
				.thenReturn(new UserDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		Assertions.assertThrows(InputValidationException.class, () -> controller.createUser(ANY_INVALID_USER));
	}

	@Test
	void canManageCreateAttemptWithInvalidEmail() {
		// Arrange
		final UserDto ANY_INVALID_USER = new UserDto(ANY_USERNAME, "invalid_mail", ANY_PASSWORD);
		Mockito.when(validatorFactory.getUserDtoValidator())
				.thenReturn(new UserDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		Assertions.assertThrows(InputValidationException.class, () -> controller.createUser(ANY_INVALID_USER));
	}

	@Test
	void canManageCreateAttemptWithInvalidPassword() {
		// Arrange
		final UserDto ANY_INVALID_USER = new UserDto("ANY NAME", ANY_EMAIL, "hey123");
		Mockito.when(validatorFactory.getUserDtoValidator())
				.thenReturn(new UserDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		Assertions.assertThrows(InputValidationException.class, () -> controller.createUser(ANY_INVALID_USER));
	}

	// GET ///////////////////////////////////////////////
	@Test
	void canGetUser() {
		// Arrange
		Mockito.when(validatorFactory.getUserDtoValidator())
				.thenReturn(new UserDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		Mockito.when(repo.getBy(ArgumentMatchers.any())).thenReturn(ANY_CUSTOM_USER);
		Mockito.when(converter.fromUserToLightDto(ANY_CUSTOM_USER)).thenReturn(ANY_LIGHT_USER_DTO);
		// Act
		// Assert
		Assertions.assertDoesNotThrow(() -> controller.getUser(ANY_ID));
		Mockito.verify(converter).fromUserToLightDto(ANY_CUSTOM_USER);
		Mockito.verify(repo).getBy(ANY_ID);
	}

	@Test
	void canManageGetAttemptWithInvalidId() {
		// Arrange
		Mockito.when(validatorFactory.getUserDtoValidator())
				.thenReturn(new UserDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		final String ANY_INVALID_ID = "eeed";
		// Act
		// Assert
		Assertions.assertThrows(InputValidationException.class, () -> controller.getUser(ANY_INVALID_ID));
	}

	// UPDATE ///////////////////////////////////////////////
	@Test
	void canUpdateUserPassword() {
		// Arrange
		Mockito.when(validatorFactory.getFullUserDtoValidator())
				.thenReturn(new FullUserDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		Mockito.when(converter.fromFullDtoUserToUser(ANY_FULL_USER_DTO)).thenReturn(ANY_CUSTOM_USER);
		// Act
		// Assert
		Assertions.assertDoesNotThrow(() -> controller.modifyPassword(ANY_ID, ANY_FULL_USER_DTO));
		Mockito.verify(converter).fromFullDtoUserToUser(ANY_FULL_USER_DTO);
	}

	@Test
	void canManagePasswordChangeAttemptWithUnmatchingIds() {
		// Arrange
	    final String ANY_UNMATCHING_UUID = "e10c429f-5870-429a-bdcb-fbba7f792921";
		Mockito.when(validatorFactory.getFullUserDtoValidator())
				.thenReturn(new FullUserDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		Assertions.assertThrows(InputValidationException.class, () -> controller.modifyPassword(ANY_UNMATCHING_UUID, ANY_FULL_USER_DTO));
	}
	
	@Test
	void canManagePasswordChangeAttemptWithInvalidUUID() {
		// Arrange
		final String ANY_INVALID_ID = "eeed";
		final FullUserDto ANY_INVALID_DTO = new FullUserDto(ANY_INVALID_ID, ANY_USERNAME, ANY_EMAIL, ANY_PASSWORD);
		Mockito.when(validatorFactory.getFullUserDtoValidator())
				.thenReturn(new FullUserDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		Assertions.assertThrows(InputValidationException.class, () -> controller.modifyPassword(ANY_INVALID_ID, ANY_INVALID_DTO));
	}

	@Test
	void canUpdateUserInfos() {
		// Arrange
		Mockito.when(validatorFactory.getLightUserDtoValidator())
				.thenReturn(new LightUserDtoValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		Mockito.when(converter.fromLightUserDtoToUser(ANY_LIGHT_USER_DTO)).thenReturn(ANY_CUSTOM_USER);
		// Act
		// Assert
		Assertions.assertDoesNotThrow(() -> controller.modifyUserInfos(ANY_ID, ANY_LIGHT_USER_DTO));
		Mockito.verify(converter).fromLightUserDtoToUser(ANY_LIGHT_USER_DTO);
	}

}
