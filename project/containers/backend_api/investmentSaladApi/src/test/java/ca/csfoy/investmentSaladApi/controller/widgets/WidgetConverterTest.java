package ca.csfoy.investmentSaladApi.controller.widgets;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;

import ca.csfoy.investmentSaladApi.api.widget.distibution.DistributionWidgetDto;
import ca.csfoy.investmentSaladApi.api.widget.distibution.DistributionWidgetFullDto;
import ca.csfoy.investmentSaladApi.api.widget.net_worth.NetWorthWidgetDto;
import ca.csfoy.investmentSaladApi.api.widget.net_worth.NetWorthWidgetFullDto;
import ca.csfoy.investmentSaladApi.api.widget.watch_list.WatchListWidgetDto;
import ca.csfoy.investmentSaladApi.api.widget.watch_list.WatchListWidgetFullDto;
import ca.csfoy.investmentSaladApi.controller.widget.WidgetConverter;
import ca.csfoy.investmentSaladApi.domain.widget.Widget;
import ca.csfoy.investmentSaladApi.domain.widget.WidgetTypes;
import ca.csfoy.investmentSaladApi.domain.widget.distribution.DistributionWidget;
import ca.csfoy.investmentSaladApi.domain.widget.net_worth.NetWorthWidget;
import ca.csfoy.investmentSaladApi.domain.widget.watch_list.WatchListWidget;

public class WidgetConverterTest {

	private WidgetConverter converter = new WidgetConverter();

	private final String ANY_TAG_ID = "1fb4668d-6d76-4331-9dc6-ab24eca6d720";
	private final String ANY_DASHBOARD_ID = "63479dd8-890b-4812-9b53-18e2ca149039";
	private final String ANY_ID = "63479dd8-890b-4812-9b53-18e2ca149039";
	private final String ANY_NAME = "Any name";
	private final int ANY_POS = 0;
	private final int ANY_DIMENSION = 0;
	private final String ANY_SYMBOL = "AAPL";
	private final String ANY_PERIOD = "Any period";

	private final DistributionWidgetDto ANY_DISTRIBUTION_WIDGET_DTO = new DistributionWidgetDto(ANY_NAME, ANY_POS,
			ANY_POS, ANY_DIMENSION, ANY_DIMENSION, WidgetTypes.DISTRIBUTION, List.of(ANY_TAG_ID));

	private final DistributionWidget ANY_DISTRIBUTION_WIDGET = new DistributionWidget(ANY_ID, ANY_DASHBOARD_ID,
			ANY_NAME, ANY_POS, ANY_POS, ANY_DIMENSION, ANY_DIMENSION, WidgetTypes.DISTRIBUTION, List.of(ANY_TAG_ID));

	private final DistributionWidgetFullDto ANY_DISTRIBUTION_WIDGET_FULL_DTO = new DistributionWidgetFullDto(ANY_ID,
			ANY_DASHBOARD_ID, ANY_NAME, ANY_POS, ANY_POS, ANY_DIMENSION, ANY_DIMENSION, WidgetTypes.DISTRIBUTION,
			List.of(ANY_TAG_ID));

	private final NetWorthWidgetDto ANY_NET_WORTH_WIDGET_DTO = new NetWorthWidgetDto(ANY_NAME, ANY_POS, ANY_POS,
			ANY_DIMENSION, ANY_DIMENSION, WidgetTypes.NET_WORTH, List.of(ANY_TAG_ID), false, ANY_PERIOD);

	private final NetWorthWidgetFullDto ANY_NET_WORTH_WIDGET_FULL_DTO = new NetWorthWidgetFullDto(ANY_ID,
			ANY_DASHBOARD_ID, ANY_NAME, ANY_POS, ANY_POS, ANY_DIMENSION, ANY_DIMENSION, WidgetTypes.NET_WORTH,
			List.of(ANY_TAG_ID), false, ANY_PERIOD);

	private final NetWorthWidget ANY_NET_WORTH_WIDGET = new NetWorthWidget(ANY_ID, ANY_DASHBOARD_ID, ANY_NAME, ANY_POS,
			ANY_POS, ANY_DIMENSION, ANY_DIMENSION, WidgetTypes.NET_WORTH, List.of(ANY_TAG_ID), false, ANY_PERIOD);

	private final WatchListWidgetDto ANY_WATCH_LIST_WIDGET_DTO = new WatchListWidgetDto(ANY_NAME, ANY_POS, ANY_POS,
			ANY_DIMENSION, ANY_DIMENSION, WidgetTypes.WATCH_LIST, List.of(ANY_TAG_ID), List.of(ANY_SYMBOL));

	private final WatchListWidgetFullDto ANY_WATCH_LIST_WIDGET_FULL_DTO = new WatchListWidgetFullDto(ANY_ID,
			ANY_DASHBOARD_ID, ANY_NAME, ANY_POS, ANY_POS, ANY_DIMENSION, ANY_DIMENSION, WidgetTypes.WATCH_LIST,
			List.of(ANY_TAG_ID), List.of(ANY_SYMBOL));

	private final WatchListWidget ANY_WATCH_LIST_WIDGET = new WatchListWidget(ANY_ID, ANY_DASHBOARD_ID, ANY_NAME,
			ANY_POS, ANY_POS, ANY_DIMENSION, ANY_DIMENSION, WidgetTypes.WATCH_LIST, List.of(ANY_TAG_ID),
			List.of(ANY_SYMBOL));

	@Test
	void canConvertFromDtoToDistributionWidget() {
		// Arrange
		final Widget actual = converter.fromDtoToWidget(ANY_DISTRIBUTION_WIDGET_DTO, ANY_DASHBOARD_ID);
		final DistributionWidget expected;
		// Act
		expected = new DistributionWidget(actual.getId(), ANY_DISTRIBUTION_WIDGET.getDashboardId(),
				ANY_DISTRIBUTION_WIDGET.getName(), ANY_DISTRIBUTION_WIDGET.getPosX(), ANY_DISTRIBUTION_WIDGET.getPosY(),
				ANY_DISTRIBUTION_WIDGET.getWidth(), ANY_DISTRIBUTION_WIDGET.getHeight(),
				ANY_DISTRIBUTION_WIDGET.getWidgetType(), ANY_DISTRIBUTION_WIDGET.getTags());
		// Assert
		assertEquals(expected, actual);
	}

	@Test
	void canConvertFromFullDtoToDistributionWidget() {
		// Arrange
		// Act
		// Assert
		assertEquals(ANY_DISTRIBUTION_WIDGET,
				converter.fromFullDtoToWidget(ANY_DISTRIBUTION_WIDGET_FULL_DTO, ANY_DASHBOARD_ID));
	}

	@Test
	void canConvertFromDtoToNetWorthWidget() {
		// Arrange
		final Widget actual = converter.fromDtoToWidget(ANY_NET_WORTH_WIDGET_DTO, ANY_DASHBOARD_ID);
		final NetWorthWidget expected;
		// Act
		expected = new NetWorthWidget(actual.getId(), ANY_NET_WORTH_WIDGET.getDashboardId(),
				ANY_NET_WORTH_WIDGET.getName(), ANY_NET_WORTH_WIDGET.getPosX(), ANY_NET_WORTH_WIDGET.getPosY(),
				ANY_NET_WORTH_WIDGET.getWidth(), ANY_NET_WORTH_WIDGET.getHeight(), ANY_NET_WORTH_WIDGET.getWidgetType(),
				ANY_NET_WORTH_WIDGET.getTags(), ANY_NET_WORTH_WIDGET.isDetailChart(), ANY_NET_WORTH_WIDGET.getPeriod());
		// Assert
		assertEquals(expected, actual);
	}

	@Test
	void canConvertFromFullDtoToNetWorthWidget() {
		// Arrange
		// Act
		// Assert
		assertEquals(ANY_NET_WORTH_WIDGET,
				converter.fromFullDtoToWidget(ANY_NET_WORTH_WIDGET_FULL_DTO, ANY_DASHBOARD_ID));
	}

	@Test
	void canConvertFromDtoToWatchListWidget() {
		// Arrange
		final Widget actual = converter.fromDtoToWidget(ANY_WATCH_LIST_WIDGET_DTO, ANY_DASHBOARD_ID);
		final WatchListWidget expected;
		// Act
		expected = new WatchListWidget(actual.getId(), ANY_WATCH_LIST_WIDGET.getDashboardId(),
				ANY_WATCH_LIST_WIDGET.getName(), ANY_WATCH_LIST_WIDGET.getPosX(), ANY_WATCH_LIST_WIDGET.getPosY(),
				ANY_WATCH_LIST_WIDGET.getWidth(), ANY_WATCH_LIST_WIDGET.getHeight(),
				ANY_WATCH_LIST_WIDGET.getWidgetType(), ANY_WATCH_LIST_WIDGET.getTags(),
				ANY_WATCH_LIST_WIDGET.getSymbols());
		// Assert
		assertEquals(expected, actual);
	}

	@Test
	void canConvertFromFullDtoToWatchListWidget() {
		// Arrange
		// Act
		// Assert
		assertEquals(ANY_WATCH_LIST_WIDGET,
				converter.fromFullDtoToWidget(ANY_WATCH_LIST_WIDGET_FULL_DTO, ANY_DASHBOARD_ID));
	}

	@Test
	void canConvertWatchListWidgetToFullDto() {
		// Arrange
		// Act
		// Assert
		assertEquals(ANY_WATCH_LIST_WIDGET_FULL_DTO, converter.fromWidgetToFullDto(ANY_WATCH_LIST_WIDGET));
	}

	@Test
	void canConvertNetWorthWidgetToFullDto() {
		// Arrange
		// Act
		// Assert
		assertEquals(ANY_NET_WORTH_WIDGET_FULL_DTO, converter.fromWidgetToFullDto(ANY_NET_WORTH_WIDGET));
	}

	@Test
	void canConvertDistributionWidgetToFullDto() {
		// Arrange
		// Act
		// Assert
		assertEquals(ANY_DISTRIBUTION_WIDGET_FULL_DTO, converter.fromWidgetToFullDto(ANY_DISTRIBUTION_WIDGET));
	}

}
