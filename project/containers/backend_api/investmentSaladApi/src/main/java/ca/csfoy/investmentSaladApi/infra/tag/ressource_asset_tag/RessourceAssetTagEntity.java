package ca.csfoy.investmentSaladApi.infra.tag.ressource_asset_tag;

import ca.csfoy.investmentSaladApi.infra.assets.ressource.RessourceAssetEntity;
import ca.csfoy.investmentSaladApi.infra.tag.TagEntity;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;

@Entity
public class RessourceAssetTagEntity {

	@EmbeddedId
	private RessourceAssetTagId id;

	public RessourceAssetTagEntity() {
	}

	public RessourceAssetTagEntity(RessourceAssetEntity ressourceAssetEntity, TagEntity tagEntity) {
		this.id = new RessourceAssetTagId(ressourceAssetEntity, tagEntity);
	}

	public RessourceAssetTagId getId() {
		return id;
	}

}
