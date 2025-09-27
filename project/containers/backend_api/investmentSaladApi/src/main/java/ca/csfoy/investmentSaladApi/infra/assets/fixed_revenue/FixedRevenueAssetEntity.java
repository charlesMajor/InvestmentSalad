package ca.csfoy.investmentSaladApi.infra.assets.fixed_revenue;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import ca.csfoy.investmentSaladApi.infra.portfolio.PortfolioEntity;
import ca.csfoy.investmentSaladApi.infra.tag.fixed_revenue_asset_tag.FixedRevenueAssetTagEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;

@Entity
public class FixedRevenueAssetEntity {

	@Id
	private String id;

	@ManyToOne()
	@PrimaryKeyJoinColumn(name = "portfolio_Id")
	private PortfolioEntity portfolio;

	@Column(nullable = false)
	private String name;

	@Column(nullable = true)
	private String description;

	@Column(nullable = false)
	private float quantity;

	@Column(nullable = false)
	private float unitPurchasePrice;

	@Column(nullable = false)
	private LocalDate buyDate;

	@Column(nullable = false)
	private float interestRate;

	@Column(nullable = false)
	private int paymentFrequencyPerYear;

	@Column(nullable = false)
	private LocalDate expirationDate;

	@Column(nullable = false)
	private LocalDate firstPaymentDate;

	@OneToMany(mappedBy = "id.assetEntity", cascade = CascadeType.ALL)
	private Set<FixedRevenueAssetTagEntity> assetTags;

	public FixedRevenueAssetEntity() {
	}

	public FixedRevenueAssetEntity(String id, PortfolioEntity portfolio, String name, String description,
			float quantity, float unitPurchasePrice, LocalDate buyDate, float interestRate, int paymentFrequencyPerYear,
			LocalDate expirationDate, LocalDate firstPaymentDate) {
		super();
		this.id = id;
		this.portfolio = portfolio;
		this.name = name;
		this.description = description;
		this.quantity = quantity;
		this.unitPurchasePrice = unitPurchasePrice;
		this.buyDate = buyDate;
		this.interestRate = interestRate;
		this.paymentFrequencyPerYear = paymentFrequencyPerYear;
		this.expirationDate = expirationDate;
		this.firstPaymentDate = firstPaymentDate;
		this.assetTags = new HashSet<>();
	}

	public void addTagAffectation(FixedRevenueAssetTagEntity tag) {
		this.assetTags.add(tag);
	}

	public Set<FixedRevenueAssetTagEntity> getAssetTags() {
		return assetTags;
	}

	public void setAssetTags(Set<FixedRevenueAssetTagEntity> assetTags) {
		this.assetTags = assetTags;
	}

	public String getId() {
		return id;
	}

	public PortfolioEntity getPortfolio() {
		return portfolio;
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

	public float getUnitPurchasePrice() {
		return unitPurchasePrice;
	}

	public LocalDate getBuyDate() {
		return buyDate;
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

	public void removeTagAffectation(FixedRevenueAssetTagEntity tag) {
		this.assetTags.remove(tag);
	}

}
