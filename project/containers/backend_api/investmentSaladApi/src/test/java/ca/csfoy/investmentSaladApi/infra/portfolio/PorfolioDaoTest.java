package ca.csfoy.investmentSaladApi.infra.portfolio;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import ca.csfoy.investmentSaladApi.domain.Currency;
import ca.csfoy.investmentSaladApi.infra.role.RoleDao;
import ca.csfoy.investmentSaladApi.infra.role.RoleEntity;
import ca.csfoy.investmentSaladApi.infra.user.UserEntity;

@DataJpaTest
@ExtendWith(SpringExtension.class)
@ExtendWith(MockitoExtension.class)
public class PorfolioDaoTest {

	@Autowired
	PortfolioDao dao;

	@Mock
	RoleDao roleDao;

	private final String ANY_SEEDED_ID_1 = "40554b53-6ce1-333d-96ab-c854631d04f8";
	private final String ANY_SEEDED_ID_2 = "40554b53-6ce1-444d-96ab-c854631d04f8";

	private final String ANY_SEEDED_USER_ID_1 = "5eca870a-62ce-3125-90bd-02ec0b6401c3";
	private final String ANY_SEEDED_USER_ID_2 = "5eca868a-62ce-3125-90bd-02ec0b6401c3";

	private final UserEntity ANY_USER_ENTITY_1 = new UserEntity(ANY_SEEDED_USER_ID_1, "UserForTest1", "test.user1@test.com",
			"$2a$10$Uv/aT7CEsvsM08Cr7jVIsOnOYrDMGZar5SIMZqjBjs.s.o9XZeA5C", new RoleEntity("2", "USER"));
	
	private final UserEntity ANY_USER_ENTITY_2 = new UserEntity(ANY_SEEDED_USER_ID_2, "UserForTest2", "test.user2@test.com",
			"$2a$10$Uv/aT7CEsvsM08Cr7jVIsOnOYrDMGZar5SIMZqjBjs.s.o9XZeA5C", new RoleEntity("2", "USER"));

	private final PortfolioEntity SEEDED_PORFOLIO_ENTITY_1 = new PortfolioEntity(ANY_SEEDED_ID_1, "Test",
			"Test User 1", ANY_USER_ENTITY_1, 2000, 1, 1, LocalDate.of(2020, 10, 10), Currency.USD.name());

	private final PortfolioEntity SEEDED_PORFOLIO_ENTITY_2 = new PortfolioEntity(ANY_SEEDED_ID_2, "Test",
			"Test User 2", ANY_USER_ENTITY_2, 2000, 1, 1, LocalDate.of(2020, 10, 10), Currency.USD.name());
	@Test
	void canGetAllPortfoliosByUser2Id() {
		// Arrange
		// Act
		// Assert

		assertEquals(List.of(SEEDED_PORFOLIO_ENTITY_2), dao.getAllByUserID(ANY_SEEDED_USER_ID_2));
	}

	@Test
	void canGetAllPortfoliosByUser1Id() {
		// Arrange
		// Act
		// Assert
		Assertions.assertEquals(List.of(SEEDED_PORFOLIO_ENTITY_1), dao.getAllByUserID(ANY_SEEDED_USER_ID_1));
	}

	@Test
	void canManageGetAttemptOnValidPortfolioWithUnmatchingUser() {
		// Arrange
		// Act
		// Assert
		Assertions.assertTrue(dao.getPortfolioById(ANY_SEEDED_USER_ID_1, ANY_SEEDED_ID_2)== null);
	}
	
	@Test
	void canManageGetAttemptOnValidPortfolioWithMatchingUser2() {
		// Arrange
		// Act
		PortfolioEntity getResult = dao.getPortfolioById(ANY_SEEDED_USER_ID_2, ANY_SEEDED_ID_2);
		// Assert
		Assertions.assertEquals(SEEDED_PORFOLIO_ENTITY_2, getResult);
	}
	
	@Test
	void canManageGetAttemptOnValidPortfolioWithMatchingUser1() {
		// Arrange
		// Act
		// Assert
		assertEquals(SEEDED_PORFOLIO_ENTITY_1, dao.getPortfolioById(ANY_SEEDED_USER_ID_1, ANY_SEEDED_ID_1));
	}
}

