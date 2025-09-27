package ca.csfoy.investmentSaladApi.domain.asset.ressource;

import java.time.LocalDate;
import java.util.List;

import ca.csfoy.investmentSaladApi.domain.asset.Asset;

public class RessourceAsset extends Asset {
	private String ressourceType;

	public RessourceAsset(String id, String portfolioId, String name, String description, float quantity,
			float unitPurchasePrice, LocalDate buyDate, String ressourceType, List<String> tags) {
		super(id, portfolioId, name, description, quantity, unitPurchasePrice, buyDate, tags);
		this.ressourceType = ressourceType;
	}

	public String getRessourceType() {
		return ressourceType;
	}

}
