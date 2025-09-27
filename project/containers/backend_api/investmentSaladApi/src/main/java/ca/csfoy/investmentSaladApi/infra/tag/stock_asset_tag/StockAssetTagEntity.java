package ca.csfoy.investmentSaladApi.infra.tag.stock_asset_tag;

import ca.csfoy.investmentSaladApi.infra.assets.stock.StockAssetEntity;
import ca.csfoy.investmentSaladApi.infra.tag.TagEntity;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;

@Entity
public class StockAssetTagEntity {

	@EmbeddedId
	private StockAssetTagId id;

	public StockAssetTagEntity() {
	}

	public StockAssetTagEntity(StockAssetEntity stockAssetEntity, TagEntity tag) {
		this.id = new StockAssetTagId(stockAssetEntity, tag);
	}

	public StockAssetTagId getId() {
		return id;
	}

}
