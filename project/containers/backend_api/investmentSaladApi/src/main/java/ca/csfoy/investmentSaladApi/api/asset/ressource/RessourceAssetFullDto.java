package ca.csfoy.investmentSaladApi.api.asset.ressource;

import java.time.LocalDate;
import java.util.List;

import ca.csfoy.investmentSaladApi.api.asset.AssetDto;
import ca.csfoy.investmentSaladApi.domain.asset.AssetType;
import jakarta.validation.constraints.NotBlank;

public class RessourceAssetFullDto extends AssetDto {

	@NotBlank
	private String ressourceType;

	public RessourceAssetFullDto(String id, String portfolioId, String name, String description, float quantity,
			float unitPrice, List<String> tags, LocalDate buyDate, String ressourceType) {
		super(id, portfolioId, name, description, quantity, unitPrice, tags, buyDate, AssetType.RESSOURCE);
		this.ressourceType = ressourceType;
	}

	public String getRessourceType() {
		return ressourceType;
	}

}
