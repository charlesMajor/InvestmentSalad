package ca.csfoy.investmentSaladApi.infra.tag.crypto_asset_tag;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CryptoAssetTagDao extends JpaRepository<CryptoAssetTagEntity, CryptoAssetTagId> {

	@Query(value = "SELECT tag_id FROM crypto_asset_tag_entity WHERE asset_id = ?1 AND user_id = ?2", nativeQuery = true)
	List<String> getAllIdByAssetId(String assetId, String userId);

}
