package ca.csfoy.investmentSaladApi.domain.asset.stock;

import java.time.LocalDate;
import java.util.List;

import ca.csfoy.investmentSaladApi.domain.asset.Asset;

public class StockAsset extends Asset {
	String Symbol;

	public StockAsset(String id, String portfolioId, String name, String description, float quantity,
			float unitPurchasePrice, LocalDate buyDate, String symbol, List<String> tags) {
		super(id, portfolioId, name, description, quantity, unitPurchasePrice, buyDate, tags);
		Symbol = symbol;
	}

	public String getSymbol() {
		return Symbol;
	}

}
