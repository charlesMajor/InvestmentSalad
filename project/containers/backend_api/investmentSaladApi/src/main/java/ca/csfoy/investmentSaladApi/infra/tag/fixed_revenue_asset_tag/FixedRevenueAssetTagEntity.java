package ca.csfoy.investmentSaladApi.infra.tag.fixed_revenue_asset_tag;

import ca.csfoy.investmentSaladApi.infra.assets.fixed_revenue.FixedRevenueAssetEntity;
import ca.csfoy.investmentSaladApi.infra.tag.TagEntity;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;

@Entity
public class FixedRevenueAssetTagEntity {

	@EmbeddedId
	private FixedRevenueAssetTagId id;

	public FixedRevenueAssetTagEntity() {
	}

	public FixedRevenueAssetTagEntity(FixedRevenueAssetEntity fixedRevenueAssetEntity, TagEntity tagEntity) {
		this.id = new FixedRevenueAssetTagId(fixedRevenueAssetEntity, tagEntity);
	}

	public FixedRevenueAssetTagId getId() {
		return id;
	}

}
