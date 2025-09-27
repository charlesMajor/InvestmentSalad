package ca.csfoy.investmentSaladApi.infra.tag.crypto_asset_tag;

import java.util.Objects;

import ca.csfoy.investmentSaladApi.infra.assets.crypto.CryptoAssetEntity;
import ca.csfoy.investmentSaladApi.infra.tag.TagEntity;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;

@Entity
public class CryptoAssetTagEntity {

	@EmbeddedId
	private CryptoAssetTagId id;

	public CryptoAssetTagEntity() {
	}

	public CryptoAssetTagEntity(CryptoAssetEntity cryptoAssetEntity, TagEntity tagEntity) {
		this.id = new CryptoAssetTagId(cryptoAssetEntity, tagEntity);
	}

	public CryptoAssetTagId getId() {
		return id;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		CryptoAssetTagEntity incomingTagAffectation = (CryptoAssetTagEntity) o;
		return id.equals(incomingTagAffectation.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

}
