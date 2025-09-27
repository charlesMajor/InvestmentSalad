package ca.csfoy.investmentSaladApi.infra.tag.fixed_revenue_asset_tag;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FixedRevenueAssetTagDao extends JpaRepository<FixedRevenueAssetTagEntity, FixedRevenueAssetTagId> {

	@Query(value = "SELECT tag_id FROM fixed_revenue_asset_tag_entity WHERE asset_id = ?1 AND user_id = ?2", nativeQuery = true)
	List<String> getAllIdByAssetId(String assetId, String userId);
}
