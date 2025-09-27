package ca.csfoy.investmentSaladApi.infra.assets.fixed_revenue;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FixedRevenueAssetDao extends JpaRepository<FixedRevenueAssetEntity, String> {

	@Query(value = "SELECT * FROM fixed_revenue_asset_entity WHERE id = :assetId AND portfolio_id IN (SELECT id FROM portfolio_entity WHERE user_id = :userId)", nativeQuery = true)
	FixedRevenueAssetEntity getByAssetId(String assetId, String userId);

	@Query(value = "SELECT * FROM fixed_revenue_asset_entity WHERE portfolio_id IN (SELECT id FROM portfolio_entity WHERE user_id = :userId)", nativeQuery = true)
	List<FixedRevenueAssetEntity> getAllFixedRevenueAssets(String userId);

	@Query(value = "SELECT * FROM fixed_revenue_asset_entity WHERE portfolio_id = :portfolioId AND portfolio_id IN (SELECT id FROM portfolio_entity WHERE user_id = :userId)", nativeQuery = true)
	List<FixedRevenueAssetEntity> getAllFixedRevenueAssetsByPortfolioId(String portfolioId, String userId);
}
