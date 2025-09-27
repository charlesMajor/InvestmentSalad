package ca.csfoy.investmentSaladApi.controller.dashboard;

import org.springframework.web.bind.annotation.RestController;

import ca.csfoy.investmentSaladApi.api.dashboard.DashboardDto;
import ca.csfoy.investmentSaladApi.api.dashboard.DashboardRessource;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.ObjectNotFoundException;
import ca.csfoy.investmentSaladApi.controller.validations.ValidatorFactory;
import ca.csfoy.investmentSaladApi.domain.dashboard.DashboardRepository;

@RestController
public class DashboardController implements DashboardRessource {
	private final DashboardRepository repo;
	private final DashboardConverter converter;

	public DashboardController(DashboardRepository repo, DashboardConverter converter,
			ValidatorFactory validatorFactory) {
		this.repo = repo;
		this.converter = converter;
	}

	//GET
	@Override
	public DashboardDto getOneDashboard() {

		try {
			return converter.fromDashboardToDto(repo.getOneByUserId());
		} catch (ObjectNotFoundException e) {
			return converter.fromDashboardToDto(repo.create(converter.fromDtoToDashboard()));
		}
	}

}
