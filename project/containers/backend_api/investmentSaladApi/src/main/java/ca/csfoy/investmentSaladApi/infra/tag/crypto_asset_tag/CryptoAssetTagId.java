package ca.csfoy.investmentSaladApi.infra.tag.crypto_asset_tag;

import java.io.Serializable;
import java.util.Objects;

import ca.csfoy.investmentSaladApi.infra.assets.crypto.CryptoAssetEntity;
import ca.csfoy.investmentSaladApi.infra.tag.TagEntity;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;

@Embeddable
public class CryptoAssetTagId implements Serializable {
	private static final long serialVersionUID = 1L;
	@ManyToOne
	@JoinColumn(name = "ASSET_ID")
	CryptoAssetEntity assetEntity;

	@ManyToOne
	@JoinColumns({ @JoinColumn(name = "TAG_ID", referencedColumnName = "ID"),
			@JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID") })
	TagEntity tag;

	public CryptoAssetTagId(CryptoAssetEntity assetEntity, TagEntity tag) {
		super();
		this.assetEntity = assetEntity;
		this.tag = tag;
	}

	public CryptoAssetTagId() {
	}

	public TagEntity getTag() {
		return tag;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public CryptoAssetEntity getAssetEntity() {
		return assetEntity;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		CryptoAssetTagId incomingId = (CryptoAssetTagId) o;
		return assetEntity.equals(incomingId.assetEntity) && tag.equals(incomingId.tag);
	}

	@Override
	public int hashCode() {
		return Objects.hash(assetEntity, tag);
	}
}
