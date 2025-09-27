package ca.csfoy.investmentSaladApi.infra.portfolio;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import ca.csfoy.investmentSaladApi.domain.Currency;
import ca.csfoy.investmentSaladApi.domain.portfolio.Portfolio;
import ca.csfoy.investmentSaladApi.infra.tag.TagEntity;
import ca.csfoy.investmentSaladApi.infra.tag.portfolio_tag.PortfolioTagEntity;
import ca.csfoy.investmentSaladApi.infra.tag.portfolio_tag.PortfolioTagId;
import ca.csfoy.investmentSaladApi.infra.user.UserEntity;

@Component
public class PortfolioEntityConverter {

	public PortfolioEntity fromPortfolioToEntity(Portfolio portfolio, UserEntity userEntity) {
		return new PortfolioEntity(portfolio.getId(), portfolio.getName(), portfolio.getDescription(), userEntity,
				portfolio.getCashBalance(), portfolio.getCashInterestRate(),
				portfolio.getInterestPaymentFrequencyPerYear(), portfolio.getInitialInterestPaymentDate(),
				portfolio.getCurrency().name());
	}

	public Portfolio fromEntityToPortfolio(PortfolioEntity entity) {

		List<String> tagIds = entity.getPortfolioTags().stream().map(PortfolioTagEntity::getId)
				.map(PortfolioTagId::getTagEntity).map(TagEntity::getId).collect(Collectors.toList());

		return new Portfolio(entity.getId(), entity.getName(), entity.getDescription(), entity.getCashBalance(),
				entity.getCashInterestRate(), entity.getInterestPaymentFrequencyPerYear(),
				entity.getInitialInterestPaymentDate(), Currency.valueOf(entity.getCurrencyType()), tagIds);
	}

	public List<Portfolio> fromEntityListToPortfolioList(List<PortfolioEntity> portfolioEntities) {
		return portfolioEntities.stream().map(this::fromEntityToPortfolio).collect(Collectors.toList());
	}
}
