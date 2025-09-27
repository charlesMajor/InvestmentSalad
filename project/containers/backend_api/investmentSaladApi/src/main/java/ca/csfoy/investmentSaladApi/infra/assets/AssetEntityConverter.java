package ca.csfoy.investmentSaladApi.infra.assets;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import ca.csfoy.investmentSaladApi.controller.exception.ErrorMessageLabel;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.ObjectNotFoundException;
import ca.csfoy.investmentSaladApi.domain.asset.crypto.CryptoAsset;
import ca.csfoy.investmentSaladApi.domain.asset.fixed_revenue.FixedRevenueAsset;
import ca.csfoy.investmentSaladApi.domain.asset.ressource.RessourceAsset;
import ca.csfoy.investmentSaladApi.domain.asset.stock.StockAsset;
import ca.csfoy.investmentSaladApi.infra.assets.crypto.CryptoAssetEntity;
import ca.csfoy.investmentSaladApi.infra.assets.fixed_revenue.FixedRevenueAssetEntity;
import ca.csfoy.investmentSaladApi.infra.assets.ressource.RessourceAssetEntity;
import ca.csfoy.investmentSaladApi.infra.assets.stock.StockAssetEntity;
import ca.csfoy.investmentSaladApi.infra.portfolio.PortfolioDao;
import ca.csfoy.investmentSaladApi.infra.portfolio.PortfolioEntity;
import ca.csfoy.investmentSaladApi.infra.tag.TagEntity;
import ca.csfoy.investmentSaladApi.infra.tag.crypto_asset_tag.CryptoAssetTagEntity;
import ca.csfoy.investmentSaladApi.infra.tag.crypto_asset_tag.CryptoAssetTagId;
import ca.csfoy.investmentSaladApi.infra.tag.fixed_revenue_asset_tag.FixedRevenueAssetTagEntity;
import ca.csfoy.investmentSaladApi.infra.tag.fixed_revenue_asset_tag.FixedRevenueAssetTagId;
import ca.csfoy.investmentSaladApi.infra.tag.ressource_asset_tag.RessourceAssetTagEntity;
import ca.csfoy.investmentSaladApi.infra.tag.ressource_asset_tag.RessourceAssetTagId;
import ca.csfoy.investmentSaladApi.infra.tag.stock_asset_tag.StockAssetTagEntity;
import ca.csfoy.investmentSaladApi.infra.tag.stock_asset_tag.StockAssetTagId;

@Component
public class AssetEntityConverter {

	PortfolioDao portfolioDao;

	public AssetEntityConverter(PortfolioDao portfolioDao) {
		this.portfolioDao = portfolioDao;
	}

	/////////////////////////////////////////////////////////////
	public StockAsset fromStockEntityToStockAsset(StockAssetEntity entity) 
	{
		 List<String> tagIds = entity.getAssetTags().stream()
	                .map(StockAssetTagEntity::getId)
	                .map(StockAssetTagId::getTag)
	                .map(TagEntity::getId)
	                .collect(Collectors.toList());
		
		return new StockAsset(entity.getId(), entity.getPortfolio().getId(), entity.getName(), entity.getDescription(), entity.getQuantity(),
				entity.getUnitPurchasePrice(), entity.getBuyDate(), entity.getSymbol(), tagIds);
	}

	public StockAssetEntity fromStockAssetToEntity(StockAsset asset) {
		return new StockAssetEntity(asset.getId(), getPortfolioFromId(asset.getPortfolioId()),
				asset.getName(), asset.getDescription(), asset.getQuantity(), asset.getUnitPurchasePrice(),
				asset.getBuyDate(), asset.getSymbol());
	}

	public List<StockAsset> fromStockEntityListToAssetList(List<StockAssetEntity> entityList) {
		return entityList.stream().map(this::fromStockEntityToStockAsset).collect(Collectors.toList());
	}

	/////////////////////////////////////////////////////////////
	public FixedRevenueAsset fromFixedRevenueEntityAsset(FixedRevenueAssetEntity entity) {
		
	      List<String> tagIds = entity.getAssetTags().stream()
	                .map(FixedRevenueAssetTagEntity::getId)
	                .map(FixedRevenueAssetTagId::getTag)
	                .map(TagEntity::getId)
	                .collect(Collectors.toList());
		
		return new FixedRevenueAsset(entity.getId(), entity.getPortfolio().getId(), entity.getName(), entity.getDescription(), entity.getQuantity(),
				entity.getUnitPurchasePrice(), entity.getBuyDate(), entity.getInterestRate(), entity.getPaymentFrequencyPerYear(),
				entity.getExpirationDate(), entity.getFirstPaymentDate(), tagIds);
	}

	public FixedRevenueAssetEntity fromFixedRevenueAssetToEntity(FixedRevenueAsset asset) {
		return new FixedRevenueAssetEntity(asset.getId(), getPortfolioFromId(asset.getPortfolioId()), asset.getName(),
				asset.getDescription(), asset.getQuantity(), asset.getUnitPurchasePrice(), asset.getBuyDate(),
				asset.getInterestRate(), asset.getPaymentFrequencyPerYear(), asset.getExpirationDate(),
				asset.getFirstPaymentDate());
	}

	public List<FixedRevenueAsset> fromFixedRevenueEntityListToAssetList(List<FixedRevenueAssetEntity> entityList) {
		return entityList.stream().map(this::fromFixedRevenueEntityAsset).collect(Collectors.toList());
	}

	/////////////////////////////////////////////////////////////
	public RessourceAsset fromRessourceEntityToAsset(RessourceAssetEntity entity) {
	    
		List<String> tagIds = entity.getAssetTags().stream()
	                .map(RessourceAssetTagEntity::getId)
	                .map(RessourceAssetTagId::getTag)
	                .map(TagEntity::getId)
	                .collect(Collectors.toList());
		
		return new RessourceAsset(entity.getId(), entity.getPortfolio().getId(), entity.getName(), entity.getDescription(), entity.getQuantity(),
				entity.getUnitPurchasePrice(), entity.getBuyDate(), entity.getRessourceType(), tagIds);
	}

	public RessourceAssetEntity fromRessourceAssetToEntity(RessourceAsset asset) {
		return new RessourceAssetEntity(asset.getId(), getPortfolioFromId(asset.getPortfolioId()),
				asset.getName(), asset.getDescription(), asset.getQuantity(), asset.getUnitPurchasePrice(),
				asset.getBuyDate(), asset.getRessourceType());
	}

	public List<RessourceAsset> fromRessourceEntityListToAssetList(List<RessourceAssetEntity> entityList) {
		return entityList.stream().map(this::fromRessourceEntityToAsset).collect(Collectors.toList());
	}

	/////////////////////////////////////////////////////////////
	public CryptoAsset fromCryptoEntityToCryptoAsset(CryptoAssetEntity entity) 
	{
        List<String> tagIds = entity.getAssetTags().stream()
                .map(CryptoAssetTagEntity::getId)
                .map(CryptoAssetTagId::getTag)
                .map(TagEntity::getId)
                .collect(Collectors.toList());
		
		return new CryptoAsset(entity.getId(), entity.getPortfolio().getId(), entity.getName(), entity.getDescription(), entity.getQuantity(),
				entity.getUnitPurchasePrice(), entity.getBuyDate(), entity.getSymbol(), tagIds);
	}

	public CryptoAssetEntity fromCryptoAssetToEntity(CryptoAsset asset) {

		return new CryptoAssetEntity(asset.getId(), getPortfolioFromId(asset.getPortfolioId()), asset.getName(),
				asset.getDescription(), asset.getQuantity(), asset.getUnitPurchasePrice(), asset.getBuyDate(),
				asset.getSymbol());
	}

	public List<CryptoAsset> fromCryptoEntityListToAssetList(List<CryptoAssetEntity> entityList) {
		return entityList.stream().map(this::fromCryptoEntityToCryptoAsset).collect(Collectors.toList());
	}

	private PortfolioEntity getPortfolioFromId(String id) {
		Optional<PortfolioEntity> portfolioEntity = portfolioDao.findById(id);
		if (portfolioEntity.isEmpty()) {
			throw new ObjectNotFoundException(String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Portfolio", id));
		}
		return portfolioEntity.get();
	}
}
