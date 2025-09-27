package ca.csfoy.investmentSaladApi.domain.asset.fixed_revenue;

import java.time.LocalDate;
import java.util.List;

import ca.csfoy.investmentSaladApi.domain.asset.Asset;

public class FixedRevenueAsset extends Asset {

	private float interestRate;
	private int paymentFrequencyPerYear;
	private LocalDate expirationDate;
	private LocalDate firstPaymentDate;

	public FixedRevenueAsset(String id, String portfolioId, String name, String description, float quantity,
			float unitPurchasePrice, LocalDate buyDate, float interestRate, int paymentFrequencyPerYear,
			LocalDate expirationDate, LocalDate firstPaymentDate, List<String> tags) {
		super(id, portfolioId, name, description, quantity, unitPurchasePrice, buyDate, tags);
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
