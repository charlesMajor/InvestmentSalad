package ca.csfoy.investmentSaladApi.infra.user;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import ca.csfoy.investmentSaladApi.controller.exception.exceptions.DuplicateException;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.ObjectNotFoundException;
import ca.csfoy.investmentSaladApi.domain.Roles;
import ca.csfoy.investmentSaladApi.domain.user.CustomUser;
import ca.csfoy.investmentSaladApi.domain.user.Role;
import ca.csfoy.investmentSaladApi.infra.role.RoleEntity;
import ca.csfoy.investmentSaladApi.infra.role.RoleService;

@Tag("Unit")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@ExtendWith(MockitoExtension.class)
public class UserRepositoryHybernateTest {
	@Mock
	UserDao dao;
	@Mock
	UserEntityConverter converter;
	@Mock 
	RoleService roleService;
	
	@InjectMocks
	UserRepositoryHibernate repo;
	
	final String ANY_SEEDED_ID = "5eca874a-62ce-3125-90bd-02ec0b6401c3";
	final String ANY_UNSEEDED_ID = "5aqq874a-62ce-3125-90bd-02ec0b6401c3";
	


	final String ANY_ID_TO_CREATE = "5eca874a-62ce-3125-90ba-01ec0b3401c1";
	final String ANY_SEEDED_EMAIL = "test.admin@hotmail.com";
	final String ANY_UNSEEDED_EMAIL = "invalid-mail@mail.com";

	final UserEntity SEEDED_ADMIN_ENTITY = new UserEntity(ANY_SEEDED_ID, "Admin", ANY_SEEDED_EMAIL,
			"$2a$10$60kkWBQaqP9GVUvJTmIbZ.j10hMjPE93NSgLPjqrv6muF1OPKZxXe", new RoleEntity("1", Roles.ADMIN.name()));
	
	final CustomUser SEEDED_ADMIN = new CustomUser(ANY_SEEDED_ID, "Admin",ANY_SEEDED_EMAIL ,
			"$2a$10$60kkWBQaqP9GVUvJTmIbZ.j10hMjPE93NSgLPjqrv6muF1OPKZxXe", new Role("1", Roles.ADMIN));
	
	
	final CustomUser USER_TO_CREATE = new CustomUser(ANY_ID_TO_CREATE, "New", "anyemail@mail.com" ,
			"$2a$10$60kkWBQaqP9GVUvJTmIbZ.j10hMjPE93NSgLPjqrv6muF1OPKZxXe", new Role("1", Roles.ADMIN));
	
	final UserEntity USER_ENTITY_TO_CREATE = new UserEntity(ANY_ID_TO_CREATE, "account", "anye-mail@mail.com" ,
			"$2a$10$60kkWBQaqP9GVUvJTmIbZ.j10hMjPE93NSgLPjqrv6muF1OPKZxXe", new RoleEntity("1", Roles.ADMIN.name()));
	
	final CustomUser USER_TO_UPDATE= new CustomUser(ANY_ID_TO_CREATE, "updated", "newemail@mail.com" ,
			"$2a$10$60kkWBQaqP9GVUvJTmIbZ.j10hMjPE93NSgLPjqrv6muF1OPKZxXe", new Role("1", Roles.ADMIN));
	
	final UserEntity USER_ENTITY_TO_UPDATE = new UserEntity(ANY_ID_TO_CREATE, "updated", "newemail@mail.com" ,
			"$2a$10$60kkWBQaqP9GVUvJTmIbZ.j10hMjPE93NSgLPjqrv6muF1OPKZxXe", new RoleEntity("1", Roles.ADMIN.name()));

	// CREATE ///////////////////////////////////////////////
	@Test
	@Order(1)
	void canCreateUser() 
	{
		//Arrange
		Mockito.when(dao.save(USER_ENTITY_TO_CREATE)).thenReturn(USER_ENTITY_TO_CREATE);
		Mockito.when(converter.fromUserEntityToCustomUser(USER_ENTITY_TO_CREATE)).thenReturn(USER_TO_CREATE);
		Mockito.when(converter.fromCustomUserToUserEntity(USER_TO_CREATE)).thenReturn(USER_ENTITY_TO_CREATE);
		final CustomUser EXPECTED_CREATED_USER = USER_TO_CREATE;
		//Act
		CustomUser actualUserCreated = repo.create(USER_TO_CREATE);
		//Assert
		Assertions.assertEquals(EXPECTED_CREATED_USER, actualUserCreated);
		Mockito.verify(converter).fromCustomUserToUserEntity(USER_TO_CREATE);
		Mockito.verify(converter).fromUserEntityToCustomUser(USER_ENTITY_TO_CREATE);
		Mockito.verify(dao).save(USER_ENTITY_TO_CREATE);
	}
	
	@Test
	@Order(2)
	void canManageDuplicateUserCreation() 
	{
		//Arrange
		Mockito.when(dao.findByEmail(USER_TO_CREATE.getEmailAddress())).thenReturn(Optional.of(USER_ENTITY_TO_CREATE));
		//Act
		//Assert
		Assertions.assertThrows(DuplicateException.class, () -> repo.create(USER_TO_CREATE));
		Mockito.verify(dao).findByEmail(USER_TO_CREATE.getEmailAddress());
	}
	
	// UPDATE ///////////////////////////////////////////////
	@Test
	@Order(3)
	void canUpdateUser() 
	{
		//Arrange
		Mockito.when(dao.save(USER_ENTITY_TO_UPDATE)).thenReturn(USER_ENTITY_TO_UPDATE);
		Mockito.when(dao.findById(ANY_ID_TO_CREATE)).thenReturn(Optional.of(USER_ENTITY_TO_UPDATE));
		Mockito.when(converter.fromCustomUserToUserEntity(USER_TO_UPDATE)).thenReturn(USER_ENTITY_TO_UPDATE);
		//Act
		repo.save(USER_TO_UPDATE.getId(), USER_TO_UPDATE);
		//Assert
		Mockito.verify(converter).fromCustomUserToUserEntity(USER_TO_UPDATE);
		Mockito.verify(dao).save(USER_ENTITY_TO_UPDATE);
	}
	
	@Test
	@Order(4)
	void canManageUpdateAttemptOnInexistentUserId() 
	{
		//Arrange
		Mockito.when(dao.findById(ANY_UNSEEDED_ID)).thenReturn(Optional.empty());
		//Act
		//Assert
		Assertions.assertThrows(ObjectNotFoundException.class, () -> repo.save(ANY_UNSEEDED_ID,USER_TO_CREATE));
		Mockito.verify(dao).findById(ANY_UNSEEDED_ID);
	}
	
	// GET ///////////////////////////////////////////////
	@Test
    void canGetUserById()
	{
		//Arrange
	    Mockito.when(dao.findById(ANY_SEEDED_ID)).thenReturn(Optional.of(SEEDED_ADMIN_ENTITY));
	    Mockito.when(converter.fromUserEntityToCustomUser(SEEDED_ADMIN_ENTITY)).thenReturn(SEEDED_ADMIN);
	    final CustomUser EXPECTED_ADMIN = SEEDED_ADMIN;
	    //Act
	    CustomUser actualUser = repo.getBy(ANY_SEEDED_ID);
	    //Assert
	    Mockito.verify(converter).fromUserEntityToCustomUser(SEEDED_ADMIN_ENTITY);
	    Mockito.verify(dao).findById(ANY_SEEDED_ID);
	    Assertions.assertEquals(EXPECTED_ADMIN, actualUser);
	}
	
	@Test
	void canManageGetAttemptOnInexistentUserId() 
	{
		//Arrange
		Mockito.when(dao.findById(ANY_UNSEEDED_ID)).thenReturn(Optional.empty());
		//Act
		//Assert
		Assertions.assertThrows(ObjectNotFoundException.class, () -> repo.getBy(ANY_UNSEEDED_ID));
		Mockito.verify(dao).findById(ANY_UNSEEDED_ID);
	}
	
	@Test
    void canGetUserByEmail()
	{
		//Arrange
	    Mockito.when(dao.findByEmail(ANY_SEEDED_EMAIL)).thenReturn(Optional.of(SEEDED_ADMIN_ENTITY));
	    Mockito.when(converter.fromUserEntityToCustomUser(SEEDED_ADMIN_ENTITY)).thenReturn(SEEDED_ADMIN);
	    final CustomUser EXPECTED_ADMIN = SEEDED_ADMIN;
	    //Act
	    CustomUser actualUser = repo.getByEmail(ANY_SEEDED_EMAIL);
	    //Assert
	    Mockito.verify(converter).fromUserEntityToCustomUser(SEEDED_ADMIN_ENTITY);
	    Mockito.verify(dao).findByEmail(ANY_SEEDED_EMAIL);
	    Assertions.assertEquals(EXPECTED_ADMIN, actualUser);
	}
	
	@Test
	void canManageGetAttemptOnInexistentUserEmail() 
	{
		//Arrange
		Mockito.when(dao.findByEmail(ANY_UNSEEDED_EMAIL)).thenReturn(Optional.empty());
		//Act
		//Assert
		Assertions.assertThrows(ObjectNotFoundException.class, () -> repo.getByEmail(ANY_UNSEEDED_EMAIL));
		Mockito.verify(dao).findByEmail(ANY_UNSEEDED_EMAIL);
	}
	

}
