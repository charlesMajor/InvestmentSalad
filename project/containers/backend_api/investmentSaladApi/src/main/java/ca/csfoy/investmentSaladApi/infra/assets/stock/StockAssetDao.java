package ca.csfoy.investmentSaladApi.infra.assets.stock;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StockAssetDao extends JpaRepository<StockAssetEntity, String> {

	@Query(value = "SELECT * FROM stock_asset_entity WHERE id = :assetId AND portfolio_id IN (SELECT id FROM portfolio_entity WHERE user_id = :userId)", nativeQuery = true)
	StockAssetEntity getByAssetId(String assetId, String userId);

	@Query(value = "SELECT * FROM stock_asset_entity WHERE portfolio_id IN (SELECT id FROM portfolio_entity WHERE user_id = :userId)", nativeQuery = true)
	List<StockAssetEntity> getAllStockAssets(String userId);

	@Query(value = "SELECT * FROM stock_asset_entity WHERE portfolio_id = :portfolioId AND portfolio_id IN (SELECT id FROM portfolio_entity WHERE user_id = :userId)", nativeQuery = true)
	List<StockAssetEntity> getAllStockAssetsByPortfolioId(String userId, String portfolioId);
}
