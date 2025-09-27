package ca.csfoy.investmentSaladApi.infra.assets.ressource;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import ca.csfoy.investmentSaladApi.infra.portfolio.PortfolioEntity;
import ca.csfoy.investmentSaladApi.infra.tag.ressource_asset_tag.RessourceAssetTagEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;

@Entity
public class RessourceAssetEntity {

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
	private String ressourceType;

	@OneToMany(mappedBy = "id.assetEntity", cascade = CascadeType.ALL)
	private Set<RessourceAssetTagEntity> assetTags;

	public RessourceAssetEntity() {
	}

	public RessourceAssetEntity(String id, PortfolioEntity portfolio, String name, String description, float quantity,
			float unitPurchasePrice, LocalDate buyDate, String ressourceType) {
		super();
		this.id = id;
		this.portfolio = portfolio;
		this.name = name;
		this.description = description;
		this.quantity = quantity;
		this.unitPurchasePrice = unitPurchasePrice;
		this.buyDate = buyDate;
		this.ressourceType = ressourceType;
		this.assetTags = new HashSet<>();
	}

	public void addTagAffectation(RessourceAssetTagEntity tag) {
		this.assetTags.add(tag);
	}

	public Set<RessourceAssetTagEntity> getAssetTags() {
		return assetTags;
	}

	public void setAssetTags(Set<RessourceAssetTagEntity> assetTags) {
		this.assetTags = assetTags;
	}

	public void removeTagAffectation(RessourceAssetTagEntity tag) {
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

	public String getRessourceType() {
		return ressourceType;
	}

}
