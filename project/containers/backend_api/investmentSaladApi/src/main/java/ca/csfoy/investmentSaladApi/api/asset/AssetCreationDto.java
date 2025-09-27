package ca.csfoy.investmentSaladApi.api.asset;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.validator.constraints.Length;

import ca.csfoy.investmentSaladApi.api.validations.ValidName;
import ca.csfoy.investmentSaladApi.domain.asset.AssetType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;

public abstract class AssetCreationDto {

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

	@DecimalMin(value = "0", inclusive = true)
	private float commissionFee;

	@DecimalMin(value = "0", inclusive = false)
	private float quantity;

	@NotNull
	private List<String> tags;

	@ValidName
	private String name;

	@Length(max = 256)
	private String description;

	public AssetCreationDto(LocalDate buyDate, float unitPrice, boolean buyFromAccount, AssetType assetType,
			float commissionFee, float quantity, List<String> tags, String name, String description) {
		super();
		this.buyDate = buyDate;
		this.unitPrice = unitPrice;
		this.buyFromAccount = buyFromAccount;
		this.assetType = assetType;
		this.commissionFee = commissionFee;
		this.quantity = quantity;
		this.tags = tags;
		this.name = name;
		this.description = description;
	}

	public AssetCreationDto() {
	}

	public LocalDate getBuyDate() {
		return buyDate;
	}

	public float getUnitPrice() {
		return unitPrice;
	}

	public boolean isBuyFromAccount() {
		return buyFromAccount;
	}

	public AssetType getAssetType() {
		return assetType;
	}

	public float getCommissionFee() {
		return commissionFee;
	}

	public float getQuantity() {
		return quantity;
	}

	public List<String> getTags() {
		return tags;
	}

	public String getName() {
		return name;
	}

	public String getDescription() {
		return description;
	}

}
