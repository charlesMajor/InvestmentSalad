package ca.csfoy.investmentSaladApi.infra.tag.ressource_asset_tag;

import java.io.Serializable;
import java.util.Objects;

import ca.csfoy.investmentSaladApi.infra.assets.ressource.RessourceAssetEntity;
import ca.csfoy.investmentSaladApi.infra.tag.TagEntity;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;

@Embeddable
public class RessourceAssetTagId implements Serializable {
	private static final long serialVersionUID = 1L;
	@ManyToOne
	@JoinColumn(name = "ASSET_ID")
	private RessourceAssetEntity assetEntity;

	@ManyToOne
	@JoinColumns({ @JoinColumn(name = "TAG_ID", referencedColumnName = "ID"),
			@JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID") })
	private TagEntity tag;

	public TagEntity getTag() {
		return tag;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public RessourceAssetEntity getAssetEntity() {
		return assetEntity;
	}

	public RessourceAssetTagId(RessourceAssetEntity assetEntity, TagEntity tag) {
		super();
		this.assetEntity = assetEntity;
		this.tag = tag;
	}

	public RessourceAssetTagId() {
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		RessourceAssetTagId incomingId = (RessourceAssetTagId) o;
		return assetEntity.equals(incomingId.assetEntity) && tag.equals(incomingId.tag);
	}

	@Override
	public int hashCode() {
		return Objects.hash(assetEntity, tag);
	}
}
