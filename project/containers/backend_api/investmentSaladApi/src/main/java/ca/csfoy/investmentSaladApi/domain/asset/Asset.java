package ca.csfoy.investmentSaladApi.domain.asset;

import java.time.LocalDate;
import java.util.List;

public abstract class Asset {
	private String id;

	private String portfolioId;

	private String name;

	private String description;

	private float quantity;

	private float unitPurchasePrice;

	private LocalDate buyDate;

	private List<String> tags;

	public Asset(String id, String portfolioId, String name, String description, float quantity,
			float unitPurchasePrice, LocalDate buyDate, List<String> tags) {
		super();
		this.id = id;
		this.portfolioId = portfolioId;
		this.name = name;
		this.description = description;
		this.quantity = quantity;
		this.unitPurchasePrice = unitPurchasePrice;
		this.buyDate = buyDate;
		this.tags = tags;
	}

	public String getId() {
		return id;
	}

	public String getPortfolioId() {
		return portfolioId;
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

	public List<String> getTags() {
		return tags;
	}

}
