package ca.csfoy.investmentSaladApi.infra.tag.stock_asset_tag;

import java.io.Serializable;
import java.util.Objects;

import ca.csfoy.investmentSaladApi.infra.assets.stock.StockAssetEntity;
import ca.csfoy.investmentSaladApi.infra.tag.TagEntity;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;

@Embeddable
public class StockAssetTagId implements Serializable {
	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name = "ASSET_ID")
	private StockAssetEntity assetEntity;

	@ManyToOne
	@JoinColumns({ @JoinColumn(name = "TAG_ID", referencedColumnName = "ID"),
			@JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID") })
	private TagEntity tag;

	public StockAssetTagId(StockAssetEntity assetEntity, TagEntity tag) {
		super();
		this.assetEntity = assetEntity;
		this.tag = tag;
	}

	public TagEntity getTag() {
		return tag;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public StockAssetEntity getAssetEntity() {
		return assetEntity;
	}

	public StockAssetTagId() {
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		StockAssetTagId incomingId = (StockAssetTagId) o;
		return assetEntity.equals(incomingId.assetEntity) && tag.equals(incomingId.tag);
	}

	@Override
	public int hashCode() {
		return Objects.hash(assetEntity, tag);
	}
}
