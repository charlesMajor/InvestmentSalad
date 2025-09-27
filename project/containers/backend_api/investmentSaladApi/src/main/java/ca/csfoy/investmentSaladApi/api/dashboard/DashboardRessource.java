package ca.csfoy.investmentSaladApi.api.dashboard;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@RequestMapping(value = DashboardRessource.RESOURCE_PATH, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
public interface DashboardRessource {
	String RESOURCE_PATH = "/dashboard";

	// GET
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	DashboardDto getOneDashboard();

}
