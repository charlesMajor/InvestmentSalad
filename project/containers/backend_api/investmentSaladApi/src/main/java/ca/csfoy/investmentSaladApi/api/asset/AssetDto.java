package ca.csfoy.investmentSaladApi.api.asset;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.validator.constraints.Length;

import ca.csfoy.investmentSaladApi.api.validations.ValidName;
import ca.csfoy.investmentSaladApi.api.validations.ValidUUID;
import ca.csfoy.investmentSaladApi.domain.asset.AssetType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;

public abstract class AssetDto {

	@ValidUUID
	private String id;

	@ValidUUID
	private String portfolioId;

	@NotNull
	@PastOrPresent
	private LocalDate buyDate;

	@NotNull
	@DecimalMin(value = "0", inclusive = false)
	private float unitPrice;

	@NotNull
	private boolean buyFromAccount;

	@NotNull
	private AssetType assetType;

	@DecimalMin(value = "0", inclusive = false)
	private float commissionFee;

	@DecimalMin(value = "0", inclusive = false)
	private float quantity;

	@NotNull
	private List<String> tags;

	@ValidName
	private String name;

	@Length(max = 256)
	private String description;

	public AssetDto(String id, String portfolioId, String name, String description, float quantity, float unitPrice,
			List<String> tags, LocalDate buyDate, AssetType type) {
		super();
		this.id = id;
		this.portfolioId = portfolioId;
		this.name = name;
		this.quantity = quantity;
		this.description = description;
		this.unitPrice = unitPrice;
		this.tags = tags;
		this.buyDate = buyDate;
		this.assetType = type;
	}

	public String getId() {
		return id;
	}

	public String getPortfolioId() {
		return portfolioId;
	}

	public String getName() {
		return name;
	}

	public String getDescription() {
		return description;
	}

	public float getQuantity() {
		return quantity;
	}

	public float getUnitPrice() {
		return unitPrice;
	}

	public List<String> getTags() {
		return tags;
	}

	public LocalDate getBuyDate() {
		return buyDate;
	}

	public AssetType getAssetType() {
		return assetType;
	}

}
