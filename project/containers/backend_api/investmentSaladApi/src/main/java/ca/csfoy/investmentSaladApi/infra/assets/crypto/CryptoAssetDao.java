package ca.csfoy.investmentSaladApi.infra.assets.crypto;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CryptoAssetDao extends JpaRepository<CryptoAssetEntity, String> {

	@Query(value = "SELECT * FROM crypto_asset_entity WHERE id = :assetId AND portfolio_id IN (SELECT id FROM portfolio_entity WHERE user_id = :userId)", nativeQuery = true)
	CryptoAssetEntity getByAssetId(String assetId, String userId);

	@Query(value = "SELECT * FROM crypto_asset_entity WHERE portfolio_id IN (SELECT id FROM portfolio_entity WHERE user_id = :userId)", nativeQuery = true)
	List<CryptoAssetEntity> getAllCryptoAssets(String userId);

	@Query(value = "SELECT * FROM crypto_asset_entity WHERE portfolio_id = :portfolioId AND portfolio_id IN (SELECT id FROM portfolio_entity WHERE user_id = :userId)", nativeQuery = true)
	List<CryptoAssetEntity> getAllCryptoAssetsByPortfolioId(String userId, String portfolioId);
}
