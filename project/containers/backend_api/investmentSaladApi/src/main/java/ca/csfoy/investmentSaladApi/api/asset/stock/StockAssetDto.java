package ca.csfoy.investmentSaladApi.api.asset.stock;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.validator.constraints.Length;

import ca.csfoy.investmentSaladApi.api.asset.AssetCreationDto;
import ca.csfoy.investmentSaladApi.domain.asset.AssetType;
import jakarta.validation.constraints.NotBlank;

public class StockAssetDto extends AssetCreationDto{

	@NotBlank
	@Length(max = 20)
	private String symbol;

	public StockAssetDto(LocalDate buyDate, float unitPrice, boolean buyFromAccount, AssetType assetType,
			float commissionFee, float quantity, List<String> tags, String name, String description, String symbol) {
		super(buyDate, unitPrice, buyFromAccount, assetType, commissionFee, quantity, tags, name, description);
		this.symbol = symbol;
	}

	public String getSymbol() {
		return symbol;
	}
}
