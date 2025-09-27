package ca.csfoy.investmentSaladApi.domain.portfolio;

import java.time.LocalDate;
import java.util.List;

import ca.csfoy.investmentSaladApi.domain.Currency;

public class Portfolio {

	private String id;
	private String name;
	private String description;
	private float cashInterestRate;
	private int interestPaymentFrequencyPerYear;
	private LocalDate initialInterestPaymentDate;
	private float cashBalance;
	private Currency currency;
	private List<String> tags;

	public Portfolio(String id, String name, String description, float cashBalance, float cashInterestRate,
			int interestPaymentFrequencyPerYear, LocalDate initialInterestPaymentDate, Currency currency,
			List<String> tags) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.cashBalance = cashBalance;
		this.cashInterestRate = cashInterestRate;
		this.interestPaymentFrequencyPerYear = interestPaymentFrequencyPerYear;
		this.initialInterestPaymentDate = initialInterestPaymentDate;
		this.currency = currency;
		this.tags = tags;
	}

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public float getCashBalance() {
		return cashBalance;
	}

	public float getCashInterestRate() {
		return cashInterestRate;
	}

	public int getInterestPaymentFrequencyPerYear() {
		return interestPaymentFrequencyPerYear;
	}

	public LocalDate getInitialInterestPaymentDate() {
		return initialInterestPaymentDate;
	}

	public Currency getCurrency() {
		return currency;
	}

	public String getDescription() {
		return description;
	}

	public List<String> getTags() {
		return tags;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		Portfolio portfolio = (Portfolio) o;
		return portfolio.cashInterestRate == cashInterestRate
				&& interestPaymentFrequencyPerYear == portfolio.interestPaymentFrequencyPerYear
				&& portfolio.cashBalance == cashBalance && id.equals(portfolio.id) && name.equals(portfolio.name)
				&& description.equals(portfolio.description)
				&& initialInterestPaymentDate.compareTo(portfolio.initialInterestPaymentDate) == 0
				&& currency == portfolio.currency && tags.equals(portfolio.tags);
	}

}
