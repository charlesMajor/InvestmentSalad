package ca.csfoy.investmentSaladApi.controller.dashboard;

import java.util.UUID;

import org.springframework.stereotype.Component;

import ca.csfoy.investmentSaladApi.api.dashboard.DashboardDto;
import ca.csfoy.investmentSaladApi.domain.dashboard.Dashboard;

@Component
public class DashboardConverter {

	public DashboardDto fromDashboardToDto(Dashboard dashboard) {
		return new DashboardDto(dashboard.getId());
	}

	public Dashboard fromDtoToDashboard() {
		return new Dashboard(UUID.randomUUID().toString());
	}
}
