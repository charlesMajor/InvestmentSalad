package ca.csfoy.investmentSaladApi.infra.tag.fixed_revenue_asset_tag;

import java.io.Serializable;
import java.util.Objects;

import ca.csfoy.investmentSaladApi.infra.assets.fixed_revenue.FixedRevenueAssetEntity;
import ca.csfoy.investmentSaladApi.infra.tag.TagEntity;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;

@Embeddable
public class FixedRevenueAssetTagId implements Serializable {
	private static final long serialVersionUID = 1L;
	@ManyToOne
	@JoinColumn(name = "ASSET_ID")
	private FixedRevenueAssetEntity assetEntity;

	@ManyToOne
	@JoinColumns({ @JoinColumn(name = "TAG_ID", referencedColumnName = "ID"),
			@JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID") })
	private TagEntity tag;

	public FixedRevenueAssetTagId(FixedRevenueAssetEntity assetEntity, TagEntity tag) {
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

	public FixedRevenueAssetEntity getAssetEntity() {
		return assetEntity;
	}

	public FixedRevenueAssetTagId() {
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		FixedRevenueAssetTagId incomingId = (FixedRevenueAssetTagId) o;
		return assetEntity.equals(incomingId.assetEntity) && tag.equals(incomingId.tag);
	}

	@Override
	public int hashCode() {
		return Objects.hash(assetEntity, tag);
	}
}
