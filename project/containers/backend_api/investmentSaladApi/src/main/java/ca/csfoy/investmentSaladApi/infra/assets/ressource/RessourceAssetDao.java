package ca.csfoy.investmentSaladApi.infra.assets.ressource;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RessourceAssetDao extends JpaRepository<RessourceAssetEntity, String> {
	@Query(value = "SELECT * FROM ressource_asset_entity WHERE id = :assetId AND portfolio_id IN (SELECT id FROM portfolio_entity WHERE user_id = :userId)", nativeQuery = true)
	RessourceAssetEntity getByAssetId(String assetId, String userId);

	@Query(value = "SELECT * FROM ressource_asset_entity WHERE portfolio_id IN (SELECT id FROM portfolio_entity WHERE user_id = :userId)", nativeQuery = true)
	List<RessourceAssetEntity> getAllRessourceAssets(String userId);

	@Query(value = "SELECT * FROM ressource_asset_entity WHERE portfolio_id = :portfolioId AND portfolio_id IN (SELECT id FROM portfolio_entity WHERE user_id = :userId)", nativeQuery = true)
	List<RessourceAssetEntity> getAllRessourceAssetsByPortfolioId(String userId, String portfolioId);
}
