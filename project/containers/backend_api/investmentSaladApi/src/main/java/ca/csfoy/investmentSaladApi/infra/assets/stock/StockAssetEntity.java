package ca.csfoy.investmentSaladApi.infra.assets.stock;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import ca.csfoy.investmentSaladApi.infra.portfolio.PortfolioEntity;
import ca.csfoy.investmentSaladApi.infra.tag.stock_asset_tag.StockAssetTagEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;

@Entity
public class StockAssetEntity {

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
	private String Symbol;

	@OneToMany(mappedBy = "id.assetEntity", cascade = CascadeType.ALL)
	private Set<StockAssetTagEntity> assetTags;

	public StockAssetEntity() {
	}

	public StockAssetEntity(String id, PortfolioEntity portfolio, String name, String description, float quantity,
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

	public void setTags(List<StockAssetTagEntity> tags) {
		this.assetTags = new HashSet<>(tags);
	}

	public void addTagAffectation(StockAssetTagEntity tag) {
		this.assetTags.add(tag);
	}

	public Set<StockAssetTagEntity> getAssetTags() {
		return assetTags;
	}

	public void setAssetTags(Set<StockAssetTagEntity> assetTags) {
		this.assetTags = assetTags;
	}

	public void removeTagAffectation(StockAssetTagEntity tag) {
		this.assetTags.remove(tag);
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

}
