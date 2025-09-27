package ca.csfoy.investmentSaladApi.infra.tag;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TagDao extends JpaRepository<TagEntity, TagId> {
	@Query("SELECT t FROM TagEntity t WHERE t.userEntity.id = ?1")
	List<TagEntity> getAllByUserID(String userId);

	@Query(value = "SELECT * FROM tag_entity_widgets WHERE tags_user_id = ?1 AND widgets_id = ?2 ", nativeQuery = true)
	List<TagEntity> getAllTagsByWidgetId(String userId, String widgetId);

	@Query(value = "SELECT * FROM tag_entity WHERE user_id = :userId AND name = :name AND hex_color = :color", nativeQuery = true)
	List<TagEntity> getByNameAndColor(String name, int color, String userId);

	@Query(value = "SELECT id FROM tag_entity WHERE tag_entity.id IN ("
			+ "SELECT tag_id FROM crypto_asset_tag_entity WHERE user_id  = ?1 AND asset_id = ?2 " + "UNION "
			+ "SELECT tag_id FROM fixed_revenue_asset_tag_entity WHERE user_id  = ?1 AND asset_id = ?2 " + "UNION "
			+ "SELECT tag_id FROM ressource_asset_tag_entity WHERE user_id  = ?1 AND asset_id = ?2 " + "UNION "
			+ "SELECT tag_id FROM stock_asset_tag_entity WHERE user_id  = ?1 AND asset_id = ?2)", nativeQuery = true)
	List<String> getAllTagsByAssetId(String userId, String assetId);

	@Query(value = "SELECT asset_id FROM crypto_asset_tag_entity WHERE user_id  = ?1 AND tag_id = ?2 " + "UNION "
			+ "SELECT asset_id FROM stock_asset_tag_entity WHERE user_id  = ?1 AND tag_id = ?2 " + "UNION "
			+ "SELECT asset_id FROM ressource_asset_tag_entity WHERE user_id  = ?1 AND tag_id = ?2 " + "UNION "
			+ "SELECT asset_id FROM fixed_revenue_asset_tag_entity WHERE user_id  = ?1 AND tag_id = ?2 ", nativeQuery = true)
	List<String> getAllAssetsByTagId(String userId, String tagId);

}
