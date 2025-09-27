package ca.csfoy.investmentSaladApi.infra.portfolio;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.Test;

import ca.csfoy.investmentSaladApi.domain.Currency;
import ca.csfoy.investmentSaladApi.domain.Roles;
import ca.csfoy.investmentSaladApi.domain.portfolio.Portfolio;
import ca.csfoy.investmentSaladApi.infra.role.RoleEntity;
import ca.csfoy.investmentSaladApi.infra.user.UserEntity;

public class PorfolioEntityConverterTest {

	PortfolioEntityConverter converter = new PortfolioEntityConverter();

	final String ANY_ID = "35554b53-6ce1-425d-96ab-c854631d04f8";
	final String ANY_USER_ID = "35553A53-6ce1-425d-96ab-c854631d04f8";
	
	final UserEntity ANY_USER_ENTITY = new UserEntity(ANY_USER_ID, "account", "anye-mail@mail.com",
			"$2a$10$60kkWBQaqP9GVUvJTmIbZ.j10hMjPE93NSgLPjqrv6muF1OPKZxXe", new RoleEntity("1", Roles.ADMIN.name()));

	private final Portfolio ANY_PORTFOLIO = new Portfolio(ANY_ID, "ANY NAME", "AnyDesc", 0, 0, 0,
			LocalDate.of(2020, 05, 1), Currency.CAD, List.of());

	private final PortfolioEntity ANY_PORTFOLIO_ENTITY = new PortfolioEntity(ANY_ID, "ANY NAME", "AnyDesc",
			ANY_USER_ENTITY, 0, 0, 0, LocalDate.of(2020, 05, 1), Currency.CAD.name());

	@Test
	void canConvertFromEntityToPortfolio() {
		// Arrange
		// Act
		// Assert
		assertEquals(ANY_PORTFOLIO, converter.fromEntityToPortfolio(ANY_PORTFOLIO_ENTITY));
	}

	@Test
	void canConvertFromPortfolioToEntity() {
		// Arrange
		// Act
		// Assert
		assertEquals(ANY_PORTFOLIO_ENTITY, converter.fromPortfolioToEntity(ANY_PORTFOLIO, ANY_USER_ENTITY));
	}
	
	@Test
	void canConverterFromEntityListToPortfolioList() 
	{
		// Arrange
		// Act
		// Assert
		assertEquals(List.of(ANY_PORTFOLIO), converter.fromEntityListToPortfolioList(List.of(ANY_PORTFOLIO_ENTITY)));
	}

}
