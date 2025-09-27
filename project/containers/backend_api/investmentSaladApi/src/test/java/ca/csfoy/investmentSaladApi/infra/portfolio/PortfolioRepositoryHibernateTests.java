package ca.csfoy.investmentSaladApi.infra.portfolio;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import ca.csfoy.investmentSaladApi.controller.exception.exceptions.DuplicateException;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.ObjectNotFoundException;
import ca.csfoy.investmentSaladApi.domain.Currency;
import ca.csfoy.investmentSaladApi.domain.Roles;
import ca.csfoy.investmentSaladApi.domain.portfolio.Portfolio;
import ca.csfoy.investmentSaladApi.infra.role.RoleEntity;
import ca.csfoy.investmentSaladApi.infra.tag.portfolio_tag.PortfolioTagDao;
import ca.csfoy.investmentSaladApi.infra.user.UserDao;
import ca.csfoy.investmentSaladApi.infra.user.UserEntity;
import ca.csfoy.investmentSaladApi.security.UserPrincipal;

@ExtendWith(MockitoExtension.class)
public class PortfolioRepositoryHibernateTests {

	@Mock
	PortfolioDao dao;

	@Mock
	private PortfolioTagDao tagDao;

	
	@Mock
	PortfolioEntityConverter converter;

	@Mock
	UserDao userDao;

	@Mock
	Authentication auth;

	@InjectMocks
	PortfolioRepositoryHibernate repo;

	final String ANY_ID = "35554b53-6ce1-425d-96ab-c854631d04f8";
	final String ANY_USER_ID = "35553A53-6ce1-425d-96ab-c854631d04f8";

	final UserEntity ANY_USER_ENTITY = new UserEntity(ANY_USER_ID, "account", "anye-mail@mail.com",
			"$2a$10$60kkWBQaqP9GVUvJTmIbZ.j10hMjPE93NSgLPjqrv6muF1OPKZxXe", new RoleEntity("1", Roles.ADMIN.name()));

	private final Portfolio ANY_PORTFOLIO = new Portfolio(ANY_ID, "ANY NAME", "AnyDesc", 0, 0, 0,
			LocalDate.of(2020, 05, 1), Currency.CAD, List.of());

	private final PortfolioEntity ANY_PORTFOLIO_ENTITY = new PortfolioEntity(ANY_ID, "ANY NAME", "AnyDesc",
			ANY_USER_ENTITY, 0, 0, 0, LocalDate.of(2020, 05, 1), Currency.CAD.name());


	// GET ///////////////////////////////////////////////
	@Test
	void canGetById() {
		// Arrange
		mockAuthentication();
		Mockito.when(dao.getPortfolioById(ANY_USER_ID, ANY_ID)).thenReturn(ANY_PORTFOLIO_ENTITY);
		Mockito.when(converter.fromEntityToPortfolio(ANY_PORTFOLIO_ENTITY)).thenReturn(ANY_PORTFOLIO);
		// Act
		// Assert
		Assertions.assertEquals(repo.getBy(ANY_PORTFOLIO.getId()), ANY_PORTFOLIO);
		Mockito.verify(converter).fromEntityToPortfolio(ANY_PORTFOLIO_ENTITY);
		Mockito.verify(dao).getPortfolioById(ANY_USER_ID, ANY_ID);
	}
	@Test
	void canGetAll() {
		// Arrange
		mockAuthentication();
		Mockito.when(dao.getAllByUserID(ANY_USER_ID)).thenReturn(List.of(ANY_PORTFOLIO_ENTITY));
		Mockito.when(converter.fromEntityListToPortfolioList(List.of(ANY_PORTFOLIO_ENTITY))).thenReturn(List.of(ANY_PORTFOLIO));
		// Act
		// Assert
		Assertions.assertEquals(repo.getAllByUserId(), List.of(ANY_PORTFOLIO));
		Mockito.verify(converter).fromEntityListToPortfolioList(List.of(ANY_PORTFOLIO_ENTITY));
		Mockito.verify(dao).getAllByUserID(ANY_USER_ID);
	}

	@Test
	void canManageGetAttemptWithInexistentId() {
		// Arrange
		mockAuthentication();
		Mockito.when(dao.getPortfolioById(ANY_USER_ID, ANY_ID)).thenReturn(null);
		// Act
		// Assert
		Assertions.assertThrows(ObjectNotFoundException.class, () -> repo.getBy(ANY_ID));
		Mockito.verifyNoInteractions(converter);
		Mockito.verify(dao).getPortfolioById(ANY_USER_ID, ANY_ID);
	}

	// CREATE ///////////////////////////////////////////////
	@Test
	void canCreatePortfolio() {
		// Arrange
		mockAuthentication();
		Mockito.when(userDao.getReferenceById(ANY_USER_ID)).thenReturn(ANY_USER_ENTITY);
		Mockito.when(converter.fromPortfolioToEntity(ANY_PORTFOLIO, ANY_USER_ENTITY)).thenReturn(ANY_PORTFOLIO_ENTITY);
		Mockito.when(converter.fromEntityToPortfolio(ANY_PORTFOLIO_ENTITY)).thenReturn(ANY_PORTFOLIO);
		Mockito.when(dao.findById(ANY_ID)).thenReturn(Optional.empty());
		Mockito.when(dao.save(ANY_PORTFOLIO_ENTITY)).thenReturn(ANY_PORTFOLIO_ENTITY);
		// Act
		// Assert
		Assertions.assertEquals(ANY_PORTFOLIO, repo.create(ANY_PORTFOLIO));
		Mockito.verify(userDao).getReferenceById(ANY_USER_ID);
		Mockito.verify(converter).fromPortfolioToEntity(ANY_PORTFOLIO, ANY_USER_ENTITY);
		Mockito.verify(converter).fromEntityToPortfolio(ANY_PORTFOLIO_ENTITY);
		Mockito.verify(dao).findById(ANY_ID);
		Mockito.verify(dao).save(ANY_PORTFOLIO_ENTITY);
	}

	@Test
	void canManageCreateAttemptOnDuplicatePortfolio() {
		// Arrange
		Mockito.when(dao.findById(ANY_ID)).thenReturn(Optional.of(ANY_PORTFOLIO_ENTITY));
		// Act
		// Assert
		Assertions.assertThrows(DuplicateException.class, () -> repo.create(ANY_PORTFOLIO));
		Mockito.verifyNoInteractions(converter);
		Mockito.verifyNoInteractions(userDao);
		
	}
	// UPDATE ///////////////////////////////////////////////
	@Test
	void canUpdatePortfolio() 
	{
		//Arrange
		mockAuthentication();
		Mockito.when(converter.fromPortfolioToEntity(ANY_PORTFOLIO, ANY_USER_ENTITY)).thenReturn(ANY_PORTFOLIO_ENTITY);
		Mockito.when(dao.getPortfolioById(ANY_USER_ID, ANY_ID)).thenReturn(ANY_PORTFOLIO_ENTITY);
		Mockito.when(dao.save(ANY_PORTFOLIO_ENTITY)).thenReturn(ANY_PORTFOLIO_ENTITY);
		Mockito.when(userDao.findById(ANY_USER_ID)).thenReturn(Optional.of(ANY_USER_ENTITY));
		Mockito.when(tagDao.getAllIdByPortfolioId(ANY_ID, ANY_USER_ID)).thenReturn(List.of());
		//Act
		//Assert
		assertDoesNotThrow(()->repo.save(ANY_ID, ANY_PORTFOLIO));
		Mockito.verify(dao).getPortfolioById(ANY_USER_ID, ANY_ID);
	}
	@Test
	void canManageSaveAttemptWithInexistantID()
	{
		// Arrange
		Mockito.when(dao.getPortfolioById(ANY_USER_ID, ANY_ID)).thenReturn(null);
		// Act
		// Assert
		assertThrows(ObjectNotFoundException.class, ()-> repo.save(ANY_ID, ANY_PORTFOLIO));
		Mockito.verify(dao).getPortfolioById(ANY_USER_ID, ANY_ID);
		
	}
	// DELETE ///////////////////////////////////////////////
	@Test
	void canDeletePorfolio()
	{
		// Arrange
		Mockito.when(dao.getPortfolioById(ANY_USER_ID, ANY_ID)).thenReturn(ANY_PORTFOLIO_ENTITY);
		Mockito.doNothing().when(dao).delete(ANY_PORTFOLIO_ENTITY);
		// Act
		// Assert
		assertDoesNotThrow(()-> repo.delete(ANY_ID));
		Mockito.verify(dao).delete(ANY_PORTFOLIO_ENTITY);
		Mockito.verifyNoInteractions(converter);
	}
	@Test
	void canManageDeleteAttemptWithInexistantID()
	{
		// Arrange
		Mockito.when(dao.getPortfolioById(ANY_USER_ID, ANY_ID)).thenReturn(null);
		// Act
		// Assert
		assertThrows(ObjectNotFoundException.class, ()-> repo.delete(ANY_ID));
		Mockito.verify(dao).getPortfolioById(ANY_USER_ID, ANY_ID);
		
	}


	private void mockAuthentication() 
	{
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        Mockito.when(auth.getPrincipal()).thenReturn(new UserPrincipal(ANY_USER_ENTITY.getId(), ANY_USER_ENTITY.getUsername()));
        Mockito.when(securityContext.getAuthentication()).thenReturn(auth);
		SecurityContextHolder.setContext(securityContext);
	}

}
