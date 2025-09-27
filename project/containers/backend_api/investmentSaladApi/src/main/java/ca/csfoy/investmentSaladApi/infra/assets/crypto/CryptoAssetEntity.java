package ca.csfoy.investmentSaladApi.infra.assets.crypto;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import ca.csfoy.investmentSaladApi.infra.portfolio.PortfolioEntity;
import ca.csfoy.investmentSaladApi.infra.tag.crypto_asset_tag.CryptoAssetTagEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;

@Entity
public class CryptoAssetEntity {

	@Id
	private String id;

	@ManyToOne
	@PrimaryKeyJoinColumn(name = "portfolio_Id")
	private PortfolioEntity portfolio;

	@Column(nullable = false, length = 30)
	private String name;

	@Column(nullable = true, length = 255)
	private String description;

	@Column(nullable = false)
	private float quantity;

	@Column(nullable = false)
	private float unitPurchasePrice;

	@Column(nullable = false)
	private LocalDate buyDate;

	@Column(nullable = false, length = 20)
	private String Symbol;

	@OneToMany(mappedBy = "id.assetEntity", cascade = CascadeType.ALL)
	private Set<CryptoAssetTagEntity> assetTags;

	public CryptoAssetEntity() {
	};

	public CryptoAssetEntity(String id, PortfolioEntity portfolio, String name, String description, float quantity,
			float unitPurchasePrice, LocalDate buyDate, String symbol) {
		super();
		this.id = id;
		this.portfolio = portfolio;
		this.name = name;
		this.description = description;
		this.quantity = quantity;
		this.unitPurchasePrice = unitPurchasePrice;
		this.buyDate = buyDate;
		Symbol = symbol;
		this.assetTags = new HashSet<>();
	}

	public Set<CryptoAssetTagEntity> getAssetTags() {
		return assetTags;
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

	public String getSymbol() {
		return Symbol;
	}

	public void addTagAffectation(CryptoAssetTagEntity tag) {
		this.assetTags.add(tag);
	}

	public void removeTagAffectation(CryptoAssetTagEntity tag) {
		this.assetTags.remove(tag);
	}
}
