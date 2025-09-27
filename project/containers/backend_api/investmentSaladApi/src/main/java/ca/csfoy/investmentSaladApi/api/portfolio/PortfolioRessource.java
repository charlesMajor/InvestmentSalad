package ca.csfoy.investmentSaladApi.api.portfolio;

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

@RequestMapping(value = PortfolioRessource.RESOURCE_PATH, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
public interface PortfolioRessource {
	String RESOURCE_PATH = "/portfolios";
	String PATH_PARAM_ID = "id";
	String PATH_WITH_ID = "/{" + PATH_PARAM_ID + "}";

	// POST
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	PortfolioFullDto createPortfolio(@RequestBody PortfolioLightDto portfolioDto);

	// GET
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	List<PortfolioFullDto> getUserPortfolios();

	@GetMapping(PATH_WITH_ID)
	@ResponseStatus(HttpStatus.OK)
	PortfolioFullDto getPortfolioById(@PathVariable(PATH_PARAM_ID) String portfolioId);

	// PUT
	@PutMapping(PATH_WITH_ID)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	void updatePortfolio(@PathVariable(PATH_PARAM_ID) String portfolioId, @RequestBody PortfolioFullDto portfolioDto);

	// DELETE
	@DeleteMapping(PATH_WITH_ID)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	void deletePortfolio(@PathVariable(PATH_PARAM_ID) String id);
}
