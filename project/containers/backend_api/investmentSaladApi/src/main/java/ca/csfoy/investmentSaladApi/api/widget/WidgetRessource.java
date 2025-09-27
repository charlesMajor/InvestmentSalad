package ca.csfoy.investmentSaladApi.api.widget;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

import ca.csfoy.investmentSaladApi.api.widget.distibution.DistributionWidgetDto;
import ca.csfoy.investmentSaladApi.api.widget.distibution.DistributionWidgetFullDto;
import ca.csfoy.investmentSaladApi.api.widget.net_worth.NetWorthWidgetFullDto;
import ca.csfoy.investmentSaladApi.api.widget.net_worth.NetWorthWidgetDto;
import ca.csfoy.investmentSaladApi.api.widget.watch_list.WatchListWidgetDto;
import ca.csfoy.investmentSaladApi.api.widget.watch_list.WatchListWidgetFullDto;

@RequestMapping(value = WidgetRessource.RESOURCE_PATH, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
public interface WidgetRessource {
	String RESOURCE_PATH = "/widgets";
	final String PATH_PARAM_ID = "id";
	final String PATH_PARAM_DASHBOARD_ID = "dashBoardId";

	final String PATH_WITH_ID = "/{" + PATH_PARAM_ID + "}";
	final String PATH_WITH_DASHBOARD_ID = "/{" + PATH_PARAM_DASHBOARD_ID + "}";

	// GET ///////////////////////////////////////////////

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<WidgetFullDto> getAll();
	
	// POST ///////////////////////////////////////////////

	@PostMapping(PATH_WITH_DASHBOARD_ID + "/distribution")
	@ResponseStatus(HttpStatus.CREATED)
	public WidgetFullDto createDistributionWidget(@RequestBody DistributionWidgetDto dto,
			@PathVariable(PATH_PARAM_DASHBOARD_ID) String dashboardId);

	@PostMapping(PATH_WITH_DASHBOARD_ID + "/netWorth")
	@ResponseStatus(HttpStatus.CREATED)
	public WidgetFullDto createNetWorthWidget(@RequestBody NetWorthWidgetDto dto,
			@PathVariable(PATH_PARAM_DASHBOARD_ID) String dashboardId);

	@PostMapping(PATH_WITH_DASHBOARD_ID + "/watchList")
	@ResponseStatus(HttpStatus.CREATED)
	public WidgetFullDto createWatchListWidget(@RequestBody WatchListWidgetDto dto,
			@PathVariable(PATH_PARAM_DASHBOARD_ID) String dashboardId);

	// Delete ///////////////////////////////////////////////

	@DeleteMapping(PATH_WITH_ID)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteWidget(@PathVariable(PATH_PARAM_ID) String id);

	
	// PUT ///////////////////////////////////////////////

	@PutMapping(PATH_WITH_DASHBOARD_ID + "/distribution" + PATH_WITH_ID)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void updateDistributionWidget(@RequestBody DistributionWidgetFullDto dto,
			@PathVariable(PATH_PARAM_DASHBOARD_ID) String dashboardId, @PathVariable(PATH_PARAM_ID) String id);

	@PutMapping(PATH_WITH_DASHBOARD_ID + "/netWorth" + PATH_WITH_ID)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void updateNetWorthWidget(@RequestBody NetWorthWidgetFullDto dto,
			@PathVariable(PATH_PARAM_DASHBOARD_ID) String dashboardId, @PathVariable(PATH_PARAM_ID) String id);

	@PutMapping(PATH_WITH_DASHBOARD_ID + "/watchList" + PATH_WITH_ID)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void updateWatchListWidget(@RequestBody WatchListWidgetFullDto dto,
			@PathVariable(PATH_PARAM_DASHBOARD_ID) String dashboardId, @PathVariable(PATH_PARAM_ID) String id);


}
