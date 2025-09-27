package ca.csfoy.investmentSaladApi.api.portfolio;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.validator.constraints.Length;

import ca.csfoy.investmentSaladApi.api.validations.ValidName;
import ca.csfoy.investmentSaladApi.domain.Currency;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class PortfolioLightDto {
	@ValidName
	private String name;
	
	@DecimalMin(value = "0.0", inclusive = true)
	@DecimalMax(value = "1.0", inclusive = true)
	@Nullable
	private float cashInterestRate;
	
	@Min(value = 0)
	@Max(value = 365)
	@Nullable
	private int interestPaymentFrequencyPerYear;
	
	@Nullable
	private LocalDate initialInterestPaymentDate;
	
	@DecimalMin(value = "0.0", inclusive = true)
	private float cashBalance;
	
	@Length(max = 256)
	private String description;
	
	@NotNull
	private Currency currency;
	
	@NotNull
	private List<String> tags;

	public PortfolioLightDto(String name, String description, float cashBalance, float cashInterestRate,
			int interestPaymentFrequencyPerYear, LocalDate initialInterestPaymentDate, Currency currency, List<String> tags) {
		this.name = name;
		this.description = description;
		this.cashBalance = cashBalance;
		this.cashInterestRate = cashInterestRate;
		this.interestPaymentFrequencyPerYear = interestPaymentFrequencyPerYear;
		this.initialInterestPaymentDate = initialInterestPaymentDate;
		this.currency = currency;
		this.tags = tags;
	}
	
	public String getName() {
		return name;
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

	public float getCashBalance() {
		return cashBalance;
	}

	public String getDescription() {
		return description;
	}

	public Currency getCurrency() {
		return currency;
	}

	public List<String> getTags()
	{
		return this.tags;
	}
	
	 @Override
	    public boolean equals(Object o) 
	    {
	        if (this == o) return true;
	        if (o == null || getClass() != o.getClass()) return false;
	        PortfolioLightDto dto = (PortfolioLightDto) o;
	        return dto.cashInterestRate == cashInterestRate &&
	                interestPaymentFrequencyPerYear == dto.interestPaymentFrequencyPerYear &&
	                dto.cashBalance == cashBalance &&
	                name.equals(dto.name) &&
	                description.equals(dto.description) &&
	                initialInterestPaymentDate.compareTo(dto.initialInterestPaymentDate) == 0 &&
	                currency == dto.currency && this.tags.equals(dto.tags);
	    }
}
