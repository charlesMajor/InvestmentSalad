package ca.csfoy.investmentSaladApi.controller.portfolio;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import ca.csfoy.investmentSaladApi.api.portfolio.PortfolioFullDto;
import ca.csfoy.investmentSaladApi.api.portfolio.PortfolioLightDto;
import ca.csfoy.investmentSaladApi.domain.Currency;
import ca.csfoy.investmentSaladApi.domain.portfolio.Portfolio;

@ExtendWith(MockitoExtension.class)
public class portfolioConverterTest {

	PortfolioConverter converter = new PortfolioConverter();

	private final PortfolioLightDto ANY_LIGHT_DTO = new PortfolioLightDto("Any name", "AnyDesc", 0, 0, 0,
			LocalDate.of(2020, 05, 1), Currency.CAD, List.of());

	private final PortfolioFullDto ANY_FULL_DTO = new PortfolioFullDto("35554b53-6ce1-425d-96ab-c854631d04f8",
			ANY_LIGHT_DTO.getName(), ANY_LIGHT_DTO.getDescription(), ANY_LIGHT_DTO.getCashBalance(),
			ANY_LIGHT_DTO.getCashInterestRate(), ANY_LIGHT_DTO.getInterestPaymentFrequencyPerYear(),
			ANY_LIGHT_DTO.getInitialInterestPaymentDate(), ANY_LIGHT_DTO.getCurrency(), ANY_LIGHT_DTO.getTags());

	private final Portfolio ANY_PORTFOLIO = new Portfolio(ANY_FULL_DTO.getId(), ANY_LIGHT_DTO.getName(),
			ANY_LIGHT_DTO.getDescription(), ANY_LIGHT_DTO.getCashBalance(), ANY_LIGHT_DTO.getCashInterestRate(),
			ANY_LIGHT_DTO.getInterestPaymentFrequencyPerYear(), ANY_LIGHT_DTO.getInitialInterestPaymentDate(),
			ANY_LIGHT_DTO.getCurrency(), ANY_LIGHT_DTO.getTags());

	@Test
	void canConvertFromLightDtoToPortfolio() {
		// Arrange
		final Portfolio CONVERTED_PORTFOLIO = converter.fromLightDtoToPortfolio(ANY_LIGHT_DTO);
		final Portfolio EXPECTED_PORTFOLIO = new Portfolio(CONVERTED_PORTFOLIO.getId(), ANY_LIGHT_DTO.getName(),
				ANY_LIGHT_DTO.getDescription(), ANY_LIGHT_DTO.getCashBalance(), ANY_LIGHT_DTO.getCashInterestRate(),
				ANY_LIGHT_DTO.getInterestPaymentFrequencyPerYear(), ANY_LIGHT_DTO.getInitialInterestPaymentDate(),
				ANY_LIGHT_DTO.getCurrency(), ANY_LIGHT_DTO.getTags());
		// Act
		// Assert
		Assertions.assertEquals(EXPECTED_PORTFOLIO, CONVERTED_PORTFOLIO);
	}
	
	@Test
	void canConvertFromFullDtoToPortfolio() 
	{
		// Arrange
		// Act
		// Assert
		Assertions.assertEquals(ANY_PORTFOLIO, converter.fromFullDtoToPortfolio(ANY_FULL_DTO));
	}
	
	@Test
	void canConvertFromPortfolioToFullDto() 
	{
		// Arrange
		// Act
		// Assert
		Assertions.assertEquals(ANY_FULL_DTO, converter.fromPortfolioToDto(ANY_PORTFOLIO));
	}
	@Test
	void canConvertFromPortfolioListoFullDtoList() 
	{
		// Arrange
		// Act
		// Assert
		Assertions.assertEquals(List.of(ANY_FULL_DTO), converter.fromPortfolioListToDtoList(List.of(ANY_PORTFOLIO)));
	}
	
	// Arrange
	// Act
	// Assert

}
