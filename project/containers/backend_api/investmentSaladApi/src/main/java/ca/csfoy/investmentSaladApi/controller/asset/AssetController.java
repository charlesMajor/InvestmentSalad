package ca.csfoy.investmentSaladApi.controller.asset;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RestController;

import ca.csfoy.investmentSaladApi.api.asset.AssetDto;
import ca.csfoy.investmentSaladApi.api.asset.AssetRessource;
import ca.csfoy.investmentSaladApi.api.asset.crypto.CryptoAssetDto;
import ca.csfoy.investmentSaladApi.api.asset.crypto.CryptoAssetFullDto;
import ca.csfoy.investmentSaladApi.api.asset.fixed_revenue.FixedRevenueAssetDto;
import ca.csfoy.investmentSaladApi.api.asset.fixed_revenue.FixedRevenueAssetFullDto;
import ca.csfoy.investmentSaladApi.api.asset.ressource.RessourceAssetDto;
import ca.csfoy.investmentSaladApi.api.asset.ressource.RessourceAssetFullDto;
import ca.csfoy.investmentSaladApi.api.asset.stock.StockAssetDto;
import ca.csfoy.investmentSaladApi.api.asset.stock.StockAssetFullDto;
import ca.csfoy.investmentSaladApi.controller.exception.ErrorMessageLabel;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.ObjectNotFoundException;
import ca.csfoy.investmentSaladApi.controller.validations.CustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.ValidatorFactory;
import ca.csfoy.investmentSaladApi.domain.asset.AssetType;
import ca.csfoy.investmentSaladApi.domain.asset.crypto.CryptoAssetRepository;
import ca.csfoy.investmentSaladApi.domain.asset.fixed_revenue.FixedRevenueAssetRepository;
import ca.csfoy.investmentSaladApi.domain.asset.ressource.RessourceAssetRepository;
import ca.csfoy.investmentSaladApi.domain.asset.stock.StockAssetRepository;

@RestController
public class AssetController implements AssetRessource {

	private final ValidatorFactory validatorFactory;
	private final AssetConverter converter;
	private final CryptoAssetRepository cryptoRepo;
	private final StockAssetRepository stockRepo;
	private final FixedRevenueAssetRepository fixedRevenueRepo;
	private final RessourceAssetRepository ressourceRepo;

	public AssetController(ValidatorFactory validatorFactory, AssetConverter converter,
			CryptoAssetRepository cryptoRepo, StockAssetRepository stockRepo,
			FixedRevenueAssetRepository fixedRevenueRepo, RessourceAssetRepository ressourceRepo) {
		this.validatorFactory = validatorFactory;
		this.converter = converter;
		this.cryptoRepo = cryptoRepo;
		this.stockRepo = stockRepo;
		this.fixedRevenueRepo = fixedRevenueRepo;
		this.ressourceRepo = ressourceRepo;
	}

	// CREATE
	@Override
	public CryptoAssetFullDto createCryptoAsset(String id, CryptoAssetDto dto) {
		CustomValidator<CryptoAssetDto, String> validator = validatorFactory.getCryptoAssetDtoCustomValidator();
		validator.validate(id, dto);
		for (String tag : dto.getTags()) {
			validator.validateId(tag);
		}
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		return converter.fromCryptoAssetToDto(cryptoRepo.create(converter.fromCryptoDtoToAsset(dto, id)));
	}

	@Override
	public StockAssetFullDto createStockAsset(String id, StockAssetDto dto) {
		CustomValidator<StockAssetDto, String> validator = validatorFactory.getStockAssetDtoCustomValidator();
		validator.validate(id, dto);
		for (String tag : dto.getTags()) {
			validator.validateId(tag);
		}
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		return converter.fromStockAssetToDto(stockRepo.create(converter.fromStockDtoToAsset(dto, id)));
	}

	@Override
	public RessourceAssetFullDto createRessourceAsset(String id, RessourceAssetDto dto) {
		CustomValidator<RessourceAssetDto, String> validator = validatorFactory.getRessourceAssetDtoCustomValidator();
		validator.validate(id, dto);
		for (String tag : dto.getTags()) {
			validator.validateId(tag);
		}
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		return converter.fromRessourceAssetToDto(ressourceRepo.create(converter.fromRessourceDtoToAsset(dto, id)));
	}

	@Override
	public FixedRevenueAssetFullDto createFixedRevenuAsset(String id, FixedRevenueAssetDto dto) {
		CustomValidator<FixedRevenueAssetDto, String> validator = validatorFactory
				.getFixedRevenuAssetDtoCustomValidator();
		validator.validate(id, dto);
		for (String tag : dto.getTags()) {
			validator.validateId(tag);
		}
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		return converter
				.fromFixedRevenueAssetToDto(fixedRevenueRepo.create(converter.fromFixedRevenueDtoToAsset(dto, id)));
	}

	// GET
	@Override
	public List<AssetDto> getAllAssets() {
		List<AssetDto> assets = new ArrayList<>();
		assets.addAll(converter.fromCryptoAssetListToDtoList(cryptoRepo.getAllCryptoAssets()));
		assets.addAll(converter.fromFixedRevenueAssetListToDtoList(fixedRevenueRepo.getAllFixedRevenueAssets()));
		assets.addAll(converter.fromRessourceAssetListToDtoList(ressourceRepo.getAllRessourceAssets()));
		assets.addAll(converter.fromStockAssetListToDtoList(stockRepo.getAllStockAssets()));
		return assets;
	}

	@Override
	public List<AssetDto> getAllAssetsFromPortfolio(String id) {
		List<AssetDto> assets = new ArrayList<>();
		assets.addAll(converter.fromCryptoAssetListToDtoList(cryptoRepo.getAllCryptoAssetsFromPortfolio(id)));
		assets.addAll(converter
				.fromFixedRevenueAssetListToDtoList(fixedRevenueRepo.getAllFixedRevenueAssetsFromPortfolio(id)));
		assets.addAll(converter.fromRessourceAssetListToDtoList(ressourceRepo.getAllRessourceAssetsFromPortfolio(id)));
		assets.addAll(converter.fromStockAssetListToDtoList(stockRepo.getAllStockAssetsFromPortfolio(id)));
		return assets;
	}

	@Override
	public AssetDto getAssetById(AssetType assetType, String assetId) {

		switch (assetType) {
		case STOCK: {
			CustomValidator<StockAssetDto, String> validator = validatorFactory.getStockAssetDtoCustomValidator();
			validator.validateId(assetId);
			validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
			return converter.fromStockAssetToDto(stockRepo.getBy(assetId));
		}
		case CRYPTO: {
			CustomValidator<CryptoAssetDto, String> validator = validatorFactory.getCryptoAssetDtoCustomValidator();
			validator.validateId(assetId);
			validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
			return converter.fromCryptoAssetToDto(cryptoRepo.getBy(assetId));
		}
		case FIXED_REVENUE: {
			CustomValidator<FixedRevenueAssetDto, String> validator = validatorFactory
					.getFixedRevenuAssetDtoCustomValidator();
			validator.validateId(assetId);
			validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
			return converter.fromFixedRevenueAssetToDto(fixedRevenueRepo.getBy(assetId));
		}
		case RESSOURCE: {
			CustomValidator<RessourceAssetDto, String> validator = validatorFactory
					.getRessourceAssetDtoCustomValidator();
			validator.validateId(assetId);
			validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
			return converter.fromRessourceAssetToDto(ressourceRepo.getBy(assetId));
		}
		default:
			throw new ObjectNotFoundException(String.format(ErrorMessageLabel.MSG_VAL_ASSET_TYPE, assetType));
		}
	}

	// UPDATE
	@Override
	public void updateCryptoAsset(String id, CryptoAssetFullDto dto) {
		CustomValidator<CryptoAssetFullDto, String> validator = validatorFactory.getFullCryptoAssetDtoCustomValidator();
		validator.validate(id, dto);
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		cryptoRepo.save(id, converter.fromCryptoFullDtoToAsset(dto));

	}

	@Override
	public void updateFixedRevenueAsset(String id, FixedRevenueAssetFullDto dto) {
		CustomValidator<FixedRevenueAssetFullDto, String> validator = validatorFactory
				.getFullFixedRevenueCustomValidator();
		validator.validate(id, dto);
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		fixedRevenueRepo.save(id, converter.fromFixedRevenueFullDtoToAsset(dto));
	}

	@Override
	public void updateRessourceAsset(String id, RessourceAssetFullDto dto) {

		CustomValidator<RessourceAssetFullDto, String> validator = validatorFactory
				.getFullRessourceDtoCustomValidator();
		validator.validate(id, dto);
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		ressourceRepo.save(id, converter.fromRessourceFullDtoToAsset(dto));
	}

	@Override
	public void updateStockAsset(String id, StockAssetFullDto dto) {
		CustomValidator<StockAssetFullDto, String> validator = validatorFactory.getFullStockDtoCustomValidator();
		validator.validate(id, dto);
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		stockRepo.save(id, converter.fromFullStockDtoToAsset(dto, id));
	}

	// DELETE
	@Override
	public void deleteAssetById(AssetType assetType, String assetId) {
		switch (assetType) {
		case STOCK: {
			CustomValidator<StockAssetDto, String> validator = validatorFactory.getStockAssetDtoCustomValidator();
			validator.validateId(assetId);
			validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
			stockRepo.delete(assetId);
			break;
		}
		case CRYPTO: {
			CustomValidator<CryptoAssetDto, String> validator = validatorFactory.getCryptoAssetDtoCustomValidator();
			validator.validateId(assetId);
			validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
			cryptoRepo.delete(assetId);
			break;
		}
		case FIXED_REVENUE: {
			CustomValidator<FixedRevenueAssetDto, String> validator = validatorFactory
					.getFixedRevenuAssetDtoCustomValidator();
			validator.validateId(assetId);
			validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
			fixedRevenueRepo.delete(assetId);
			break;
		}
		case RESSOURCE: {
			CustomValidator<RessourceAssetDto, String> validator = validatorFactory
					.getRessourceAssetDtoCustomValidator();
			validator.validateId(assetId);
			validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
			ressourceRepo.delete(assetId);
			break;
		}
		default:
			throw new ObjectNotFoundException("temp");
		}
	}

}
