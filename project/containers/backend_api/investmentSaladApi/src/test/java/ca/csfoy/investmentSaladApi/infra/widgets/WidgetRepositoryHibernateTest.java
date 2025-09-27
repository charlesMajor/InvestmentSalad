package ca.csfoy.investmentSaladApi.infra.widgets;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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
import ca.csfoy.investmentSaladApi.domain.widget.WidgetTypes;
import ca.csfoy.investmentSaladApi.domain.widget.distribution.DistributionWidget;
import ca.csfoy.investmentSaladApi.domain.widget.net_worth.NetWorthWidget;
import ca.csfoy.investmentSaladApi.domain.widget.watch_list.WatchListWidget;
import ca.csfoy.investmentSaladApi.infra.dashboard.DashboardDao;
import ca.csfoy.investmentSaladApi.infra.dashboard.DashboardEntity;
import ca.csfoy.investmentSaladApi.infra.role.RoleEntity;
import ca.csfoy.investmentSaladApi.infra.tag.TagDao;
import ca.csfoy.investmentSaladApi.infra.tag.TagEntity;
import ca.csfoy.investmentSaladApi.infra.tag.TagId;
import ca.csfoy.investmentSaladApi.infra.user.UserEntity;
import ca.csfoy.investmentSaladApi.infra.widget.WidgetDao;
import ca.csfoy.investmentSaladApi.infra.widget.WidgetEntityConverter;
import ca.csfoy.investmentSaladApi.infra.widget.WidgetRepositoryHibernate;
import ca.csfoy.investmentSaladApi.infra.widget.distribution.DistributionWidgetEntity;
import ca.csfoy.investmentSaladApi.infra.widget.net_worth.NetWorthWidgetEntity;
import ca.csfoy.investmentSaladApi.infra.widget.watch_list.WatchListWidgetEntity;
import ca.csfoy.investmentSaladApi.security.UserPrincipal;

@ExtendWith(MockitoExtension.class)

public class WidgetRepositoryHibernateTest {

	@Mock
	Authentication auth;

	@Mock
	WidgetDao dao;

	@Mock
	TagDao tagdao;

	@Mock
	DashboardDao dashboardDao;

	@Mock
	WidgetEntityConverter converter;

	@InjectMocks
	WidgetRepositoryHibernate repo;

	private final String ANY_TAG_ID = "1fb4668d-6d76-4331-9dc6-ab24eca6d720";
	private final String ANY_DASHBOARD_ID = "63479dd8-890b-4812-9b53-18e2ca149039";
	private final String ANY_ID = "63479dd8-890b-4812-9b53-18e2ca149039";
	private final String ANY_NAME = "Test";
	private final int ANY_CONVERTED_HEX_COLOR = 15790320;

	final String ANY_USER_ID = "35553A53-6ce1-425d-96ab-c854631d04f8";

	final UserEntity ANY_USER_ENTITY = new UserEntity(ANY_USER_ID, "account", "anye-mail@mail.com",
			"$2a$10$60kkWBQaqP9GVUvJTmIbZ.j10hMjPE93NSgLPjqrv6muF1OPKZxXe", new RoleEntity("1", Roles.ADMIN.name()));

	private final TagEntity ANY_TAG_ENTITY = new TagEntity(ANY_TAG_ID, ANY_USER_ENTITY, ANY_NAME,
			ANY_CONVERTED_HEX_COLOR);

	private final Set<TagEntity> tagSet = new HashSet<TagEntity>(List.of(ANY_TAG_ENTITY));

	private final DashboardEntity ANY_DASHBOARD_ENTITY = new DashboardEntity(ANY_DASHBOARD_ID, ANY_USER_ENTITY);

	private final TagId ANY_TAG_ID_KEY = new TagId(ANY_TAG_ID, ANY_USER_ID);

	private final DistributionWidget ANY_DISTRIBUTION_WIDGET = new DistributionWidget(ANY_ID, ANY_DASHBOARD_ID,
			"Any name", 0, 0, 0, 0, WidgetTypes.DISTRIBUTION, List.of(ANY_TAG_ID));

	private final DistributionWidgetEntity ANY_DISTRIBUTION_WIDGET_ENTITY = new DistributionWidgetEntity(ANY_ID,
			"Any name", ANY_DASHBOARD_ENTITY, 0, 0, 0, 0, WidgetTypes.DISTRIBUTION, tagSet);

	private final NetWorthWidget ANY_NET_WORTH_WIDGET = new NetWorthWidget(ANY_ID, ANY_DASHBOARD_ID, "Any name", 0, 0,
			0, 0, WidgetTypes.NET_WORTH, List.of(ANY_TAG_ID), false, "any period");

	private final NetWorthWidgetEntity ANY_NET_WORTH_WIDGET_ENTITY = new NetWorthWidgetEntity(ANY_ID, "Any name",
			ANY_DASHBOARD_ENTITY, 0, 0, 0, 0, WidgetTypes.NET_WORTH, tagSet, false, "any period");

	private final WatchListWidgetEntity ANY_WATCH_LIST_WIDGET_ENTITY = new WatchListWidgetEntity(ANY_ID, "Any name",
			ANY_DASHBOARD_ENTITY, 0, 0, 0, 0, WidgetTypes.NET_WORTH, tagSet, List.of("AAPL"));

	private final WatchListWidget ANY_WATCH_LIST_WIDGET = new WatchListWidget(ANY_ID, ANY_DASHBOARD_ID, "Any name", 0,
			0, 0, 0, WidgetTypes.NET_WORTH, List.of(ANY_TAG_ID), List.of("AAPL"));

	private void verifyMiscMocks() {
		Mockito.verify(dashboardDao).getOneByDashboardIdAndUserID(ANY_DASHBOARD_ID, ANY_USER_ID);
		Mockito.verify(tagdao).findById(ANY_TAG_ID_KEY);
	}

	// GET ///////////////////////////////////////////////
	@Test
	void canGetAll() {
		// Arrange
		mockAuthentication();
		Mockito.when(converter.fromEntityToWidget(ANY_DISTRIBUTION_WIDGET_ENTITY)).thenReturn(ANY_DISTRIBUTION_WIDGET);
		Mockito.when(dashboardDao.getOneByUserID(ANY_USER_ID)).thenReturn(ANY_DASHBOARD_ENTITY);
		Mockito.when(dao.getAllByUserId(ANY_DASHBOARD_ENTITY)).thenReturn(List.of(ANY_ID));
		Mockito.when(dao.findAllById(List.of(ANY_ID))).thenReturn(List.of(ANY_DISTRIBUTION_WIDGET_ENTITY));
		// Act
		// Assert
		assertEquals(List.of(ANY_DISTRIBUTION_WIDGET), repo.getAll());
		Mockito.verify(dao).getAllByUserId(ANY_DASHBOARD_ENTITY);
		Mockito.verify(dao).findAllById(List.of(ANY_ID));
		Mockito.verify(dashboardDao).getOneByUserID(ANY_USER_ID);
		Mockito.verify(converter).fromEntityToWidget(ANY_DISTRIBUTION_WIDGET_ENTITY);

	}

	@Test
	void canGetById() {
		// Arrange
		Mockito.when(dao.findById(ANY_ID)).thenReturn(Optional.of(ANY_WATCH_LIST_WIDGET_ENTITY));
		Mockito.when(converter.fromEntityToWidget(ANY_WATCH_LIST_WIDGET_ENTITY)).thenReturn(ANY_WATCH_LIST_WIDGET);
		// Act
		// Assert
		assertEquals(ANY_WATCH_LIST_WIDGET, repo.getBy(ANY_ID));
		Mockito.verify(converter).fromEntityToWidget(ANY_WATCH_LIST_WIDGET_ENTITY);
		Mockito.verify(dao).findById(ANY_ID);
		Mockito.verifyNoInteractions(tagdao);
		Mockito.verifyNoInteractions(dashboardDao);

	}

	@Test
	void canManageGetAttemptWithInexistentWidget() {
		// Arrange
		Mockito.when(dao.findById(ANY_ID)).thenReturn(Optional.empty());
		// Act
		// Assert
		assertThrows(ObjectNotFoundException.class, () -> repo.getBy(ANY_ID));
		Mockito.verifyNoInteractions(tagdao);
		Mockito.verifyNoInteractions(dashboardDao);
		Mockito.verifyNoInteractions(converter);

	}

	@Test
	void canManageGetAttemptWithInexistantDashboard() {
		// Arrange
		mockAuthentication();
		Mockito.when(dashboardDao.getOneByUserID(ANY_USER_ID)).thenReturn(null);
		// Act
		assertThrows(ObjectNotFoundException.class, () -> repo.getAll());
		// Assert
		Mockito.verifyNoInteractions(converter);
		Mockito.verifyNoInteractions(tagdao);
		Mockito.verifyNoInteractions(dao);
	}

	// CREATE ///////////////////////////////////////////////
	@Test
	void canCreateDistributionWidget() {
		// Arrange
		mockAuthentication();
		Mockito.when(dashboardDao.getOneByDashboardIdAndUserID(ANY_DASHBOARD_ID, ANY_USER_ID))
				.thenReturn(ANY_DASHBOARD_ENTITY);
		Mockito.when(converter.fromWidgetToEntity(ANY_DISTRIBUTION_WIDGET, ANY_DASHBOARD_ENTITY, tagSet))
				.thenReturn(ANY_DISTRIBUTION_WIDGET_ENTITY);
		Mockito.when(converter.fromEntityToWidget(ANY_DISTRIBUTION_WIDGET_ENTITY)).thenReturn(ANY_DISTRIBUTION_WIDGET);
		Mockito.when(dao.save(ANY_DISTRIBUTION_WIDGET_ENTITY)).thenReturn(ANY_DISTRIBUTION_WIDGET_ENTITY);
		Mockito.when(tagdao.findById(ANY_TAG_ID_KEY)).thenReturn(Optional.of(ANY_TAG_ENTITY));

		// Act
		// Assert
		assertEquals(ANY_DISTRIBUTION_WIDGET, repo.create(ANY_DISTRIBUTION_WIDGET));
		verifyMiscMocks();
		Mockito.verify(converter).fromWidgetToEntity(ANY_DISTRIBUTION_WIDGET, ANY_DASHBOARD_ENTITY, tagSet);
		Mockito.verify(converter).fromEntityToWidget(ANY_DISTRIBUTION_WIDGET_ENTITY);
		Mockito.verify(dao).save(ANY_DISTRIBUTION_WIDGET_ENTITY);

	}

	@Test
	void canCreateNetWorthWidget() {
		// Arrange
		mockAuthentication();
		Mockito.when(dashboardDao.getOneByDashboardIdAndUserID(ANY_DASHBOARD_ID, ANY_USER_ID))
				.thenReturn(ANY_DASHBOARD_ENTITY);
		Mockito.when(converter.fromWidgetToEntity(ANY_NET_WORTH_WIDGET, ANY_DASHBOARD_ENTITY, tagSet))
				.thenReturn(ANY_NET_WORTH_WIDGET_ENTITY);
		Mockito.when(converter.fromEntityToWidget(ANY_NET_WORTH_WIDGET_ENTITY)).thenReturn(ANY_DISTRIBUTION_WIDGET);
		Mockito.when(dao.save(ANY_NET_WORTH_WIDGET_ENTITY)).thenReturn(ANY_NET_WORTH_WIDGET_ENTITY);
		Mockito.when(tagdao.findById(ANY_TAG_ID_KEY)).thenReturn(Optional.of(ANY_TAG_ENTITY));

		// Act
		// Assert
		assertEquals(ANY_DISTRIBUTION_WIDGET, repo.create(ANY_NET_WORTH_WIDGET));
		verifyMiscMocks();
		Mockito.verify(converter).fromWidgetToEntity(ANY_NET_WORTH_WIDGET, ANY_DASHBOARD_ENTITY, tagSet);
		Mockito.verify(converter).fromEntityToWidget(ANY_NET_WORTH_WIDGET_ENTITY);
		Mockito.verify(dao).save(ANY_NET_WORTH_WIDGET_ENTITY);

	}

	@Test
	void canCreateWatchListWidget() {
		// Arrange
		mockAuthentication();
		Mockito.when(dashboardDao.getOneByDashboardIdAndUserID(ANY_DASHBOARD_ID, ANY_USER_ID))
				.thenReturn(ANY_DASHBOARD_ENTITY);
		Mockito.when(converter.fromWidgetToEntity(ANY_WATCH_LIST_WIDGET, ANY_DASHBOARD_ENTITY, tagSet))
				.thenReturn(ANY_WATCH_LIST_WIDGET_ENTITY);
		Mockito.when(converter.fromEntityToWidget(ANY_WATCH_LIST_WIDGET_ENTITY)).thenReturn(ANY_WATCH_LIST_WIDGET);
		Mockito.when(dao.save(ANY_WATCH_LIST_WIDGET_ENTITY)).thenReturn(ANY_WATCH_LIST_WIDGET_ENTITY);
		Mockito.when(tagdao.findById(ANY_TAG_ID_KEY)).thenReturn(Optional.of(ANY_TAG_ENTITY));

		// Act
		// Assert
		assertEquals(ANY_WATCH_LIST_WIDGET, repo.create(ANY_WATCH_LIST_WIDGET));
		verifyMiscMocks();
		Mockito.verify(converter).fromWidgetToEntity(ANY_WATCH_LIST_WIDGET, ANY_DASHBOARD_ENTITY, tagSet);
		Mockito.verify(converter).fromEntityToWidget(ANY_WATCH_LIST_WIDGET_ENTITY);
		Mockito.verify(dao).save(ANY_WATCH_LIST_WIDGET_ENTITY);

	}

	@Test
	void canManageCreateAttemptWithInexistentDashboard() {
		// Arrange
		mockAuthentication();
		Mockito.when(dashboardDao.getOneByDashboardIdAndUserID(ANY_DASHBOARD_ID, ANY_USER_ID)).thenReturn(null);
		// Act
		// Assert
		assertThrows(ObjectNotFoundException.class, () -> repo.create(ANY_NET_WORTH_WIDGET));
		Mockito.verifyNoInteractions(converter);
		Mockito.verifyNoInteractions(tagdao);
	}

	@Test
	void canManageCreateAttemptWithDuplicatedWidget() {
		// Arrange
		mockAuthentication();
		Mockito.when(dashboardDao.getOneByDashboardIdAndUserID(ANY_DASHBOARD_ID, ANY_USER_ID))
				.thenReturn(ANY_DASHBOARD_ENTITY);
		Mockito.when(dao.findById(ANY_ID)).thenReturn(Optional.of(ANY_NET_WORTH_WIDGET_ENTITY));
		// Act
		// Assert
		assertThrows(DuplicateException.class, () -> repo.create(ANY_NET_WORTH_WIDGET));
		Mockito.verifyNoInteractions(converter);
		Mockito.verifyNoInteractions(tagdao);
	}

	// UPDATE ///////////////////////////////////////////////
	@Test
	void canUpdateDristributionWidget() {
		// Arrange
		mockAuthentication();
		Mockito.when(dashboardDao.getOneByDashboardIdAndUserID(ANY_DASHBOARD_ID, ANY_USER_ID))
				.thenReturn(ANY_DASHBOARD_ENTITY);
		Mockito.when(converter.fromWidgetToEntity(ANY_DISTRIBUTION_WIDGET, ANY_DASHBOARD_ENTITY, tagSet))
				.thenReturn(ANY_DISTRIBUTION_WIDGET_ENTITY);
		Mockito.when(dao.save(ANY_DISTRIBUTION_WIDGET_ENTITY)).thenReturn(ANY_DISTRIBUTION_WIDGET_ENTITY);
		Mockito.when(dao.findById(ANY_ID)).thenReturn(Optional.of(ANY_DISTRIBUTION_WIDGET_ENTITY));
		Mockito.when(tagdao.findById(ANY_TAG_ID_KEY)).thenReturn(Optional.of(ANY_TAG_ENTITY));
		// Act
		// Assert
		assertDoesNotThrow(() -> repo.save(ANY_ID, ANY_DISTRIBUTION_WIDGET));
		verifyMiscMocks();
		Mockito.verify(converter).fromWidgetToEntity(ANY_DISTRIBUTION_WIDGET, ANY_DASHBOARD_ENTITY, tagSet);
		Mockito.verify(dao).save(ANY_DISTRIBUTION_WIDGET_ENTITY);
	}

	@Test
	void canUpdateNetWorthWidget() {
		// Arrange
		mockAuthentication();
		Mockito.when(dashboardDao.getOneByDashboardIdAndUserID(ANY_DASHBOARD_ID, ANY_USER_ID))
				.thenReturn(ANY_DASHBOARD_ENTITY);
		Mockito.when(converter.fromWidgetToEntity(ANY_NET_WORTH_WIDGET, ANY_DASHBOARD_ENTITY, tagSet))
				.thenReturn(ANY_NET_WORTH_WIDGET_ENTITY);
		Mockito.when(dao.save(ANY_NET_WORTH_WIDGET_ENTITY)).thenReturn(ANY_NET_WORTH_WIDGET_ENTITY);
		Mockito.when(dao.findById(ANY_ID)).thenReturn(Optional.of(ANY_NET_WORTH_WIDGET_ENTITY));
		Mockito.when(tagdao.findById(ANY_TAG_ID_KEY)).thenReturn(Optional.of(ANY_TAG_ENTITY));
		// Act
		// Assert
		assertDoesNotThrow(() -> repo.save(ANY_ID, ANY_NET_WORTH_WIDGET));
		verifyMiscMocks();
		Mockito.verify(converter).fromWidgetToEntity(ANY_NET_WORTH_WIDGET, ANY_DASHBOARD_ENTITY, tagSet);
		Mockito.verify(dao).save(ANY_NET_WORTH_WIDGET_ENTITY);
	}

	@Test
	void canUpdateWatchListWidget() {
		// Arrange
		mockAuthentication();
		Mockito.when(dashboardDao.getOneByDashboardIdAndUserID(ANY_DASHBOARD_ID, ANY_USER_ID))
				.thenReturn(ANY_DASHBOARD_ENTITY);
		Mockito.when(converter.fromWidgetToEntity(ANY_WATCH_LIST_WIDGET, ANY_DASHBOARD_ENTITY, tagSet))
				.thenReturn(ANY_WATCH_LIST_WIDGET_ENTITY);
		Mockito.when(dao.save(ANY_WATCH_LIST_WIDGET_ENTITY)).thenReturn(ANY_WATCH_LIST_WIDGET_ENTITY);
		Mockito.when(dao.findById(ANY_ID)).thenReturn(Optional.of(ANY_WATCH_LIST_WIDGET_ENTITY));
		Mockito.when(tagdao.findById(ANY_TAG_ID_KEY)).thenReturn(Optional.of(ANY_TAG_ENTITY));
		// Act
		// Assert
		assertDoesNotThrow(() -> repo.save(ANY_ID, ANY_WATCH_LIST_WIDGET));
		verifyMiscMocks();
		Mockito.verify(converter).fromWidgetToEntity(ANY_WATCH_LIST_WIDGET, ANY_DASHBOARD_ENTITY, tagSet);
		Mockito.verify(dao).save(ANY_WATCH_LIST_WIDGET_ENTITY);
	}

	@Test
	void canManageUpdateAttemptOnInexistentWidget() {
		// Arrange
		Mockito.when(dao.findById(ANY_ID)).thenReturn(Optional.empty());
		// Act
		// Assert
		assertThrows(ObjectNotFoundException.class, () -> repo.save(ANY_DASHBOARD_ID, ANY_DISTRIBUTION_WIDGET));
		Mockito.verifyNoInteractions(converter);
		Mockito.verifyNoInteractions(tagdao);
		Mockito.verifyNoInteractions(dashboardDao);
	}

	@Test
	void canManageUpdateAttemptOnInexistentDashboard() {
		// Arrange
		Mockito.when(dao.findById(ANY_ID)).thenReturn(Optional.of(ANY_DISTRIBUTION_WIDGET_ENTITY));
		Mockito.when(dashboardDao.getOneByDashboardIdAndUserID(ANY_DASHBOARD_ID, ANY_USER_ID)).thenReturn(null);
		// Act
		// Assert
		assertThrows(ObjectNotFoundException.class, () -> repo.save(ANY_DASHBOARD_ID, ANY_DISTRIBUTION_WIDGET));
		Mockito.verifyNoInteractions(converter);
		Mockito.verifyNoInteractions(tagdao);
	}

	// DELETE ///////////////////////////////////////////////
	@Test
	void canDeleteWidget() {
		// Arrange
		Mockito.when(dao.findById(ANY_ID)).thenReturn(Optional.of(ANY_NET_WORTH_WIDGET_ENTITY));
		Mockito.doNothing().when(dao).delete(ANY_NET_WORTH_WIDGET_ENTITY);
		// Act
		// Assert
		assertDoesNotThrow(() -> repo.delete(ANY_ID));
		Mockito.verify(dao).findById(ANY_ID);
		Mockito.verifyNoInteractions(converter);
		Mockito.verifyNoInteractions(dashboardDao);
		Mockito.verifyNoInteractions(tagdao);
	}

	@Test
	void canManageDeleteAttemptOnInexistentWidget() {
		// Arrange
		Mockito.when(dao.findById(ANY_ID)).thenReturn(Optional.empty());
		// Act
		// Assert
		assertThrows(ObjectNotFoundException.class, () -> repo.delete(ANY_ID));
		Mockito.verifyNoInteractions(converter);
		Mockito.verifyNoInteractions(dashboardDao);
		Mockito.verifyNoInteractions(tagdao);
		Mockito.verify(dao).findById(ANY_ID);

	}

	// MISC ///////////////////////////////////////////////

	@Test
	void canManageGetWidgetTagsWithWrongId() {
		// Arrange
		mockAuthentication();
		Mockito.when(tagdao.findById(ANY_TAG_ID_KEY)).thenReturn(Optional.empty());
		Mockito.when(dashboardDao.getOneByDashboardIdAndUserID(ANY_DASHBOARD_ID, ANY_USER_ID))
				.thenReturn(ANY_DASHBOARD_ENTITY);
		// Act
		// Assert
		assertThrows(ObjectNotFoundException.class, () -> repo.create(ANY_DISTRIBUTION_WIDGET));
		Mockito.verifyNoInteractions(converter);
		verifyMiscMocks();
	}

	private void mockAuthentication() {
		SecurityContext securityContext = Mockito.mock(SecurityContext.class);
		Mockito.when(auth.getPrincipal())
				.thenReturn(new UserPrincipal(ANY_USER_ENTITY.getId(), ANY_USER_ENTITY.getUsername()));
		Mockito.when(securityContext.getAuthentication()).thenReturn(auth);
		SecurityContextHolder.setContext(securityContext);
	}

}
