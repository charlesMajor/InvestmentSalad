package ca.csfoy.investmentSaladApi.controller.widgets.watch_list;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import ca.csfoy.investmentSaladApi.api.widget.watch_list.WatchListWidgetDto;
import ca.csfoy.investmentSaladApi.api.widget.watch_list.WatchListWidgetFullDto;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.InputValidationException;
import ca.csfoy.investmentSaladApi.controller.validations.ValidatorFactory;
import ca.csfoy.investmentSaladApi.controller.validations.widgets.WidgetDtoCustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.widgets.WidgetFullDtoCustomValidator;
import ca.csfoy.investmentSaladApi.controller.widget.WidgetController;
import ca.csfoy.investmentSaladApi.controller.widget.WidgetConverter;
import ca.csfoy.investmentSaladApi.domain.widget.WidgetRepository;
import ca.csfoy.investmentSaladApi.domain.widget.WidgetTypes;
import ca.csfoy.investmentSaladApi.domain.widget.watch_list.WatchListWidget;
import jakarta.validation.Validation;
@ExtendWith(MockitoExtension.class)

public class WatchListWidgetControllerTest {
	@Mock
	private ValidatorFactory validatorFactory;

	@Mock
	private WidgetRepository repo;

	@Mock
	private WidgetConverter converter;

	@InjectMocks
	private WidgetController controller;

	private final String ANY_TAG_ID = "1fb4668d-6d76-4331-9dc6-ab24eca6d720";
	private final String ANY_DASHBOARD_ID = "63479dd8-890b-4812-9b53-18e2ca149039";
	private final String ANY_ID = "63479dd8-890b-4812-9b53-18e2ca149039";

	private final WatchListWidgetDto ANY_WATCH_LIST_WIDGET_DTO = new WatchListWidgetDto("Any name", 0, 0, 1, 1,
			WidgetTypes.WATCH_LIST, List.of(ANY_TAG_ID),List.of("AAPL"));
	
	private final WatchListWidgetFullDto ANY_WATCH_LIST_WIDGET_FULL_DTO = new WatchListWidgetFullDto(ANY_ID,
			ANY_DASHBOARD_ID, "Any name", 0, 0, 1, 1, WidgetTypes.WATCH_LIST, List.of(ANY_TAG_ID), List.of("AAPL"));

	private final WatchListWidget ANY_WATCH_LIST_WIDGET = new WatchListWidget (ANY_ID, ANY_DASHBOARD_ID, "Any name", 0, 0,
			1, 1, WidgetTypes.WATCH_LIST, List.of(ANY_TAG_ID), List.of("AAPL"));

	// CREATE ///////////////////////////////////////////////
	@Test
	void canCreateWatchListWidget() {
		// Arrange
		Mockito.when(converter.fromDtoToWidget(ANY_WATCH_LIST_WIDGET_DTO, ANY_DASHBOARD_ID))
				.thenReturn(ANY_WATCH_LIST_WIDGET);
		Mockito.when(converter.fromWidgetToFullDto(ANY_WATCH_LIST_WIDGET)).thenReturn(ANY_WATCH_LIST_WIDGET_FULL_DTO);
		Mockito.when(repo.create(ANY_WATCH_LIST_WIDGET)).thenReturn(ANY_WATCH_LIST_WIDGET);
		Mockito.when(validatorFactory.getWidgetDtoValidator())
				.thenReturn(new WidgetDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		assertEquals(ANY_WATCH_LIST_WIDGET_FULL_DTO,
				controller.createWatchListWidget(ANY_WATCH_LIST_WIDGET_DTO, ANY_DASHBOARD_ID));
		Mockito.verify(converter).fromWidgetToFullDto(ANY_WATCH_LIST_WIDGET);
		Mockito.verify(converter).fromDtoToWidget(ANY_WATCH_LIST_WIDGET_DTO, ANY_DASHBOARD_ID);
		Mockito.verify(repo).create(ANY_WATCH_LIST_WIDGET);
		Mockito.verify(validatorFactory).getWidgetDtoValidator();
	}

	@Test
	void canManageCreateWatchListWidgetWithNullSymbols() {
		// Arrange
		Mockito.when(validatorFactory.getWidgetDtoValidator())
				.thenReturn(new WidgetDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		final WatchListWidgetDto ANY_INVALID_WATCH_LIST_WIDGET = new WatchListWidgetDto("Any name", 0, 0, 1, 1,
				WidgetTypes.NET_WORTH, List.of(ANY_TAG_ID), null);

		// Act
		// Assert
		assertThrows(InputValidationException.class,
				() -> controller.createWatchListWidget(ANY_INVALID_WATCH_LIST_WIDGET, ANY_DASHBOARD_ID));
		Mockito.verifyNoInteractions(converter);
		Mockito.verify(validatorFactory).getWidgetDtoValidator();
	}

	// UPDATE ///////////////////////////////////////////////
	@Test
	void canUpdateWatchListWidgets() {
		// Arrange
		Mockito.when(converter.fromFullDtoToWidget(ANY_WATCH_LIST_WIDGET_FULL_DTO, ANY_DASHBOARD_ID))
				.thenReturn(ANY_WATCH_LIST_WIDGET);
		Mockito.doNothing().when(repo).save(ANY_ID, ANY_WATCH_LIST_WIDGET);
		Mockito.when(validatorFactory.getWidgetFullDtoValidator())
				.thenReturn(new WidgetFullDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		assertDoesNotThrow(
				() -> controller.updateWatchListWidget(ANY_WATCH_LIST_WIDGET_FULL_DTO, ANY_DASHBOARD_ID, ANY_ID));
		Mockito.verify(converter).fromFullDtoToWidget(ANY_WATCH_LIST_WIDGET_FULL_DTO, ANY_DASHBOARD_ID);
		Mockito.verify(repo).save(ANY_ID, ANY_WATCH_LIST_WIDGET);
		Mockito.verify(validatorFactory).getWidgetFullDtoValidator();
	}

	// DELETE ///////////////////////////////////////////////
	@Test
	void canDeleteWatchListWidget() {
		// Arrange
		Mockito.when(validatorFactory.getWidgetFullDtoValidator())
				.thenReturn(new WidgetFullDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		Mockito.doNothing().when(repo).delete(ANY_ID);
		// Assert
		assertDoesNotThrow(() -> controller.deleteWidget(ANY_ID));
		Mockito.verify(validatorFactory).getWidgetFullDtoValidator();
		Mockito.verifyNoInteractions(converter);
		Mockito.verify(repo).delete(ANY_ID);
	}
}
