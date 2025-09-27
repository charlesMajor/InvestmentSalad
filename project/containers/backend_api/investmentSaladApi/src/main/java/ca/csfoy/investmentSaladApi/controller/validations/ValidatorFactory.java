package ca.csfoy.investmentSaladApi.controller.validations;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import ca.csfoy.investmentSaladApi.api.asset.crypto.CryptoAssetFullDto;
import ca.csfoy.investmentSaladApi.api.asset.fixed_revenue.FixedRevenueAssetFullDto;
import ca.csfoy.investmentSaladApi.api.asset.ressource.RessourceAssetFullDto;
import ca.csfoy.investmentSaladApi.api.asset.stock.StockAssetFullDto;
import ca.csfoy.investmentSaladApi.api.portfolio.PortfolioFullDto;
import ca.csfoy.investmentSaladApi.api.portfolio.PortfolioLightDto;
import ca.csfoy.investmentSaladApi.api.tag.FullTagDto;
import ca.csfoy.investmentSaladApi.api.tag.LightTagDto;
import ca.csfoy.investmentSaladApi.api.user.FullUserDto;
import ca.csfoy.investmentSaladApi.api.widget.WidgetDto;
import ca.csfoy.investmentSaladApi.api.widget.WidgetFullDto;
import ca.csfoy.investmentSaladApi.controller.validations.assets.crypto.CryptoAssetDtoCustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.assets.crypto.CryptoAssetFullDtoCustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.assets.fixedRevenue.FixedRevenueAssetDtoCustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.assets.fixedRevenue.FixedRevenueAssetFullDtoCustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.assets.ressource.RessourceAssetDtoCustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.assets.ressource.RessourceAssetFullDtoCustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.assets.stock.StockAssetDtoCustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.assets.stock.StockAssetFullDtoCustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.portfolio.PortfolioFullDtoCustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.portfolio.PortfolioLightDtoCustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.tag.FullTagDtoCustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.tag.LightTagDtoCustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.user.FullUserDtoCustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.user.LightUserDtoValidator;
import ca.csfoy.investmentSaladApi.controller.validations.user.UserDtoCustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.widgets.WidgetDtoCustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.widgets.WidgetFullDtoCustomValidator;
import jakarta.validation.Validation;

@Component
@Scope("prototype")
public class ValidatorFactory {

	public ValidatorFactory() {
	}

	public CustomValidator<PortfolioFullDto, String> getPortfolioFullDtoValidator() {
		return new PortfolioFullDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator());
	}

	public CustomValidator<PortfolioLightDto, String> getPorfolioLightDtoValidator() {
		return new PortfolioLightDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator());
	}

	public CustomValidator<FullTagDto, String> getFullTagDtoValidator() {
		return new FullTagDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator());
	}

	public CustomValidator<LightTagDto, String> getLightTagDtoValidator() {
		return new LightTagDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator());
	}

	public CustomValidator<FullUserDto, String> getFullUserDtoValidator() {
		return new FullUserDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator());
	}

	public CustomValidator<CryptoAssetFullDto, String> getFullCryptoAssetDtoCustomValidator() {
		return new CryptoAssetFullDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator());
	}

	public CustomValidator<FixedRevenueAssetFullDto, String> getFullFixedRevenueCustomValidator() {
		return new FixedRevenueAssetFullDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator());
	}

	public CustomValidator<RessourceAssetFullDto, String> getFullRessourceDtoCustomValidator() {
		return new RessourceAssetFullDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator());
	}

	public CustomValidator<StockAssetFullDto, String> getFullStockDtoCustomValidator() {
		return new StockAssetFullDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator());

	}

	public CustomValidator<WidgetDto, String> getWidgetDtoValidator() {
		return new WidgetDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator());
	}

	public CustomValidator<WidgetFullDto, String> getWidgetFullDtoValidator() {
		return new WidgetFullDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator());
	}

	public UserDtoCustomValidator getUserDtoValidator() {
		return new UserDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator());
	}

	public LightUserDtoValidator getLightUserDtoValidator() {
		return new LightUserDtoValidator(Validation.buildDefaultValidatorFactory().getValidator());
	}

	public CryptoAssetDtoCustomValidator getCryptoAssetDtoCustomValidator() {
		return new CryptoAssetDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator());

	}

	public StockAssetDtoCustomValidator getStockAssetDtoCustomValidator() {
		return new StockAssetDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator());

	}

	public RessourceAssetDtoCustomValidator getRessourceAssetDtoCustomValidator() {
		return new RessourceAssetDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator());

	}

	public FixedRevenueAssetDtoCustomValidator getFixedRevenuAssetDtoCustomValidator() {
		return new FixedRevenueAssetDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator());

	}
}
