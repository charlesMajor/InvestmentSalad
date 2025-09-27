package ca.csfoy.investmentSaladApi.controller.portfolio;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import ca.csfoy.investmentSaladApi.api.portfolio.PortfolioFullDto;
import ca.csfoy.investmentSaladApi.api.portfolio.PortfolioLightDto;
import ca.csfoy.investmentSaladApi.domain.portfolio.Portfolio;

@Component
public class PortfolioConverter {

	public PortfolioConverter() {
	}

	public PortfolioFullDto fromPortfolioToDto(Portfolio portfolio) {
		return new PortfolioFullDto(portfolio.getId(), portfolio.getName(), portfolio.getDescription(), portfolio.getCashBalance(),
				portfolio.getCashInterestRate(), portfolio.getInterestPaymentFrequencyPerYear(),
				portfolio.getInitialInterestPaymentDate(), portfolio.getCurrency(), portfolio.getTags());
	}

	public Portfolio fromLightDtoToPortfolio(PortfolioLightDto dto) {
		return new Portfolio(UUID.randomUUID().toString(), dto.getName(), dto.getDescription(), dto.getCashBalance(), dto.getCashInterestRate(),
				dto.getInterestPaymentFrequencyPerYear(), dto.getInitialInterestPaymentDate(), dto.getCurrency(), dto.getTags());
	}
	
	public Portfolio fromFullDtoToPortfolio(PortfolioFullDto dto) {
		return new Portfolio(dto.getId(), dto.getName(), dto.getDescription(), dto.getCashBalance(), dto.getCashInterestRate(),
				dto.getInterestPaymentFrequencyPerYear(), dto.getInitialInterestPaymentDate(), dto.getCurrency(), dto.getTags());
	}

	public List<PortfolioFullDto> fromPortfolioListToDtoList(List<Portfolio> portfolios) {
		return portfolios.stream().map(this::fromPortfolioToDto).collect(Collectors.toList());
	}

}