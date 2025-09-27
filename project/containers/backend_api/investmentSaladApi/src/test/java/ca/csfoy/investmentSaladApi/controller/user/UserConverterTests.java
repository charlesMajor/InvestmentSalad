package ca.csfoy.investmentSaladApi.controller.user;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import ca.csfoy.investmentSaladApi.api.user.FullUserDto;
import ca.csfoy.investmentSaladApi.api.user.LightUserDto;
import ca.csfoy.investmentSaladApi.api.user.UserDto;
import ca.csfoy.investmentSaladApi.api.validations.ValidUUID;
import ca.csfoy.investmentSaladApi.domain.Roles;
import ca.csfoy.investmentSaladApi.domain.user.CustomUser;
import ca.csfoy.investmentSaladApi.domain.user.Role;



@Tag("Unit")
@ExtendWith(MockitoExtension.class)
public class UserConverterTests 
{
	@Mock
	PasswordEncoder encoder;
	
	@InjectMocks
	private  UserConverter converter;
	
	private final String ANY_ID = "5eca874a-62ce-3125-90bd-02ec0b6401c3";
	private final String ANY_USERNAME = "Rock";
	private final String ANY_EMAIL = "test.lol@test.com";
	private final String ANY_HASED_PASSWORD = "$2a$10$cC7KDFOWPAJ0pyHaRkLvVu6lVYR2dVTGkfKC/2GvD4SlQLo7spBiS";
	private final String ANY_PASSWORD = "allo123";
	private final String ANY_HIDDEN_PASSWORD = "******";

	private final String ANY_ROLE_ID = "2";
		
	private final Role ANY_ROLE = new Role(ANY_ROLE_ID, Roles.USER);
	private final FullUserDto ANY_FULL_USER_DTO_1 = new FullUserDto(ANY_ID, ANY_USERNAME, ANY_EMAIL, ANY_PASSWORD);
	private final UserDto ANY_USER_DTO_1 = new UserDto(ANY_USERNAME,  ANY_EMAIL, ANY_PASSWORD);
	private final LightUserDto ANY_LIGHT_USER_DTO_1 = new LightUserDto(ANY_ID,ANY_USERNAME);
	private final CustomUser ANY_CUSTOM_USER_1 = new CustomUser(ANY_ID, ANY_USERNAME, ANY_EMAIL, ANY_HASED_PASSWORD, ANY_ROLE);
	

	@Test
	void canConvertFromUserToLightDto()
	{
		//Arrange
		//Act
		LightUserDto actualDto = converter.fromUserToLightDto(ANY_CUSTOM_USER_1);
		//Assert
		Assertions.assertEquals(ANY_LIGHT_USER_DTO_1, actualDto);
	}
	
	@Test
	void canConvertFromUserToFullDto() 
	{
		//Arrange
		FullUserDto expectedDto = new FullUserDto(ANY_ID, ANY_USERNAME, ANY_EMAIL, ANY_HIDDEN_PASSWORD);
		//Act
		//Assert
		Assertions.assertEquals(expectedDto, converter.fromUserToFullUserDto(ANY_CUSTOM_USER_1));

	}
	@Test
	void canConvertFromLightDtoToUser() //Multiple assertions are made to avoid the exception thrown in the override of ==
										//when comparing null elements such as email address.
	{
		//Arrange
		CustomUser expectedCustomUser = new CustomUser(ANY_ID, ANY_USERNAME, null, null, ANY_ROLE);
		//Act
		CustomUser actualCustomeUser = converter.fromLightUserDtoToUser(ANY_LIGHT_USER_DTO_1);
		//Assert
		Assertions.assertEquals(expectedCustomUser.getId(), actualCustomeUser.getId());
		Assertions.assertEquals(expectedCustomUser.getUsername(), actualCustomeUser.getUsername());
		Assertions.assertNull(actualCustomeUser.getEmailAddress());
		Assertions.assertNull(actualCustomeUser.getPassword());
		Assertions.assertEquals(expectedCustomUser.getRole(), actualCustomeUser.getRole());
	}
	
	@Test
	void canConvertfromFullDtoUserToUser() 
	{
		//Arrange
		Mockito.when(encoder.encode(ANY_PASSWORD)).thenReturn(ANY_HASED_PASSWORD);
		//Act
		//Assert
		Assertions.assertEquals(ANY_CUSTOM_USER_1, converter.fromFullDtoUserToUser(ANY_FULL_USER_DTO_1));
		Mockito.verify(encoder).encode(ANY_PASSWORD);
	}
	
	@Test
	void canConvertfromUserDtoUserToUser() 
	{
		//Arrange
		Mockito.when(encoder.encode(ANY_PASSWORD)).thenReturn(ANY_HASED_PASSWORD);
		//Act
		CustomUser actualCustomUser = converter.fromUserDtoToUser(ANY_USER_DTO_1);
		//Assert
		Assertions.assertTrue(actualCustomUser.getId().matches(ValidUUID.FORMAT_UUID));
		Assertions.assertEquals(actualCustomUser.getUsername(),ANY_CUSTOM_USER_1.getUsername());
		Assertions.assertEquals(actualCustomUser.getEmailAddress(), ANY_CUSTOM_USER_1.getEmailAddress());
		Assertions.assertEquals(actualCustomUser.getPassword(), ANY_CUSTOM_USER_1.getPassword());
		Assertions.assertEquals(actualCustomUser.getRole(), ANY_CUSTOM_USER_1.getRole());

		Mockito.verify(encoder).encode(ANY_PASSWORD);
	}
}
