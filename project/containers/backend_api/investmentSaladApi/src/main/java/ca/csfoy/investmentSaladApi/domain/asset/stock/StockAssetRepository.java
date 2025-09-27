package ca.csfoy.investmentSaladApi.domain.asset.stock;

import java.util.List;

import ca.csfoy.investmentSaladApi.domain.BasicRepository;
import ca.csfoy.investmentSaladApi.domain.DeleteRepository;
import ca.csfoy.investmentSaladApi.domain.UpdateRepository;

public interface StockAssetRepository extends BasicRepository<String, StockAsset>, DeleteRepository<String, StockAsset>,
		UpdateRepository<String, StockAsset> {

	List<StockAsset> getAllStockAssets();

	List<StockAsset> getAllStockAssetsFromPortfolio(String id);

}
