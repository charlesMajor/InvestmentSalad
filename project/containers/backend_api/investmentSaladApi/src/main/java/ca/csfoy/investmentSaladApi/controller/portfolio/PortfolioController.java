package ca.csfoy.investmentSaladApi.controller.portfolio;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;

import ca.csfoy.investmentSaladApi.api.portfolio.PortfolioFullDto;
import ca.csfoy.investmentSaladApi.api.portfolio.PortfolioLightDto;
import ca.csfoy.investmentSaladApi.api.portfolio.PortfolioRessource;
import ca.csfoy.investmentSaladApi.controller.exception.ErrorMessageLabel;
import ca.csfoy.investmentSaladApi.controller.validations.CustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.ValidatorFactory;
import ca.csfoy.investmentSaladApi.domain.portfolio.PortfolioRepository;

@RestController
public class PortfolioController implements PortfolioRessource {

	private final PortfolioRepository repo;
	private final PortfolioConverter converter;
	private final ValidatorFactory validatorFactory;

	public PortfolioController(PortfolioRepository repo, PortfolioConverter converter,
			ValidatorFactory validatorFactory) {
		super();
		this.repo = repo;
		this.converter = converter;
		this.validatorFactory = validatorFactory;
	}

	//CREATE
	@Override
	public PortfolioFullDto createPortfolio(PortfolioLightDto portfolioDto) {
		CustomValidator<PortfolioLightDto, String> validator = validatorFactory.getPorfolioLightDtoValidator();
		validator.validate(portfolioDto);
		if (portfolioDto.getTags() != null) {
			for (String tag : portfolioDto.getTags()) {
				validator.validateId(tag);
			}
		}

		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		PortfolioFullDto createdPortfolio = converter
				.fromPortfolioToDto(repo.create(converter.fromLightDtoToPortfolio(portfolioDto)));
		return createdPortfolio;
	}

	//GET
	@Override
	public List<PortfolioFullDto> getUserPortfolios() {
		return converter.fromPortfolioListToDtoList(repo.getAllByUserId());
	}

	@Override
	public PortfolioFullDto getPortfolioById(String id) {
		CustomValidator<PortfolioFullDto, String> validator = validatorFactory.getPortfolioFullDtoValidator();
		validator.validateId(id);
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		return converter.fromPortfolioToDto(repo.getBy(id));
	}

	//UPDATE
	@Override
	public void updatePortfolio(String id, PortfolioFullDto portfolioDto) {
		CustomValidator<PortfolioFullDto, String> validator = validatorFactory.getPortfolioFullDtoValidator();
		validator.validate(id, portfolioDto);
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		repo.save(id, converter.fromFullDtoToPortfolio(portfolioDto));
	}

	//DELETE
	@Override
	public void deletePortfolio(String id) {
		CustomValidator<PortfolioFullDto, String> validator = validatorFactory.getPortfolioFullDtoValidator();
		validator.validateId(id);
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		repo.delete(id);
	}
}