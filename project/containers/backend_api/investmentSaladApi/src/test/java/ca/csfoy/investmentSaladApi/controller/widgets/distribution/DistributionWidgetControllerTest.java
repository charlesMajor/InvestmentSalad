package ca.csfoy.investmentSaladApi.controller.widgets.distribution;

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

import ca.csfoy.investmentSaladApi.api.widget.distibution.DistributionWidgetDto;
import ca.csfoy.investmentSaladApi.api.widget.distibution.DistributionWidgetFullDto;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.InputValidationException;
import ca.csfoy.investmentSaladApi.controller.validations.ValidatorFactory;
import ca.csfoy.investmentSaladApi.controller.validations.widgets.WidgetDtoCustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.widgets.WidgetFullDtoCustomValidator;
import ca.csfoy.investmentSaladApi.controller.widget.WidgetController;
import ca.csfoy.investmentSaladApi.controller.widget.WidgetConverter;
import ca.csfoy.investmentSaladApi.domain.widget.WidgetRepository;
import ca.csfoy.investmentSaladApi.domain.widget.WidgetTypes;
import ca.csfoy.investmentSaladApi.domain.widget.distribution.DistributionWidget;
import jakarta.validation.Validation;

@ExtendWith(MockitoExtension.class)

public class DistributionWidgetControllerTest {
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

	private final DistributionWidgetDto ANY_DISTRIBUTION_WIDGET_DTO = new DistributionWidgetDto("Any name", 0, 0, 1, 1,
			WidgetTypes.DISTRIBUTION, List.of(ANY_TAG_ID));

	private final DistributionWidget ANY_DISTRIBUTION_WIDGET = new DistributionWidget(ANY_ID, ANY_DASHBOARD_ID,
			"Any name", 0, 0, 1, 1, WidgetTypes.DISTRIBUTION, List.of(ANY_TAG_ID));

	private final DistributionWidgetFullDto ANY_DISTRIBUTION_WIDGET_FULL_DTO = new DistributionWidgetFullDto(ANY_ID,
			ANY_DASHBOARD_ID, "Any name", 0, 0, 1, 1, WidgetTypes.DISTRIBUTION, List.of(ANY_TAG_ID));

	// CREATE ///////////////////////////////////////////////
	@Test
	void canCreateDistributionWidget() {
		// Arrange
		Mockito.when(converter.fromDtoToWidget(ANY_DISTRIBUTION_WIDGET_DTO, ANY_DASHBOARD_ID))
				.thenReturn(ANY_DISTRIBUTION_WIDGET);
		Mockito.when(converter.fromWidgetToFullDto(ANY_DISTRIBUTION_WIDGET))
				.thenReturn(ANY_DISTRIBUTION_WIDGET_FULL_DTO);
		Mockito.when(repo.create(ANY_DISTRIBUTION_WIDGET)).thenReturn(ANY_DISTRIBUTION_WIDGET);
		Mockito.when(validatorFactory.getWidgetDtoValidator())
				.thenReturn(new WidgetDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		assertEquals(ANY_DISTRIBUTION_WIDGET_FULL_DTO,
				controller.createDistributionWidget(ANY_DISTRIBUTION_WIDGET_DTO, ANY_DASHBOARD_ID));
		Mockito.verify(converter).fromWidgetToFullDto(ANY_DISTRIBUTION_WIDGET);
		Mockito.verify(converter).fromDtoToWidget(ANY_DISTRIBUTION_WIDGET_DTO, ANY_DASHBOARD_ID);
		Mockito.verify(repo).create(ANY_DISTRIBUTION_WIDGET);
		Mockito.verify(validatorFactory).getWidgetDtoValidator();
	}

	@Test
	void canManageCreateDistributionWidgetWithInvalidName() {
		// Arrange
		Mockito.when(validatorFactory.getWidgetDtoValidator())
				.thenReturn(new WidgetDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		final DistributionWidgetDto ANY_INVALID_DISTRIBUTION_WIDGET_DTO = new DistributionWidgetDto(
				"111111111111111111111111111111111", 0, 0, 1, 1, WidgetTypes.DISTRIBUTION, List.of(ANY_TAG_ID));
		// Act
		// Assert
		assertThrows(InputValidationException.class,
				() -> controller.createDistributionWidget(ANY_INVALID_DISTRIBUTION_WIDGET_DTO, ANY_DASHBOARD_ID));
		Mockito.verifyNoInteractions(converter);
		Mockito.verify(validatorFactory).getWidgetDtoValidator();
	}

	@Test
	void canManageCreateDistributionWidgetWithBlankName() {
		// Arrange
		Mockito.when(validatorFactory.getWidgetDtoValidator())
				.thenReturn(new WidgetDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		final DistributionWidgetDto ANY_INVALID_DISTRIBUTION_WIDGET_DTO = new DistributionWidgetDto(" ", 0, 0, 1, 1,
				WidgetTypes.DISTRIBUTION, List.of(ANY_TAG_ID));
		// Act
		// Assert
		assertThrows(InputValidationException.class,
				() -> controller.createDistributionWidget(ANY_INVALID_DISTRIBUTION_WIDGET_DTO, ANY_DASHBOARD_ID));
		Mockito.verifyNoInteractions(converter);
		Mockito.verify(validatorFactory).getWidgetDtoValidator();
	}

	@Test
	void canManageCreateDistributionWidgetWithNegativePosX() {
		// Arrange
		Mockito.when(validatorFactory.getWidgetDtoValidator())
				.thenReturn(new WidgetDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		final DistributionWidgetDto ANY_INVALID_DISTRIBUTION_WIDGET_DTO = new DistributionWidgetDto("Valid Name", -1, 0,
				1, 1, WidgetTypes.DISTRIBUTION, List.of(ANY_TAG_ID));
		// Act
		// Assert
		assertThrows(InputValidationException.class,
				() -> controller.createDistributionWidget(ANY_INVALID_DISTRIBUTION_WIDGET_DTO, ANY_DASHBOARD_ID));
		Mockito.verifyNoInteractions(converter);
		Mockito.verify(validatorFactory).getWidgetDtoValidator();
	}

	@Test
	void canManageCreateDistributionWidgetWithNegativePosY() {
		// Arrange
		Mockito.when(validatorFactory.getWidgetDtoValidator())
				.thenReturn(new WidgetDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		final DistributionWidgetDto ANY_INVALID_DISTRIBUTION_WIDGET_DTO = new DistributionWidgetDto("Valid Name", 0, -1,
				1, 1, WidgetTypes.DISTRIBUTION, List.of(ANY_TAG_ID));
		// Act
		// Assert
		assertThrows(InputValidationException.class,
				() -> controller.createDistributionWidget(ANY_INVALID_DISTRIBUTION_WIDGET_DTO, ANY_DASHBOARD_ID));
		Mockito.verifyNoInteractions(converter);
		Mockito.verify(validatorFactory).getWidgetDtoValidator();
	}
	@Test
	void canManageCreateDistributionWidgetWithTooHighWidth() {
		// Arrange
		Mockito.when(validatorFactory.getWidgetDtoValidator())
				.thenReturn(new WidgetDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		final DistributionWidgetDto ANY_INVALID_DISTRIBUTION_WIDGET_DTO = new DistributionWidgetDto("Valid Name", 0, 0,
				3, 1, WidgetTypes.DISTRIBUTION, List.of(ANY_TAG_ID));
		// Act
		// Assert
		assertThrows(InputValidationException.class,
				() -> controller.createDistributionWidget(ANY_INVALID_DISTRIBUTION_WIDGET_DTO, ANY_DASHBOARD_ID));
		Mockito.verifyNoInteractions(converter);
		Mockito.verify(validatorFactory).getWidgetDtoValidator();
	}
	@Test
	void canManageCreateDistributionWidgetWithTooLowWidth() {
		// Arrange
		Mockito.when(validatorFactory.getWidgetDtoValidator())
				.thenReturn(new WidgetDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		final DistributionWidgetDto ANY_INVALID_DISTRIBUTION_WIDGET_DTO = new DistributionWidgetDto("Valid Name", 0, 0,
				0, 1, WidgetTypes.DISTRIBUTION, List.of(ANY_TAG_ID));
		// Act
		// Assert
		assertThrows(InputValidationException.class,
				() -> controller.createDistributionWidget(ANY_INVALID_DISTRIBUTION_WIDGET_DTO, ANY_DASHBOARD_ID));
		Mockito.verifyNoInteractions(converter);
		Mockito.verify(validatorFactory).getWidgetDtoValidator();
	}

	@Test
	void canManageCreateDistributionWidgetWithTooHighHeight() {
		// Arrange
		Mockito.when(validatorFactory.getWidgetDtoValidator())
				.thenReturn(new WidgetDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		final DistributionWidgetDto ANY_INVALID_DISTRIBUTION_WIDGET_DTO = new DistributionWidgetDto("Valid Name", 0, 0,
				1, 3, WidgetTypes.DISTRIBUTION, List.of(ANY_TAG_ID));
		// Act
		// Assert
		assertThrows(InputValidationException.class,
				() -> controller.createDistributionWidget(ANY_INVALID_DISTRIBUTION_WIDGET_DTO, ANY_DASHBOARD_ID));
		Mockito.verifyNoInteractions(converter);
		Mockito.verify(validatorFactory).getWidgetDtoValidator();
	}
	
	@Test
	void canManageCreateDistributionWidgetWithTooLowHeight() {
		// Arrange
		Mockito.when(validatorFactory.getWidgetDtoValidator())
				.thenReturn(new WidgetDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		final DistributionWidgetDto ANY_INVALID_DISTRIBUTION_WIDGET_DTO = new DistributionWidgetDto("Valid Name", 0, 0,
				1, 0, WidgetTypes.DISTRIBUTION, List.of(ANY_TAG_ID));
		// Act
		// Assert
		assertThrows(InputValidationException.class,
				() -> controller.createDistributionWidget(ANY_INVALID_DISTRIBUTION_WIDGET_DTO, ANY_DASHBOARD_ID));
		Mockito.verifyNoInteractions(converter);
		Mockito.verify(validatorFactory).getWidgetDtoValidator();
	}

	@Test
	void canManageCreateDistributionWidgetWithNullTags() {
		// Arrange
		Mockito.when(validatorFactory.getWidgetDtoValidator())
				.thenReturn(new WidgetDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		final DistributionWidgetDto ANY_INVALID_DISTRIBUTION_WIDGET_DTO = new DistributionWidgetDto("Valid Name", 0, 0,
				0, 0, WidgetTypes.DISTRIBUTION, null);
		// Act
		// Assert
		assertThrows(InputValidationException.class,
				() -> controller.createDistributionWidget(ANY_INVALID_DISTRIBUTION_WIDGET_DTO, ANY_DASHBOARD_ID));
		Mockito.verifyNoInteractions(converter);
		Mockito.verify(validatorFactory).getWidgetDtoValidator();
	}

	// UPDATE ///////////////////////////////////////////////
	@Test
	void canUpdateDistributionWidgets() {
		// Arrange
		Mockito.when(converter.fromFullDtoToWidget(ANY_DISTRIBUTION_WIDGET_FULL_DTO, ANY_DASHBOARD_ID))
				.thenReturn(ANY_DISTRIBUTION_WIDGET);
		Mockito.doNothing().when(repo).save(ANY_ID, ANY_DISTRIBUTION_WIDGET);
		Mockito.when(validatorFactory.getWidgetFullDtoValidator())
				.thenReturn(new WidgetFullDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		assertDoesNotThrow(
				() -> controller.updateDistributionWidget(ANY_DISTRIBUTION_WIDGET_FULL_DTO, ANY_DASHBOARD_ID, ANY_ID));
		Mockito.verify(converter).fromFullDtoToWidget(ANY_DISTRIBUTION_WIDGET_FULL_DTO, ANY_DASHBOARD_ID);
		Mockito.verify(repo).save(ANY_ID, ANY_DISTRIBUTION_WIDGET);
		Mockito.verify(validatorFactory).getWidgetFullDtoValidator();
	}

	@Test
	void canManageUpdateDistributionWidgetsWithInvalidUUID() {
		// Arrange
		final DistributionWidgetFullDto ANY_INVALID_DISTRIBUTION_WIDGET_FULL_DTO = new DistributionWidgetFullDto(
				"11111", ANY_DASHBOARD_ID, "Any name", 0, 0, 0, 0, WidgetTypes.DISTRIBUTION, List.of(ANY_TAG_ID));
		Mockito.when(validatorFactory.getWidgetFullDtoValidator())
				.thenReturn(new WidgetFullDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		assertThrows(InputValidationException.class, () -> controller
				.updateDistributionWidget(ANY_INVALID_DISTRIBUTION_WIDGET_FULL_DTO, ANY_DASHBOARD_ID, ANY_ID));
		Mockito.verify(validatorFactory).getWidgetFullDtoValidator();
		Mockito.verifyNoInteractions(converter);

	}

	@Test
	void canManageUpdateDistributionWidgetsWithBlankUUID() {
		// Arrange
		final DistributionWidgetFullDto ANY_INVALID_DISTRIBUTION_WIDGET_FULL_DTO = new DistributionWidgetFullDto(" ",
				ANY_DASHBOARD_ID, "Any name", 0, 0, 1, 1, WidgetTypes.DISTRIBUTION, List.of(ANY_TAG_ID));
		Mockito.when(validatorFactory.getWidgetFullDtoValidator())
				.thenReturn(new WidgetFullDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		assertThrows(InputValidationException.class, () -> controller
				.updateDistributionWidget(ANY_INVALID_DISTRIBUTION_WIDGET_FULL_DTO, ANY_DASHBOARD_ID, ANY_ID));
		Mockito.verify(validatorFactory).getWidgetFullDtoValidator();
		Mockito.verifyNoInteractions(converter);

	}

	@Test
	void canManageUpdateDistributionWidgetsWithUnmatchingUUID() {
		// Arrange
		final DistributionWidgetFullDto ANY_INVALID_DISTRIBUTION_WIDGET_FULL_DTO = new DistributionWidgetFullDto(
				"e5c4ef41-1e72-489c-bb5e-1445e06cd221", ANY_DASHBOARD_ID, "Any name", 0, 0, 1, 1,
				WidgetTypes.DISTRIBUTION, List.of(ANY_TAG_ID));
		Mockito.when(validatorFactory.getWidgetFullDtoValidator())
				.thenReturn(new WidgetFullDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		assertThrows(InputValidationException.class, () -> controller
				.updateDistributionWidget(ANY_INVALID_DISTRIBUTION_WIDGET_FULL_DTO, ANY_DASHBOARD_ID, ANY_ID));
		Mockito.verify(validatorFactory).getWidgetFullDtoValidator();
		Mockito.verifyNoInteractions(converter);

	}

	@Test
	void canManageUpdateDistributionWidgetsWithMatchingInvalidUUID() {
		// Arrange
		final DistributionWidgetFullDto ANY_INVALID_DISTRIBUTION_WIDGET_FULL_DTO = new DistributionWidgetFullDto("123",
				ANY_DASHBOARD_ID, "Any name", 0, 0, 1, 1, WidgetTypes.DISTRIBUTION, List.of(ANY_TAG_ID));
		Mockito.when(validatorFactory.getWidgetFullDtoValidator())
				.thenReturn(new WidgetFullDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		assertThrows(InputValidationException.class, () -> controller
				.updateDistributionWidget(ANY_INVALID_DISTRIBUTION_WIDGET_FULL_DTO, ANY_DASHBOARD_ID, "123"));
		Mockito.verify(validatorFactory).getWidgetFullDtoValidator();
		Mockito.verifyNoInteractions(converter);

	}

	// DELETE ///////////////////////////////////////////////
	@Test
	void canDeleteDistributionWidget() {
		// Arrange
		Mockito.when(validatorFactory.getWidgetFullDtoValidator())
				.thenReturn(new WidgetFullDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator())); // Act
		Mockito.doNothing().when(repo).delete(ANY_DASHBOARD_ID);
		// Assert
		assertDoesNotThrow(() -> controller.deleteWidget(ANY_ID));
		Mockito.verify(validatorFactory).getWidgetFullDtoValidator();
		Mockito.verifyNoInteractions(converter);
		Mockito.verify(repo).delete(ANY_ID);
	}

}
