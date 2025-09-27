package ca.csfoy.investmentSaladApi.infra.dashboard;

import org.springframework.stereotype.Component;

import ca.csfoy.investmentSaladApi.domain.dashboard.Dashboard;
import ca.csfoy.investmentSaladApi.infra.user.UserEntity;

@Component
public class DashboardEntityConverter {

	public DashboardEntity fromDashboardToEntity(Dashboard dashboard, UserEntity userEntity) {
		return new DashboardEntity(dashboard.getId(), userEntity);
	}

	public Dashboard fromEntityToPortfolio(DashboardEntity entity) {
		return new Dashboard(entity.getId());
	}
}
