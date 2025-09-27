package ca.csfoy.investmentSaladApi.controller.widgets.net_worth;

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

import ca.csfoy.investmentSaladApi.api.widget.net_worth.NetWorthWidgetDto;
import ca.csfoy.investmentSaladApi.api.widget.net_worth.NetWorthWidgetFullDto;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.InputValidationException;
import ca.csfoy.investmentSaladApi.controller.validations.ValidatorFactory;
import ca.csfoy.investmentSaladApi.controller.validations.widgets.WidgetDtoCustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.widgets.WidgetFullDtoCustomValidator;
import ca.csfoy.investmentSaladApi.controller.widget.WidgetController;
import ca.csfoy.investmentSaladApi.controller.widget.WidgetConverter;
import ca.csfoy.investmentSaladApi.domain.widget.WidgetRepository;
import ca.csfoy.investmentSaladApi.domain.widget.WidgetTypes;
import ca.csfoy.investmentSaladApi.domain.widget.net_worth.NetWorthWidget;
import jakarta.validation.Validation;

@ExtendWith(MockitoExtension.class)

public class NetWorthControllerTest {
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

	private final NetWorthWidgetDto ANY_NET_WORTH_WIDGET_DTO = new NetWorthWidgetDto("Any name", 0, 0, 1, 1,
			WidgetTypes.NET_WORTH, List.of(ANY_TAG_ID), false, "any period");

	private final NetWorthWidgetFullDto ANY_NET_WORTH_WIDGET_FULL_DTO = new NetWorthWidgetFullDto(ANY_ID,
			ANY_DASHBOARD_ID, "Any name", 0, 0, 1, 1, WidgetTypes.NET_WORTH, List.of(ANY_TAG_ID), false, "any period");

	private final NetWorthWidget ANY_NET_WORTH_WIDGET = new NetWorthWidget(ANY_ID, ANY_DASHBOARD_ID, "Any name", 0, 0,
			1, 1, WidgetTypes.NET_WORTH, List.of(ANY_TAG_ID), false, "any period");

	// CREATE ///////////////////////////////////////////////
	@Test
	void canCreateNetWorthWidget() {
		// Arrange
		Mockito.when(converter.fromDtoToWidget(ANY_NET_WORTH_WIDGET_DTO, ANY_DASHBOARD_ID))
				.thenReturn(ANY_NET_WORTH_WIDGET);
		Mockito.when(converter.fromWidgetToFullDto(ANY_NET_WORTH_WIDGET)).thenReturn(ANY_NET_WORTH_WIDGET_FULL_DTO);
		Mockito.when(repo.create(ANY_NET_WORTH_WIDGET)).thenReturn(ANY_NET_WORTH_WIDGET);
		Mockito.when(validatorFactory.getWidgetDtoValidator())
				.thenReturn(new WidgetDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		assertEquals(ANY_NET_WORTH_WIDGET_FULL_DTO,
				controller.createNetWorthWidget(ANY_NET_WORTH_WIDGET_DTO, ANY_DASHBOARD_ID));
		Mockito.verify(converter).fromWidgetToFullDto(ANY_NET_WORTH_WIDGET);
		Mockito.verify(converter).fromDtoToWidget(ANY_NET_WORTH_WIDGET_DTO, ANY_DASHBOARD_ID);
		Mockito.verify(repo).create(ANY_NET_WORTH_WIDGET);
		Mockito.verify(validatorFactory).getWidgetDtoValidator();
	}

	@Test
	void canManageCreateNetWorthWidgetWithBlankPeriod() {
		// Arrange
		Mockito.when(validatorFactory.getWidgetDtoValidator())
				.thenReturn(new WidgetDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		final NetWorthWidgetDto ANY_INVALID_NET_WORTH_WIDGET = new NetWorthWidgetDto("Any name", 0, 0, 1, 1,
				WidgetTypes.NET_WORTH, List.of(ANY_TAG_ID), false, " ");

		// Act
		// Assert
		assertThrows(InputValidationException.class,
				() -> controller.createNetWorthWidget(ANY_INVALID_NET_WORTH_WIDGET, ANY_DASHBOARD_ID));
		Mockito.verifyNoInteractions(converter);
		Mockito.verify(validatorFactory).getWidgetDtoValidator();
	}

	// UPDATE ///////////////////////////////////////////////
	@Test
	void canUpdateNetWorthWidgets() {
		// Arrange
		Mockito.when(converter.fromFullDtoToWidget(ANY_NET_WORTH_WIDGET_FULL_DTO, ANY_DASHBOARD_ID))
				.thenReturn(ANY_NET_WORTH_WIDGET);
		Mockito.doNothing().when(repo).save(ANY_ID, ANY_NET_WORTH_WIDGET);
		Mockito.when(validatorFactory.getWidgetFullDtoValidator())
				.thenReturn(new WidgetFullDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		assertDoesNotThrow(
				() -> controller.updateNetWorthWidget(ANY_NET_WORTH_WIDGET_FULL_DTO, ANY_DASHBOARD_ID, ANY_ID));
		Mockito.verify(converter).fromFullDtoToWidget(ANY_NET_WORTH_WIDGET_FULL_DTO, ANY_DASHBOARD_ID);
		Mockito.verify(repo).save(ANY_ID, ANY_NET_WORTH_WIDGET);
		Mockito.verify(validatorFactory).getWidgetFullDtoValidator();
	}

	// DELETE ///////////////////////////////////////////////
	@Test
	void canDeleteNetWorthWidget() {
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
