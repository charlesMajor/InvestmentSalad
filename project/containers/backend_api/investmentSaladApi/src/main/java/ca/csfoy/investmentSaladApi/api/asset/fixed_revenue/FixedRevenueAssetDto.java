package ca.csfoy.investmentSaladApi.api.asset.fixed_revenue;

import java.time.LocalDate;
import java.util.List;

import org.springframework.lang.NonNull;

import ca.csfoy.investmentSaladApi.api.asset.AssetCreationDto;
import ca.csfoy.investmentSaladApi.domain.asset.AssetType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.PastOrPresent;

public class FixedRevenueAssetDto extends AssetCreationDto {

	@Min(value = 0)
	@Max(value = 1)
	private float interestRate;

	@Min(value = 0)
	@Max(value = 365)
	private int paymentFrequencyPerYear;

	@PastOrPresent
	private LocalDate expirationDate;

	@NonNull
	private LocalDate firstPaymentDate;

	public FixedRevenueAssetDto(LocalDate buyDate, float unitPrice, boolean buyFromAccount, AssetType assetType,
			float commissionFee, float quantity, List<String> tags, String name, String description, float interestRate,
			int paymentFrequencyPerYear, LocalDate expirationDate, LocalDate firstPaymentDate) {
		super(buyDate, unitPrice, buyFromAccount, assetType, commissionFee, quantity, tags, name, description);
		this.interestRate = interestRate;
		this.paymentFrequencyPerYear = paymentFrequencyPerYear;
		this.expirationDate = expirationDate;
		this.firstPaymentDate = firstPaymentDate;
	}

	public float getInterestRate() {
		return interestRate;
	}

	public int getPaymentFrequencyPerYear() {
		return paymentFrequencyPerYear;
	}

	public LocalDate getExpirationDate() {
		return expirationDate;
	}

	public LocalDate getFirstPaymentDate() {
		return firstPaymentDate;
	}
}
