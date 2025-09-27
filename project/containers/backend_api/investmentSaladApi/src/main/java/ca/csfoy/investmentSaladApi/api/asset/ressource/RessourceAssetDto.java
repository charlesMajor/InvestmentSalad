package ca.csfoy.investmentSaladApi.api.asset.ressource;

import java.time.LocalDate;
import java.util.List;

import ca.csfoy.investmentSaladApi.api.asset.AssetCreationDto;
import ca.csfoy.investmentSaladApi.domain.asset.AssetType;
import jakarta.validation.constraints.NotBlank;

public class RessourceAssetDto extends AssetCreationDto {

	@NotBlank
	private String ressourceType;

	public RessourceAssetDto(LocalDate buyDate, float unitPrice, boolean buyFromAccount, AssetType assetType,
			float commissionFee, float quantity, List<String> tags, String name, String description,
			String ressourceType) {
		super(buyDate, unitPrice, buyFromAccount, assetType, commissionFee, quantity, tags, name, description);
		this.ressourceType = ressourceType;
	}

	public String getRessourceType() {
		return ressourceType;
	}

}
