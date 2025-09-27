package ca.csfoy.investmentSaladApi.infra.user;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import ca.csfoy.investmentSaladApi.domain.Roles;
import ca.csfoy.investmentSaladApi.domain.user.CustomUser;
import ca.csfoy.investmentSaladApi.domain.user.Role;
import ca.csfoy.investmentSaladApi.infra.role.RoleEntity;

@Tag("Unit")
@ExtendWith(MockitoExtension.class)
public class UserEntityConverterTest {
	
	@InjectMocks
	private  UserEntityConverter converter;
	
	private final String ANY_ID = "5eca874a-62ce-3125-90bd-02ec0b6401c3";
	private final String ANY_USERNAME = "Rock";
	private final String ANY_EMAIL = "test.lol@test.com";
	private final String ANY_HASED_PASSWORD = "$2a$10$cC7KDFOWPAJ0pyHaRkLvVu6lVYR2dVTGkfKC/2GvD4SlQLo7spBiS";
	
	
	private final Role ANY_ADMIN_ROLE = new Role("1", Roles.ADMIN);
	private final Role ANY_USER_ROLE = new Role("2", Roles.USER);

	private final RoleEntity ANY_ADMIN_ROLE_ENTITY = new RoleEntity("1", Roles.ADMIN.name());
	private final RoleEntity ANY_USER_ROLE_ENTITY = new RoleEntity("2", Roles.USER.name());
	private final CustomUser ANY_CUSTOM_USER_1 = new CustomUser(ANY_ID, ANY_USERNAME, ANY_EMAIL, ANY_HASED_PASSWORD, ANY_ADMIN_ROLE);
	private final UserEntity ANY_USER_ENTITY = new UserEntity(ANY_ID, ANY_USERNAME, ANY_EMAIL, ANY_HASED_PASSWORD, ANY_ADMIN_ROLE_ENTITY);
	
	
	@Test void convertFromCustomUserToUserEntity()
	{
		//Arrange
		final UserEntity EXPECTED_USER_ENTITY = ANY_USER_ENTITY;
		//Act
		//Assert
		Assertions.assertEquals(EXPECTED_USER_ENTITY, converter.fromCustomUserToUserEntity(ANY_CUSTOM_USER_1));
	}
	
	@Test void convertFromUserEntityToCustomUser()
	{
		//Arrange
		final CustomUser EXPECTED_CUSTOM_USER = ANY_CUSTOM_USER_1;
		//Act
		//Assert
		Assertions.assertEquals(EXPECTED_CUSTOM_USER, converter.fromUserEntityToCustomUser(ANY_USER_ENTITY));
	}
	@Test void convertFromRoleToRoleEntity()
	{
		//Arrange
		RoleEntity EXPECTED_ROLE_ENTITY = ANY_ADMIN_ROLE_ENTITY;
		//Act
		//Assert
		Assertions.assertEquals(EXPECTED_ROLE_ENTITY, converter.fromRoleToRoleEntity(ANY_ADMIN_ROLE));
	}
	
	@Test void convertRoleEntityToAdminRole()
	{
		//Arrange
		Role EXPECTED_ROLE = ANY_ADMIN_ROLE;
		//Act
		//Assert
		Assertions.assertEquals(EXPECTED_ROLE, converter.fromRoleEntityToRole(ANY_ADMIN_ROLE_ENTITY));
	}
	
	@Test void convertRoleEntityToUserRole()
	{
		//Arrange
		Role EXPECTED_ROLE = ANY_USER_ROLE;
		//Act
		//Assert
		Assertions.assertEquals(EXPECTED_ROLE, converter.fromRoleEntityToRole(ANY_USER_ROLE_ENTITY));
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
