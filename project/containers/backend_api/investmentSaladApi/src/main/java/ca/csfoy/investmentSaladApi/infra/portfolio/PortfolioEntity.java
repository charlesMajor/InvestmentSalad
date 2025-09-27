package ca.csfoy.investmentSaladApi.infra.portfolio;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import ca.csfoy.investmentSaladApi.infra.assets.crypto.CryptoAssetEntity;
import ca.csfoy.investmentSaladApi.infra.assets.fixed_revenue.FixedRevenueAssetEntity;
import ca.csfoy.investmentSaladApi.infra.assets.ressource.RessourceAssetEntity;
import ca.csfoy.investmentSaladApi.infra.assets.stock.StockAssetEntity;
import ca.csfoy.investmentSaladApi.infra.tag.portfolio_tag.PortfolioTagEntity;
import ca.csfoy.investmentSaladApi.infra.user.UserEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class PortfolioEntity {
	@Id
	private String id;
	@Column(length = 30, nullable = false)
	private String name;
	@Column(length = 150, nullable = true)
	private String description;
	@ManyToOne
	@JoinColumn(name = "user_Id")
	private UserEntity user;
	@Column(nullable = false)
	float cashBalance;
	@Column(nullable = true)
	private float cashInterestRate;
	@Column(nullable = true)
	private int interestPaymentFrequencyPerYear;
	@Column(nullable = true)
	private LocalDate initialInterestPaymentDate;
	@Column(length = 3, nullable = false)
	private String currencyType;
	@OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL)
	private Set<StockAssetEntity> stockAssets;
	@OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL)
	private Set<CryptoAssetEntity> cryptoAssets;
	@OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL)
	private Set<RessourceAssetEntity> ressourceAssets;
	@OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL)
	private Set<FixedRevenueAssetEntity> fixedRevenueAssets;
	@OneToMany(mappedBy = "id.portfolioEntity", cascade = CascadeType.ALL)
	private Set<PortfolioTagEntity> portfolioTags;

	public PortfolioEntity() {
	}

	public PortfolioEntity(String id, String name, String description, UserEntity user, float cashBalance,
			float cashInterestRate, int interestPaymentFrequencyPerYear, LocalDate initialInterestPaymentDate,
			String currency) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.cashBalance = cashBalance;
		this.cashInterestRate = cashInterestRate;
		this.interestPaymentFrequencyPerYear = interestPaymentFrequencyPerYear;
		this.initialInterestPaymentDate = initialInterestPaymentDate;
		this.user = user;
		this.currencyType = currency;
		this.portfolioTags = new HashSet<>();
		this.cryptoAssets = new HashSet<>();
		this.fixedRevenueAssets = new HashSet<>();
		this.ressourceAssets = new HashSet<>();
		this.stockAssets = new HashSet<>();
	}

	public void addTagAffectation(PortfolioTagEntity tag) {
		this.portfolioTags.add(tag);
	}

	public void removeTagAffectation(PortfolioTagEntity tag) {
		this.portfolioTags.remove(tag);
	}

	public Set<PortfolioTagEntity> getPortfolioTags() {
		return portfolioTags;
	}

	public void setPortfolioTags(Set<PortfolioTagEntity> portfolioTags) {
		this.portfolioTags = portfolioTags;
	}

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getDescription() {
		return description;
	}

	public UserEntity getUser() {
		return user;
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

	public String getCurrencyType() {
		return currencyType;
	}

	public Set<StockAssetEntity> getStockAssets() {
		return stockAssets;
	}

	public Set<CryptoAssetEntity> getCryptoAssets() {
		return cryptoAssets;
	}

	public Set<RessourceAssetEntity> getRessourceAssets() {
		return ressourceAssets;
	}

	public Set<FixedRevenueAssetEntity> getFixedRevenueAssets() {
		return fixedRevenueAssets;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		PortfolioEntity porfolioEntity = (PortfolioEntity) o;
		return porfolioEntity.cashBalance == cashBalance && porfolioEntity.cashInterestRate == cashInterestRate
				&& interestPaymentFrequencyPerYear == porfolioEntity.interestPaymentFrequencyPerYear
				&& id.equals(porfolioEntity.id) && name.equals(porfolioEntity.name)
				&& description.equals(porfolioEntity.description) && user.equals(porfolioEntity.user)
				&& initialInterestPaymentDate.compareTo(porfolioEntity.initialInterestPaymentDate) == 0
				&& currencyType.equals(porfolioEntity.currencyType)
				&& this.portfolioTags.equals(porfolioEntity.portfolioTags);
	}
}
