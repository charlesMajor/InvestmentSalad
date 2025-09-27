package ca.csfoy.investmentSaladApi.controller.asset;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import ca.csfoy.investmentSaladApi.api.asset.AssetDto;
import ca.csfoy.investmentSaladApi.api.asset.crypto.CryptoAssetDto;
import ca.csfoy.investmentSaladApi.api.asset.crypto.CryptoAssetFullDto;
import ca.csfoy.investmentSaladApi.api.asset.fixed_revenue.FixedRevenueAssetDto;
import ca.csfoy.investmentSaladApi.api.asset.fixed_revenue.FixedRevenueAssetFullDto;
import ca.csfoy.investmentSaladApi.api.asset.ressource.RessourceAssetDto;
import ca.csfoy.investmentSaladApi.api.asset.ressource.RessourceAssetFullDto;
import ca.csfoy.investmentSaladApi.api.asset.stock.StockAssetDto;
import ca.csfoy.investmentSaladApi.api.asset.stock.StockAssetFullDto;
import ca.csfoy.investmentSaladApi.domain.asset.crypto.CryptoAsset;
import ca.csfoy.investmentSaladApi.domain.asset.fixed_revenue.FixedRevenueAsset;
import ca.csfoy.investmentSaladApi.domain.asset.ressource.RessourceAsset;
import ca.csfoy.investmentSaladApi.domain.asset.stock.StockAsset;

@Component
public class AssetConverter {

	/////////////////////////////////////////////////////////////
	public FixedRevenueAsset fromFixedRevenueFullDtoToAsset(FixedRevenueAssetFullDto dto) {
		return new FixedRevenueAsset(dto.getId(), dto.getPortfolioId(), dto.getName(), dto.getDescription(),
				dto.getQuantity(), dto.getUnitPrice(), dto.getBuyDate(), dto.getInterestRate(),
				dto.getPaymentFrequencyPerYear(), dto.getExpirationDate(), dto.getFirstPaymentDate(), dto.getTags());
	}

	public FixedRevenueAsset fromFixedRevenueDtoToAsset(FixedRevenueAssetDto dto, String portfolioId) {
		return new FixedRevenueAsset(UUID.randomUUID().toString(), portfolioId, dto.getName(), dto.getDescription(),
				dto.getQuantity(), dto.getUnitPrice(), dto.getBuyDate(), dto.getInterestRate(),
				dto.getPaymentFrequencyPerYear(), dto.getExpirationDate(), dto.getFirstPaymentDate(), dto.getTags());
	}

	public FixedRevenueAssetFullDto fromFixedRevenueAssetToDto(FixedRevenueAsset asset) {
		return new FixedRevenueAssetFullDto(asset.getId(), asset.getPortfolioId(), asset.getName(),
				asset.getDescription(), asset.getQuantity(), asset.getUnitPurchasePrice(), asset.getTags(),
				asset.getBuyDate(), asset.getInterestRate(), asset.getPaymentFrequencyPerYear(),
				asset.getExpirationDate(), asset.getFirstPaymentDate());
	}

	public List<FixedRevenueAssetFullDto> fromFixedRevenueAssetListToDtoList(List<FixedRevenueAsset> assets) {
		return assets.stream().map(asset -> fromFixedRevenueAssetToDto(asset)).collect(Collectors.toList());
	}

	/////////////////////////////////////////////////////////////
	public StockAsset fromStockDtoToAsset(StockAssetDto dto, String portfolioId) {
		return new StockAsset(UUID.randomUUID().toString(), portfolioId, dto.getName(), dto.getDescription(),
				dto.getQuantity(), dto.getUnitPrice(), dto.getBuyDate(), dto.getSymbol(), dto.getTags());
	}

	public StockAsset fromFullStockDtoToAsset(StockAssetFullDto dto, String portfolioId) {
		return new StockAsset(dto.getId(), dto.getPortfolioId(), dto.getName(), dto.getDescription(),
				dto.getQuantity(), dto.getUnitPrice(), dto.getBuyDate(), dto.getSymbol(), dto.getTags());
	}
	public StockAssetFullDto fromStockAssetToDto(StockAsset asset) {
		return new StockAssetFullDto(asset.getId(), asset.getPortfolioId(), asset.getName(), asset.getDescription(),
				asset.getQuantity(), asset.getUnitPurchasePrice(), asset.getTags(), asset.getBuyDate(),
				asset.getSymbol());
	}

	public List<AssetDto> fromStockAssetListToDtoList(List<StockAsset> assets) {
		return assets.stream().map(this::fromStockAssetToDto).collect(Collectors.toList());
	}

	/////////////////////////////////////////////////////////////
	public RessourceAsset fromRessourceDtoToAsset(RessourceAssetDto dto, String portfolioId) {
		return new RessourceAsset(UUID.randomUUID().toString(), portfolioId, dto.getName(), dto.getDescription(),
				dto.getQuantity(), dto.getUnitPrice(), dto.getBuyDate(), dto.getRessourceType(), dto.getTags());
	}

	public RessourceAssetFullDto fromRessourceAssetToDto(RessourceAsset asset) {
		return new RessourceAssetFullDto(asset.getId(), asset.getPortfolioId(), asset.getName(), asset.getDescription(),
				asset.getQuantity(), asset.getUnitPurchasePrice(), asset.getTags(), asset.getBuyDate(),
				asset.getRessourceType());
	}
	public RessourceAsset fromRessourceFullDtoToAsset(RessourceAssetFullDto dto) {
		return new RessourceAsset(dto.getId(), dto.getPortfolioId(), dto.getName(), dto.getDescription(),
				dto.getQuantity(), dto.getUnitPrice(), dto.getBuyDate(), dto.getRessourceType(), dto.getTags());
	}

	public List<AssetDto> fromRessourceAssetListToDtoList(List<RessourceAsset> assets) {
		return assets.stream().map(this::fromRessourceAssetToDto).collect(Collectors.toList());
	}

	/////////////////////////////////////////////////////////////
	public CryptoAsset fromCryptoDtoToAsset(CryptoAssetDto dto, String portfolioId) {
		return new CryptoAsset(UUID.randomUUID().toString(), portfolioId, dto.getName(), dto.getDescription(),
				dto.getQuantity(), dto.getUnitPrice(), dto.getBuyDate(), dto.getSymbol(), dto.getTags());
	}

	public CryptoAsset fromCryptoFullDtoToAsset(CryptoAssetFullDto dto) {
		return new CryptoAsset(dto.getId(), dto.getPortfolioId(), dto.getName(), dto.getDescription(),
				dto.getQuantity(), dto.getUnitPrice(), dto.getBuyDate(), dto.getSymbol(), dto.getTags());
	}

	public CryptoAssetFullDto fromCryptoAssetToDto(CryptoAsset asset) {
		return new CryptoAssetFullDto(asset.getId(), asset.getPortfolioId(), asset.getName(), asset.getDescription(),
				asset.getQuantity(), asset.getUnitPurchasePrice(), asset.getTags(), asset.getBuyDate(),
				asset.getSymbol());
	}

	public List<AssetDto> fromCryptoAssetListToDtoList(List<CryptoAsset> assets) {
		return assets.stream().map(this::fromCryptoAssetToDto).collect(Collectors.toList());
	}

}
