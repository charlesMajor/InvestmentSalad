package ca.csfoy.investmentSaladApi.domain.portfolio;

import java.util.List;

import ca.csfoy.investmentSaladApi.domain.BasicRepository;
import ca.csfoy.investmentSaladApi.domain.DeleteRepository;
import ca.csfoy.investmentSaladApi.domain.UpdateRepository;

public interface PortfolioRepository extends BasicRepository<String, Portfolio>, UpdateRepository<String, Portfolio>,
		DeleteRepository<String, Portfolio> {
	public List<Portfolio> getAllByUserId();

}
