package ca.csfoy.investmentSaladApi.controller.widget;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.RestController;

import ca.csfoy.investmentSaladApi.api.widget.WidgetDto;
import ca.csfoy.investmentSaladApi.api.widget.WidgetFullDto;
import ca.csfoy.investmentSaladApi.api.widget.WidgetRessource;
import ca.csfoy.investmentSaladApi.api.widget.distibution.DistributionWidgetDto;
import ca.csfoy.investmentSaladApi.api.widget.distibution.DistributionWidgetFullDto;
import ca.csfoy.investmentSaladApi.api.widget.net_worth.NetWorthWidgetDto;
import ca.csfoy.investmentSaladApi.api.widget.net_worth.NetWorthWidgetFullDto;
import ca.csfoy.investmentSaladApi.api.widget.watch_list.WatchListWidgetDto;
import ca.csfoy.investmentSaladApi.api.widget.watch_list.WatchListWidgetFullDto;
import ca.csfoy.investmentSaladApi.controller.exception.ErrorMessageLabel;
import ca.csfoy.investmentSaladApi.controller.validations.CustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.ValidatorFactory;
import ca.csfoy.investmentSaladApi.domain.widget.WidgetRepository;
import ca.csfoy.investmentSaladApi.domain.widget.WidgetTypes;

@RestController
public class WidgetController implements WidgetRessource {
	WidgetRepository repo;
	WidgetConverter converter;
	ValidatorFactory validatorFactory;

	public WidgetController(WidgetRepository repo, WidgetConverter converter, ValidatorFactory validatorFactory) {
		this.repo = repo;
		this.converter = converter;
		this.validatorFactory = validatorFactory;
	}

	@Override
	public List<WidgetFullDto> getAll() {
		return repo.getAll().stream().map(converter::fromWidgetToFullDto).collect(Collectors.toList());
	}

	@Override
	public WidgetFullDto createDistributionWidget(DistributionWidgetDto dto, String dashboardId) {
		CustomValidator<WidgetDto, String> validator = validatorFactory.getWidgetDtoValidator();
		validator.validate(dto);
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		dto.setWidgetType(WidgetTypes.DISTRIBUTION);
		return converter.fromWidgetToFullDto(repo.create(converter.fromDtoToWidget(dto, dashboardId)));
	}

	@Override
	public WidgetFullDto createNetWorthWidget(NetWorthWidgetDto dto, String dashboardId) {
		CustomValidator<WidgetDto, String> validator = validatorFactory.getWidgetDtoValidator();
		validator.validate(dto);
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		dto.setWidgetType(WidgetTypes.NET_WORTH);
		return converter.fromWidgetToFullDto(repo.create(converter.fromDtoToWidget(dto, dashboardId)));
	}

	@Override
	public WidgetFullDto createWatchListWidget(WatchListWidgetDto dto, String dashboardId) {
		CustomValidator<WidgetDto, String> validator = validatorFactory.getWidgetDtoValidator();
		validator.validateId(dashboardId);
		validator.validate(dto);
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		dto.setWidgetType(WidgetTypes.WATCH_LIST);
		return converter.fromWidgetToFullDto(repo.create(converter.fromDtoToWidget(dto, dashboardId)));
	}

	@Override
	public void updateDistributionWidget(DistributionWidgetFullDto dto, String dashboardId, String id) {
		CustomValidator<WidgetFullDto, String> validator = validatorFactory.getWidgetFullDtoValidator();
		validator.validate(id, dto);
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		dto.setWidgetType(WidgetTypes.DISTRIBUTION);
		repo.save(id, converter.fromFullDtoToWidget(dto, dashboardId));
	}

	@Override
	public void updateWatchListWidget(WatchListWidgetFullDto dto, String dashboardId, String id) {
		CustomValidator<WidgetFullDto, String> validator = validatorFactory.getWidgetFullDtoValidator();
		validator.validate(id, dto);
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		dto.setWidgetType(WidgetTypes.WATCH_LIST);
		repo.save(id, converter.fromFullDtoToWidget(dto, dashboardId));
	}

	@Override
	public void updateNetWorthWidget(NetWorthWidgetFullDto dto, String dashboardId, String id) {
		CustomValidator<WidgetFullDto, String> validator = validatorFactory.getWidgetFullDtoValidator();
		validator.validate(id, dto);
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		dto.setWidgetType(WidgetTypes.NET_WORTH);
		repo.save(id, converter.fromFullDtoToWidget(dto, dashboardId));
	}

	@Override
	public void deleteWidget(String id) {
		CustomValidator<WidgetFullDto, String> validator = validatorFactory.getWidgetFullDtoValidator();
		validator.validateId(id);
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		repo.delete(id);
	}
}
