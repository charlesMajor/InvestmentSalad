package ca.csfoy.investmentSaladApi.domain.dashboard;

import ca.csfoy.investmentSaladApi.domain.BasicRepository;

public interface DashboardRepository extends BasicRepository<String, Dashboard> {
	public Dashboard getOneByUserId();
	public Dashboard initializeDashboard(Dashboard dashboard, String userId);
}
