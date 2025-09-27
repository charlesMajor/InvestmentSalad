package ca.csfoy.investmentSaladApi.infra.widgets;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.Test;

import ca.csfoy.investmentSaladApi.domain.Roles;
import ca.csfoy.investmentSaladApi.domain.widget.WidgetTypes;
import ca.csfoy.investmentSaladApi.domain.widget.distribution.DistributionWidget;
import ca.csfoy.investmentSaladApi.domain.widget.net_worth.NetWorthWidget;
import ca.csfoy.investmentSaladApi.domain.widget.watch_list.WatchListWidget;
import ca.csfoy.investmentSaladApi.infra.dashboard.DashboardEntity;
import ca.csfoy.investmentSaladApi.infra.role.RoleEntity;
import ca.csfoy.investmentSaladApi.infra.tag.TagEntity;
import ca.csfoy.investmentSaladApi.infra.tag.TagId;
import ca.csfoy.investmentSaladApi.infra.user.UserEntity;
import ca.csfoy.investmentSaladApi.infra.widget.WidgetEntityConverter;
import ca.csfoy.investmentSaladApi.infra.widget.distribution.DistributionWidgetEntity;
import ca.csfoy.investmentSaladApi.infra.widget.net_worth.NetWorthWidgetEntity;
import ca.csfoy.investmentSaladApi.infra.widget.watch_list.WatchListWidgetEntity;

public class WidgetEntityConverterTests {

	private final WidgetEntityConverter converter = new WidgetEntityConverter();

	private final String ANY_TAG_ID = "1fb4668d-6d76-4331-9dc6-ab24eca6d720";
	private final String ANY_USER_ID = "35553A53-6ce1-425d-96ab-c854631d04f8";
	private final String ANY_DASHBOARD_ID = "63479dd8-890b-4812-9b53-18e2ca149039";
	private final String ANY_ID = "63479dd8-890b-4812-9b53-18e2ca149039";
	private final String ANY_NAME = "Any name";
	private final String ANY_EMAIL = "anye-mail@mail.com";
	private final String ANY_PASSWORD = "$2a$10$60kkWBQaqP9GVUvJTmIbZ.j10hMjPE93NSgLPjqrv6muF1OPKZxXe";
	private final String ANY_USERNAME = "Username1234";
	private final String ANY_SYMBOL = "AAPL";
	private final String ANY_PERIOD = "Any period";

	private final int ANY_CONVERTED_HEX_COLOR = 15790320;
	private final int ANY_POS = 0;
	private final int ANY_DIMENSION = 0;

	final UserEntity ANY_USER_ENTITY = new UserEntity(ANY_USER_ID, ANY_USERNAME, ANY_EMAIL, ANY_PASSWORD,
			new RoleEntity("1", Roles.ADMIN.name()));

	private final TagEntity ANY_TAG_ENTITY = new TagEntity(ANY_TAG_ID, ANY_USER_ENTITY, ANY_NAME,
			ANY_CONVERTED_HEX_COLOR);

	private final Set<TagEntity> tagSet = new HashSet<TagEntity>(List.of(ANY_TAG_ENTITY));

	private final DashboardEntity ANY_DASHBOARD_ENTITY = new DashboardEntity(ANY_DASHBOARD_ID, ANY_USER_ENTITY);

	private final TagId ANY_TAG_ID_KEY = new TagId(ANY_TAG_ID, ANY_USER_ID);

	private final DistributionWidget ANY_DISTRIBUTION_WIDGET = new DistributionWidget(ANY_ID, ANY_DASHBOARD_ID,
			ANY_NAME, ANY_POS, ANY_POS, ANY_DIMENSION, ANY_DIMENSION, WidgetTypes.DISTRIBUTION, List.of(ANY_TAG_ID));

	private final DistributionWidgetEntity ANY_DISTRIBUTION_WIDGET_ENTITY = new DistributionWidgetEntity(ANY_ID,
			ANY_NAME, ANY_DASHBOARD_ENTITY, ANY_POS, ANY_POS, ANY_DIMENSION, ANY_DIMENSION, WidgetTypes.DISTRIBUTION,
			tagSet);

	private final NetWorthWidget ANY_NET_WORTH_WIDGET = new NetWorthWidget(ANY_ID, ANY_DASHBOARD_ID, ANY_NAME, ANY_POS,
			ANY_POS, ANY_DIMENSION, ANY_DIMENSION, WidgetTypes.NET_WORTH, List.of(ANY_TAG_ID), false, ANY_PERIOD);

	private final NetWorthWidgetEntity ANY_NET_WORTH_WIDGET_ENTITY = new NetWorthWidgetEntity(ANY_ID, ANY_NAME,
			ANY_DASHBOARD_ENTITY, ANY_POS, ANY_POS, ANY_DIMENSION, ANY_DIMENSION, WidgetTypes.NET_WORTH, tagSet, false,
			ANY_PERIOD);

	private final WatchListWidgetEntity ANY_WATCH_LIST_WIDGET_ENTITY = new WatchListWidgetEntity(ANY_ID, ANY_NAME,
			ANY_DASHBOARD_ENTITY, ANY_POS, ANY_POS, ANY_DIMENSION, ANY_DIMENSION, WidgetTypes.WATCH_LIST, tagSet,
			List.of(ANY_SYMBOL));

	private final WatchListWidget ANY_WATCH_LIST_WIDGET = new WatchListWidget(ANY_ID, ANY_DASHBOARD_ID, ANY_NAME,
			ANY_POS, ANY_POS, ANY_DIMENSION, ANY_DIMENSION, WidgetTypes.WATCH_LIST, List.of(ANY_TAG_ID),
			List.of(ANY_SYMBOL));

	@Test
	void canConvertFromEntityToDistributionWidget() {
		// Arrange
		// Act
		// Assert
		assertEquals(ANY_DISTRIBUTION_WIDGET, converter.fromEntityToWidget(ANY_DISTRIBUTION_WIDGET_ENTITY));
	}

	@Test
	void canConvertFromEntityToNetWorthWidget() {
		// Arrange
		// Act
		// Assert
		assertEquals(ANY_NET_WORTH_WIDGET, converter.fromEntityToWidget(ANY_NET_WORTH_WIDGET_ENTITY));
	}

	@Test
	void canConvertFromEntityToWatchListWidget() {
		// Arrange
		// Act
		// Assert
		assertEquals(ANY_WATCH_LIST_WIDGET, converter.fromEntityToWidget(ANY_WATCH_LIST_WIDGET_ENTITY));
	}

	@Test
	void canConvertFromDistributionWidgetToEntity() {
		// Arrange
		// Act
		// Assert
		assertEquals(ANY_DISTRIBUTION_WIDGET_ENTITY, converter.fromWidgetToEntity(ANY_DISTRIBUTION_WIDGET, ANY_DASHBOARD_ENTITY, tagSet));
	}

	@Test
	void canConvertFromNetWorthWidgetToEntity() {
		// Arrange
		// Act
		// Assert
		assertEquals(ANY_NET_WORTH_WIDGET_ENTITY, converter.fromWidgetToEntity(ANY_NET_WORTH_WIDGET, ANY_DASHBOARD_ENTITY, tagSet));

	}

	@Test
	void canConvertFromWatchListWidgetToEntity() {
		// Arrange
		// Act
		// Assert
		assertEquals(ANY_WATCH_LIST_WIDGET_ENTITY, converter.fromWidgetToEntity(ANY_WATCH_LIST_WIDGET, ANY_DASHBOARD_ENTITY, tagSet));

	}

}
