package ca.csfoy.investmentSaladApi.api.asset.crypto;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.validator.constraints.Length;

import ca.csfoy.investmentSaladApi.api.asset.AssetDto;
import ca.csfoy.investmentSaladApi.domain.asset.AssetType;
import jakarta.validation.constraints.NotBlank;

public class CryptoAssetFullDto extends AssetDto {
	@NotBlank
	@Length(max = 20)
	private String symbol;

	public CryptoAssetFullDto(String id, String portfolioId, String name, String description, float quantity,
			float unitPrice, List<String> tags, LocalDate buyDate, String symbol) {
		super(id, portfolioId, name, description, quantity, unitPrice, tags, buyDate, AssetType.CRYPTO);
		this.symbol = symbol;
	}

	public String getSymbol() {
		return symbol;
	}
}
