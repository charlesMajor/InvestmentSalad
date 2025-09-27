package ca.csfoy.investmentSaladApi.infra.tag;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.List;
import java.util.Optional;

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
import ca.csfoy.investmentSaladApi.domain.Roles;
import ca.csfoy.investmentSaladApi.domain.tag.Tag;
import ca.csfoy.investmentSaladApi.infra.role.RoleEntity;
import ca.csfoy.investmentSaladApi.infra.user.UserDao;
import ca.csfoy.investmentSaladApi.infra.user.UserEntity;
import ca.csfoy.investmentSaladApi.security.UserPrincipal;

@ExtendWith(MockitoExtension.class)
public class TagRepositoryHibernateTest {

	@Mock
	TagDao dao;

	@Mock
	TagEntityConverter converter;

	@Mock
	UserDao userDao;

	@Mock
	Authentication auth;

	@InjectMocks
	TagRepositoryHibernate repo;

	private final String ANY_ID = "5eca872a-62ce-3125-90bd-02ec0b6401c3";
	private final String ANY_NAME = "Test";
	private final String ANY_COLOR = "f0f0f0";
	private final int ANY_CONVERTED_HEX_COLOR = 15790320;

	final String ANY_USER_ID = "35553A53-6ce1-425d-96ab-c854631d04f8";

	final UserEntity ANY_USER_ENTITY = new UserEntity(ANY_USER_ID, "account", "anye-mail@mail.com",
			"$2a$10$60kkWBQaqP9GVUvJTmIbZ.j10hMjPE93NSgLPjqrv6muF1OPKZxXe", new RoleEntity("1", Roles.ADMIN.name()));

	private final Tag ANY_TAG = new Tag(ANY_ID, ANY_NAME, Integer.parseInt(ANY_COLOR, 16));
	private final TagEntity ANY_TAG_ENTITY = new TagEntity(ANY_ID, ANY_USER_ENTITY, ANY_NAME, ANY_CONVERTED_HEX_COLOR);
	private final TagId ANY_TAG_ID_KEY = new TagId(ANY_ID, ANY_USER_ID);

	// GET ///////////////////////////////////////////////
	@Test
	void canGetByTagId() {
		// Arrange
		Mockito.when(converter.fromEntityToTag(ANY_TAG_ENTITY)).thenReturn(ANY_TAG);
		Mockito.when(dao.findById(ANY_TAG_ID_KEY)).thenReturn(Optional.of(ANY_TAG_ENTITY));
		// Act
		// Assert
		assertEquals(repo.getBy(ANY_TAG_ID_KEY), ANY_TAG);
		Mockito.verify(converter).fromEntityToTag(ANY_TAG_ENTITY);
	}
	@Test
	void canGetByRegularId() {
		// Arrange
		Mockito.when(converter.fromEntityToTag(ANY_TAG_ENTITY)).thenReturn(ANY_TAG);
		Mockito.when(dao.findById(ANY_TAG_ID_KEY)).thenReturn(Optional.of(ANY_TAG_ENTITY));
		// Act
		// Assert
		assertEquals(repo.getByTagId(ANY_ID), ANY_TAG);
		Mockito.verify(converter).fromEntityToTag(ANY_TAG_ENTITY);
	}
	@Test
	void canManageGetByTagIdAttemptOnInexistantTagId() 
	{
		// Arrange
		Mockito.when(dao.findById(ANY_TAG_ID_KEY)).thenReturn(Optional.empty());
		// Act
		// Assert
		assertThrows(ObjectNotFoundException.class, ()-> repo.getBy(ANY_TAG_ID_KEY));
		Mockito.verifyNoInteractions(converter);
	}
	@Test
	void canGetAll() {
		// Arrange
		mockAuthentication();
		Mockito.when(converter.fromEntityListToTagList(List.of(ANY_TAG_ENTITY))).thenReturn(List.of(ANY_TAG));
		Mockito.when(dao.getAllByUserID(ANY_USER_ID)).thenReturn(List.of(ANY_TAG_ENTITY));
		// Act
		// Assert
		assertEquals(List.of(ANY_TAG), repo.getAllByUserId());
		Mockito.verify(converter).fromEntityListToTagList(List.of(ANY_TAG_ENTITY));
		Mockito.verify(dao).getAllByUserID(ANY_USER_ID);
	}
	// CREATE ///////////////////////////////////////////////
	@Test
	void  canCreate() 
	{
		// Arrange
		mockAuthentication();
		Mockito.when(userDao.getReferenceById(ANY_USER_ID)).thenReturn(ANY_USER_ENTITY);
		Mockito.when(converter.fromTagToEntity(ANY_TAG, ANY_USER_ENTITY)).thenReturn(ANY_TAG_ENTITY);
		Mockito.when(converter.fromEntityToTag(ANY_TAG_ENTITY)).thenReturn(ANY_TAG);
		Mockito.when(dao.findById(ANY_TAG_ID_KEY)).thenReturn(Optional.empty());
		Mockito.when(dao.save(ANY_TAG_ENTITY)).thenReturn(ANY_TAG_ENTITY);
		Mockito.when(dao.getByNameAndColor(ANY_NAME, ANY_CONVERTED_HEX_COLOR, ANY_USER_ID)).thenReturn(List.of());
		// Act
		// Assert	
		assertEquals(ANY_TAG, repo.create(ANY_TAG));
		Mockito.verify(dao).findById(ANY_TAG_ID_KEY);
		Mockito.verify(dao).save(ANY_TAG_ENTITY);
		Mockito.verify(dao).getByNameAndColor(ANY_NAME, ANY_CONVERTED_HEX_COLOR, ANY_USER_ID);
		Mockito.verify(converter).fromTagToEntity(ANY_TAG, ANY_USER_ENTITY);
		Mockito.verify(converter).fromEntityToTag(ANY_TAG_ENTITY);
		Mockito.verify(userDao).getReferenceById(ANY_USER_ID);
	}
	@Test
	void  canManageCreateAttemptOnDuplicatedTagId() 
	{
		// Arrange
		mockAuthentication();
		Mockito.when(dao.findById(ANY_TAG_ID_KEY)).thenReturn(Optional.of(ANY_TAG_ENTITY));
		// Act
		// Assert	
		assertThrows(DuplicateException.class, () -> repo.create(ANY_TAG));
		Mockito.verify(dao).findById(ANY_TAG_ID_KEY);
		Mockito.verifyNoInteractions(converter);
	}
	@Test
	void  canManageCreateAttemptOnDuplicatedTagColorAndName() 
	{
		// Arrange
		mockAuthentication();
		Mockito.when(dao.getByNameAndColor(ANY_NAME, ANY_CONVERTED_HEX_COLOR, ANY_USER_ID)).thenReturn(List.of(ANY_TAG_ENTITY));
		// Act
		// Assert	
		assertThrows(DuplicateException.class, () -> repo.create(ANY_TAG));
		Mockito.verify(dao).findById(ANY_TAG_ID_KEY);
		Mockito.verify(dao).getByNameAndColor(ANY_NAME, ANY_CONVERTED_HEX_COLOR, ANY_USER_ID);
		Mockito.verifyNoInteractions(converter);
	}
	// UPDATE ///////////////////////////////////////////////
	@Test
	void canUpdateByTagId() 
	{
		// Arrange
		mockAuthentication();
		Mockito.when(userDao.getReferenceById(ANY_USER_ID)).thenReturn(ANY_USER_ENTITY);
		Mockito.when(dao.save(ANY_TAG_ENTITY)).thenReturn(ANY_TAG_ENTITY);
		Mockito.when(converter.fromTagToEntity(ANY_TAG, ANY_USER_ENTITY)).thenReturn(ANY_TAG_ENTITY);
		Mockito.when(dao.findById(ANY_TAG_ID_KEY)).thenReturn(Optional.of(ANY_TAG_ENTITY));
		// Act
		// Assert
		assertDoesNotThrow(()-> repo.save(ANY_TAG_ID_KEY, ANY_TAG));
		Mockito.verify(dao).findById(ANY_TAG_ID_KEY);
		Mockito.verify(converter).fromTagToEntity(ANY_TAG, ANY_USER_ENTITY);
		Mockito.verify(dao).save(ANY_TAG_ENTITY);
		Mockito.verify(userDao).getReferenceById(ANY_USER_ID);

	}
	@Test
	void canUpdateByRegularId() 
	{
		// Arrange
		mockAuthentication();
		Mockito.when(userDao.getReferenceById(ANY_USER_ID)).thenReturn(ANY_USER_ENTITY);
		Mockito.when(dao.save(ANY_TAG_ENTITY)).thenReturn(ANY_TAG_ENTITY);
		Mockito.when(converter.fromTagToEntity(ANY_TAG, ANY_USER_ENTITY)).thenReturn(ANY_TAG_ENTITY);
		Mockito.when(dao.findById(ANY_TAG_ID_KEY)).thenReturn(Optional.of(ANY_TAG_ENTITY));
		// Act
		// Assert
		assertDoesNotThrow(()-> repo.saveByTagId(ANY_ID, ANY_TAG));
		Mockito.verify(dao).findById(ANY_TAG_ID_KEY);
		Mockito.verify(converter).fromTagToEntity(ANY_TAG, ANY_USER_ENTITY);
		Mockito.verify(dao).save(ANY_TAG_ENTITY);
		Mockito.verify(userDao).getReferenceById(ANY_USER_ID);

	}
	@Test
	void canManageUpdateAttemptOnInexistantTag() 
	{
		// Arrange
		Mockito.when(dao.findById(ANY_TAG_ID_KEY)).thenReturn(Optional.empty());
		// Act
		// Assert
		assertThrows(ObjectNotFoundException.class, ()-> repo.save(ANY_TAG_ID_KEY, ANY_TAG));
		Mockito.verify(dao).findById(ANY_TAG_ID_KEY);
		Mockito.verifyNoInteractions(converter);
	}
	// DELETE ///////////////////////////////////////////////

	@Test
	void canDeleteByTagId() 
	{
		// Arrange
		Mockito.when(dao.findById(ANY_TAG_ID_KEY)).thenReturn(Optional.of(ANY_TAG_ENTITY));
		Mockito.doNothing().when(dao).deleteById(ANY_TAG_ID_KEY);
		// Act
		// Assert
		assertDoesNotThrow(()->repo.delete(ANY_TAG_ID_KEY));
		Mockito.verifyNoInteractions(converter);
	}
	@Test
	void canDeleteByRegularId() 
	{
		// Arrange
		Mockito.when(dao.findById(ANY_TAG_ID_KEY)).thenReturn(Optional.of(ANY_TAG_ENTITY));
		Mockito.doNothing().when(dao).deleteById(ANY_TAG_ID_KEY);
		// Act
		// Assert
		assertDoesNotThrow(()->repo.deleteByTagId(ANY_ID));
		Mockito.verifyNoInteractions(converter);
	}
	@Test
	void canManageDeleteAttemptOnInnexistantTag() 
	{
		// Arrange
		Mockito.when(dao.findById(ANY_TAG_ID_KEY)).thenReturn(Optional.empty());
		// Act
		// Assert
		assertThrows(ObjectNotFoundException.class, ()-> repo.delete(ANY_TAG_ID_KEY));
		Mockito.verifyNoInteractions(converter);
	}


	private void mockAuthentication() {
		SecurityContext securityContext = Mockito.mock(SecurityContext.class);
		Mockito.when(auth.getPrincipal()).thenReturn(new UserPrincipal(ANY_USER_ENTITY.getId(), ANY_USER_ENTITY.getUsername()));
		Mockito.when(securityContext.getAuthentication()).thenReturn(auth);
		SecurityContextHolder.setContext(securityContext);
	}
}
