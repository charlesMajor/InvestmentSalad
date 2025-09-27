package ca.csfoy.investmentSaladApi.controller.portfolio;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import ca.csfoy.investmentSaladApi.api.portfolio.PortfolioFullDto;
import ca.csfoy.investmentSaladApi.api.portfolio.PortfolioLightDto;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.InputValidationException;
import ca.csfoy.investmentSaladApi.controller.validations.ValidatorFactory;
import ca.csfoy.investmentSaladApi.controller.validations.portfolio.PortfolioFullDtoCustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.portfolio.PortfolioLightDtoCustomValidator;
import ca.csfoy.investmentSaladApi.domain.Currency;
import ca.csfoy.investmentSaladApi.domain.portfolio.Portfolio;
import ca.csfoy.investmentSaladApi.domain.portfolio.PortfolioRepository;
import jakarta.validation.Validation;

@ExtendWith(MockitoExtension.class)
public class portfolioContollerTest {

	@Mock
	private ValidatorFactory validatorFactory;

	@Mock
	private PortfolioConverter converter;

	@Mock
	private PortfolioRepository repo;

	@InjectMocks
	private PortfolioController controller;

	private final String ANY_SEEDED_ID = "40554b53-6ce1-425d-96ab-c854631d04f8";

	private final PortfolioLightDto ANY_LIGHT_DTO = new PortfolioLightDto("ANY NAME", "AnyDesc", 0, 0, 0,
			LocalDate.of(2020, 05, 1), Currency.CAD, List.of());

	private final PortfolioFullDto ANY_FULL_DTO = new PortfolioFullDto("35554b53-6ce1-425d-96ab-c854631d04f8",
			"ANY NAME", "AnyDesc", 0, 0, 0, LocalDate.of(2020, 05, 1), Currency.CAD, List.of(""));

	private final Portfolio ANY_PORTFOLIO = new Portfolio("35554b53-6ce1-425d-96ab-c854631d04f8", "ANY NAME", "AnyDesc",
			0, 0, 0, LocalDate.of(2020, 05, 1), Currency.CAD, List.of(""));

	private final PortfolioFullDto FULL_SEEDED_DTO = new PortfolioFullDto(ANY_SEEDED_ID, "Desjardins", "AnyDesc", 2000,
			1, 1, LocalDate.of(2020, 05, 1), Currency.CAD, List.of(""));

	private final Portfolio SEEDED_PORTFOLIO = new Portfolio(ANY_SEEDED_ID, "Desjardins", "AnyDesc", 2000, 1, 1,
			LocalDate.of(2020, 05, 1), Currency.CAD, List.of(""));

	// CREATE ///////////////////////////////////////////////
	@Test
	void canCreatePortoflio() {
		// Arrange
		Mockito.when(validatorFactory.getPorfolioLightDtoValidator()).thenReturn(
				new PortfolioLightDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		Mockito.when(repo.create(ANY_PORTFOLIO)).thenReturn(ANY_PORTFOLIO);
		Mockito.when(converter.fromLightDtoToPortfolio(ANY_LIGHT_DTO)).thenReturn(ANY_PORTFOLIO);
		Mockito.when(converter.fromPortfolioToDto(ANY_PORTFOLIO)).thenReturn(ANY_FULL_DTO);
		// Act
		// Assert
		Assertions.assertDoesNotThrow(() -> controller.createPortfolio(ANY_LIGHT_DTO));
		Mockito.verify(validatorFactory).getPorfolioLightDtoValidator();
		Mockito.verify(converter).fromLightDtoToPortfolio(ANY_LIGHT_DTO);
		Mockito.verify(converter).fromPortfolioToDto(ANY_PORTFOLIO);
	}

	@Test
	void canManageCreateAttemptWithInvalidName() {
		// Arrange
		final PortfolioLightDto ANY_INVALID_LIGHT_DTO = new PortfolioLightDto("11111111111111111111111111",
				ANY_LIGHT_DTO.getDescription(), 0, 0, 0, null, null,List.of());
		Mockito.when(validatorFactory.getPorfolioLightDtoValidator()).thenReturn(
				new PortfolioLightDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		Assertions.assertThrows(InputValidationException.class,
				() -> controller.createPortfolio(ANY_INVALID_LIGHT_DTO));
		Mockito.verify(validatorFactory).getPorfolioLightDtoValidator();
		Mockito.verifyNoInteractions(converter);
	}

	@Test
	void canManageCreateAttemptWithBlankName() {
		// Arrange
		final PortfolioLightDto ANY_INVALID_LIGHT_DTO = new PortfolioLightDto(" ", ANY_LIGHT_DTO.getDescription(), 0, 0,
				0, null, Currency.CAD, List.of());
		Mockito.when(validatorFactory.getPorfolioLightDtoValidator()).thenReturn(
				new PortfolioLightDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		Assertions.assertThrows(InputValidationException.class,
				() -> controller.createPortfolio(ANY_INVALID_LIGHT_DTO));
		Mockito.verify(validatorFactory).getPorfolioLightDtoValidator();
		Mockito.verifyNoInteractions(converter);
	}

	@Test
	void canManageCreateAttemptWithToHighInterestRate() {
		// Arrange
		final PortfolioLightDto ANY_INVALID_LIGHT_DTO = new PortfolioLightDto(ANY_LIGHT_DTO.getName(),
				ANY_LIGHT_DTO.getDescription(), 0, 1.1f, 0, null, Currency.CAD, List.of());
		Mockito.when(validatorFactory.getPorfolioLightDtoValidator()).thenReturn(
				new PortfolioLightDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		Assertions.assertThrows(InputValidationException.class,
				() -> controller.createPortfolio(ANY_INVALID_LIGHT_DTO));
		Mockito.verify(validatorFactory).getPorfolioLightDtoValidator();
		Mockito.verifyNoInteractions(converter);
	}

	@Test
	void canManageCreateAttemptWithToLowInterestRate() {
		// Arrange
		final PortfolioLightDto ANY_INVALID_LIGHT_DTO = new PortfolioLightDto(ANY_LIGHT_DTO.getName(),
				ANY_LIGHT_DTO.getDescription(), 0, -1f, 0, null, Currency.CAD, List.of());
		Mockito.when(validatorFactory.getPorfolioLightDtoValidator()).thenReturn(
				new PortfolioLightDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		Assertions.assertThrows(InputValidationException.class,
				() -> controller.createPortfolio(ANY_INVALID_LIGHT_DTO));
		Mockito.verify(validatorFactory).getPorfolioLightDtoValidator();
		Mockito.verifyNoInteractions(converter);
	}

	@Test
	void canManageCreateAttemptWithToHighFrequency() {
		// Arrange
		final PortfolioLightDto ANY_INVALID_LIGHT_DTO = new PortfolioLightDto(ANY_LIGHT_DTO.getName(),
				ANY_LIGHT_DTO.getDescription(), 0, 0, 366, null, Currency.CAD, List.of());
		Mockito.when(validatorFactory.getPorfolioLightDtoValidator()).thenReturn(
				new PortfolioLightDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		Assertions.assertThrows(InputValidationException.class,
				() -> controller.createPortfolio(ANY_INVALID_LIGHT_DTO));
		Mockito.verify(validatorFactory).getPorfolioLightDtoValidator();
		Mockito.verifyNoInteractions(converter);
	}

	@Test
	void canManageCreateAttemptWithToLowFrequency() {
		// Arrange
		final PortfolioLightDto ANY_INVALID_LIGHT_DTO = new PortfolioLightDto(ANY_LIGHT_DTO.getName(),
				ANY_LIGHT_DTO.getDescription(), 0, 0, -1, null, Currency.CAD, List.of());
		Mockito.when(validatorFactory.getPorfolioLightDtoValidator()).thenReturn(
				new PortfolioLightDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		Assertions.assertThrows(InputValidationException.class,
				() -> controller.createPortfolio(ANY_INVALID_LIGHT_DTO));
		Mockito.verify(validatorFactory).getPorfolioLightDtoValidator();
		Mockito.verifyNoInteractions(converter);
	}

	@Test
	void canManageCreateAttemptWithToLowBalance() {
		// Arrange
		final PortfolioLightDto ANY_INVALID_LIGHT_DTO = new PortfolioLightDto(ANY_LIGHT_DTO.getName(),
				ANY_LIGHT_DTO.getDescription(), -1, 0, 0, null, Currency.CAD, List.of());
		Mockito.when(validatorFactory.getPorfolioLightDtoValidator()).thenReturn(
				new PortfolioLightDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		Assertions.assertThrows(InputValidationException.class,
				() -> controller.createPortfolio(ANY_INVALID_LIGHT_DTO));
		Mockito.verify(validatorFactory).getPorfolioLightDtoValidator();
		Mockito.verifyNoInteractions(converter);
	}

	@Test
	void canManageCreateAttemptWithNullCurrency() {
		// Arrange
		final PortfolioLightDto ANY_INVALID_LIGHT_DTO = new PortfolioLightDto(ANY_LIGHT_DTO.getName(),
				ANY_LIGHT_DTO.getDescription(), 0, 0, 0, null, null, List.of());
		Mockito.when(validatorFactory.getPorfolioLightDtoValidator()).thenReturn(
				new PortfolioLightDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		Assertions.assertThrows(InputValidationException.class,
				() -> controller.createPortfolio(ANY_INVALID_LIGHT_DTO));
		Mockito.verify(validatorFactory).getPorfolioLightDtoValidator();
		Mockito.verifyNoInteractions(converter);
	}

	// GET ///////////////////////////////////////////////
	@Test
	void canGetAllPortfolio() {
		// Arrange
		Mockito.when(converter.fromPortfolioListToDtoList(List.of(ANY_PORTFOLIO))).thenReturn(List.of(ANY_FULL_DTO));
		Mockito.when(repo.getAllByUserId()).thenReturn(List.of(ANY_PORTFOLIO));
		// Act
		// Assert
		Assertions.assertDoesNotThrow(() -> controller.getUserPortfolios());
		Mockito.verify(repo).getAllByUserId();
		Mockito.verify(converter).fromPortfolioListToDtoList(List.of(ANY_PORTFOLIO));
	}

	@Test
	void canGetPortfolioById() {
		// Arrange
		Mockito.when(validatorFactory.getPortfolioFullDtoValidator()).thenReturn(
				new PortfolioFullDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		Mockito.when(converter.fromPortfolioToDto(ANY_PORTFOLIO)).thenReturn(ANY_FULL_DTO);
		Mockito.when(repo.getBy(ANY_SEEDED_ID)).thenReturn(ANY_PORTFOLIO);
		// Act
		// Assert
		Assertions.assertDoesNotThrow(() -> controller.getPortfolioById(ANY_SEEDED_ID));
		Mockito.verify(repo).getBy(ANY_SEEDED_ID);
		Mockito.verify(converter).fromPortfolioToDto(ANY_PORTFOLIO);
		Mockito.verify(validatorFactory).getPortfolioFullDtoValidator();
	}

	@Test
	void canManageGetAttemptWithInvalidId() {
		// Arrange
		final String ANY_WRONG_UUID = "aaaaa";
		Mockito.when(validatorFactory.getPortfolioFullDtoValidator()).thenReturn(
				new PortfolioFullDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		Assertions.assertThrows(InputValidationException.class, () -> controller.getPortfolioById(ANY_WRONG_UUID));
		Mockito.verifyNoInteractions(repo);
		Mockito.verifyNoInteractions(converter);
		Mockito.verify(validatorFactory).getPortfolioFullDtoValidator();
	}

	@Test
	void canManageGetAttemptWithBlankId() {
		// Arrange
		final String ANY_WRONG_UUID = " ";
		Mockito.when(validatorFactory.getPortfolioFullDtoValidator()).thenReturn(
				new PortfolioFullDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		Assertions.assertThrows(InputValidationException.class, () -> controller.getPortfolioById(ANY_WRONG_UUID));
		Mockito.verifyNoInteractions(repo);
		Mockito.verifyNoInteractions(converter);
		Mockito.verify(validatorFactory).getPortfolioFullDtoValidator();
	}
	// UPDATE ///////////////////////////////////////////////
	@Test
	void canUpdatePortfolio() 
	{
		// Arrange
		Mockito.when(converter.fromFullDtoToPortfolio(FULL_SEEDED_DTO)).thenReturn(SEEDED_PORTFOLIO);
		Mockito.doNothing().when(repo).save(ANY_SEEDED_ID, SEEDED_PORTFOLIO);
		Mockito.when(validatorFactory.getPortfolioFullDtoValidator()).thenReturn(
				new PortfolioFullDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		Assertions.assertDoesNotThrow(()->controller.updatePortfolio(ANY_SEEDED_ID, FULL_SEEDED_DTO));
		Mockito.verify(validatorFactory).getPortfolioFullDtoValidator();
		Mockito.verify(converter).fromFullDtoToPortfolio(FULL_SEEDED_DTO);
		
	}
	@Test
	void canManageUpdateAttemptOnUnmatchingIds() 
	{
		// Arrange
		final String ANY_UNMACHING_UUID = "40554b53-6ce1-425d-96ab-c854631d04a7";
		Mockito.when(validatorFactory.getPortfolioFullDtoValidator()).thenReturn(
				new PortfolioFullDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		Assertions.assertThrows(InputValidationException.class, ()->controller.updatePortfolio(ANY_UNMACHING_UUID, ANY_FULL_DTO));
		Mockito.verify(validatorFactory).getPortfolioFullDtoValidator();
		Mockito.verifyNoInteractions(repo);
		Mockito.verifyNoInteractions(converter);
		
	}
	
	@Test
	void canManageUpdateAttemptOnMatchingInvalidIds() 
	{
		// Arrange
		final String ANY_WRONG_UUID = "aaaaa";
		final PortfolioFullDto ANY_DTO = new PortfolioFullDto(ANY_WRONG_UUID, ANY_FULL_DTO.getName(), ANY_FULL_DTO.getDescription(), 0, 0, 0, null, Currency.CAD, List.of(""));
		Mockito.when(validatorFactory.getPortfolioFullDtoValidator()).thenReturn(
				new PortfolioFullDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		Assertions.assertThrows(InputValidationException.class, ()->controller.updatePortfolio(ANY_WRONG_UUID, ANY_DTO));
		Mockito.verify(validatorFactory).getPortfolioFullDtoValidator();
		Mockito.verifyNoInteractions(repo);
		Mockito.verifyNoInteractions(converter);
		
	}
	
	// DELETE ///////////////////////////////////////////////

	@Test
	void canDeletePortfolio() 
	{
		// Arrange
		Mockito.doNothing().when(repo).delete(ANY_SEEDED_ID);
		Mockito.when(validatorFactory.getPortfolioFullDtoValidator()).thenReturn(
				new PortfolioFullDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));		
		// Act
		// Assert
		Assertions.assertDoesNotThrow(()-> controller.deletePortfolio(ANY_SEEDED_ID));
		Mockito.verify(validatorFactory).getPortfolioFullDtoValidator();
		Mockito.verifyNoInteractions(converter);

	}
	
	@Test
	void canManageDeleteAttemptWithInvalidId() 
	{
		// Arrange
		final String ANY_WRONG_UUID = "aaaaa";
		Mockito.when(validatorFactory.getPortfolioFullDtoValidator()).thenReturn(
				new PortfolioFullDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));		
		// Act
		// Assert
		Assertions.assertThrows(InputValidationException.class,()-> controller.deletePortfolio(ANY_WRONG_UUID));
		Mockito.verify(validatorFactory).getPortfolioFullDtoValidator();
		Mockito.verifyNoInteractions(repo);
		Mockito.verifyNoInteractions(converter);
	}
}
