package ca.csfoy.investmentSaladApi.infra.user;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import ca.csfoy.investmentSaladApi.domain.Roles;
import ca.csfoy.investmentSaladApi.domain.user.CustomUser;
import ca.csfoy.investmentSaladApi.domain.user.Role;

@Tag("Data")
@AutoConfigureTestDatabase
@SpringBootTest
public class UserRepositoryDataTest 
{
	//These tests ensure that the data.sql seeds the proper users correctly.
	
	@Autowired
	UserRepositoryHibernate repo;
	
	final String SEEDED_ADMIN_ID = "5eca874a-62ce-3125-90bd-02ec0b6401c3";
	final String SEEDED_USER_ID = "5eca872a-62ce-3125-90bd-02ec0b6401c3";


	@Test
	void canGetSeededAdminById() 
	{
		//Arrange 
		final CustomUser SEEDED_ADMIN = new CustomUser("5eca874a-62ce-3125-90bd-02ec0b6401c3", "Admin", "test.admin@hotmail.com",
				"$2a$10$60kkWBQaqP9GVUvJTmIbZ.j10hMjPE93NSgLPjqrv6muF1OPKZxXe", new Role("1", Roles.ADMIN));
		//Act
		//Assert
		Assertions.assertEquals(SEEDED_ADMIN, repo.getBy(SEEDED_ADMIN_ID));
		
	}
	

	@Test
	void canGetSeededUserById() 
	{
		//Arrange 
		final CustomUser SEEDED_USER= new CustomUser("5eca872a-62ce-3125-90bd-02ec0b6401c3", "User","test.user@hotmail.com",
				"$2a$10$60kkWBQaqP9GVUvJTmIbZ.j10hMjPE93NSgLPjqrv6muF1OPKZxXe", new Role("2", Roles.USER));
		//Act
		//Assert
		Assertions.assertEquals(SEEDED_USER, repo.getBy(SEEDED_USER_ID));
		
	}

}
