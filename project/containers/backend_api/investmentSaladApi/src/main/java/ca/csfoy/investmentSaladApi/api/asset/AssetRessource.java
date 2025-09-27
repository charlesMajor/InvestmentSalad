package ca.csfoy.investmentSaladApi.api.asset;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

import ca.csfoy.investmentSaladApi.api.asset.crypto.CryptoAssetDto;
import ca.csfoy.investmentSaladApi.api.asset.crypto.CryptoAssetFullDto;
import ca.csfoy.investmentSaladApi.api.asset.fixed_revenue.FixedRevenueAssetDto;
import ca.csfoy.investmentSaladApi.api.asset.fixed_revenue.FixedRevenueAssetFullDto;
import ca.csfoy.investmentSaladApi.api.asset.ressource.RessourceAssetDto;
import ca.csfoy.investmentSaladApi.api.asset.ressource.RessourceAssetFullDto;
import ca.csfoy.investmentSaladApi.api.asset.stock.StockAssetDto;
import ca.csfoy.investmentSaladApi.api.asset.stock.StockAssetFullDto;
import ca.csfoy.investmentSaladApi.domain.asset.AssetType;

@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
public interface AssetRessource {

	String PATH_PARAM_PORTOFOLIO_ID = "portfolioId";
	String PATH_PARAM_ID = "id";
	String PATH_PARAM_ASSET_ID = "assetId";
	String PATH_PARAM_ASSET_TYPE = "assetType";

	String ASSETS_RESSOURCE_PATH = "/assets";

	String PATH_WITH_PORTOFOLIO_ID = "/portfolios/{" + PATH_PARAM_PORTOFOLIO_ID + "}";
	String PATH_WITH_ID = "/{" + PATH_PARAM_ID + "}";
	String PATH_WITH_ASSET_ID = ASSETS_RESSOURCE_PATH + "/{" + PATH_PARAM_ASSET_TYPE + "}" + "/{" + PATH_PARAM_ASSET_ID
			+ "}";

	// POST
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping(PATH_WITH_PORTOFOLIO_ID + "/crypto")
	CryptoAssetFullDto createCryptoAsset(@PathVariable(PATH_PARAM_PORTOFOLIO_ID) String id,
			@RequestBody CryptoAssetDto dto);

	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping(PATH_WITH_PORTOFOLIO_ID + "/stock")
	StockAssetFullDto createStockAsset(@PathVariable(PATH_PARAM_PORTOFOLIO_ID) String id,
			@RequestBody StockAssetDto dto);

	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping(PATH_WITH_PORTOFOLIO_ID + "/ressource")
	RessourceAssetFullDto createRessourceAsset(@PathVariable(PATH_PARAM_PORTOFOLIO_ID) String id,
			@RequestBody RessourceAssetDto dto);

	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping(PATH_WITH_PORTOFOLIO_ID + "/fixedRevenue")
	FixedRevenueAssetFullDto createFixedRevenuAsset(@PathVariable(PATH_PARAM_PORTOFOLIO_ID) String id,
			@RequestBody FixedRevenueAssetDto dto);

	// GET
	@ResponseStatus(HttpStatus.OK)
	@GetMapping(PATH_WITH_ASSET_ID)
	AssetDto getAssetById(@PathVariable(PATH_PARAM_ASSET_TYPE) AssetType assetType,
			@PathVariable(PATH_PARAM_ASSET_ID) String assetId);

	@ResponseStatus(HttpStatus.OK)
	@GetMapping(PATH_WITH_PORTOFOLIO_ID + ASSETS_RESSOURCE_PATH)
	List<AssetDto> getAllAssetsFromPortfolio(@PathVariable(PATH_PARAM_PORTOFOLIO_ID) String id);

	@ResponseStatus(HttpStatus.OK)
	@GetMapping(ASSETS_RESSOURCE_PATH)
	List<AssetDto> getAllAssets();

	// PUT
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PutMapping(PATH_WITH_PORTOFOLIO_ID + "/crypto" + "/{" + PATH_PARAM_ASSET_ID + "}")
	void updateCryptoAsset(@PathVariable(PATH_PARAM_ASSET_ID) String assetId, @RequestBody CryptoAssetFullDto dto);

	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PutMapping(PATH_WITH_PORTOFOLIO_ID + "/fixedRevenue" + "/{" + PATH_PARAM_ASSET_ID + "}")
	void updateFixedRevenueAsset(@PathVariable(PATH_PARAM_ASSET_ID) String assetId,
			@RequestBody FixedRevenueAssetFullDto dto);

	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PutMapping(PATH_WITH_PORTOFOLIO_ID + "/ressource" + "/{" + PATH_PARAM_ASSET_ID + "}")
	void updateRessourceAsset(@PathVariable(PATH_PARAM_ASSET_ID) String assetId,
			@RequestBody RessourceAssetFullDto dto);

	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PutMapping(PATH_WITH_PORTOFOLIO_ID + "/stock" + "/{" + PATH_PARAM_ASSET_ID + "}")
	void updateStockAsset(@PathVariable(PATH_PARAM_ASSET_ID) String assetId, @RequestBody StockAssetFullDto dto);

	// DELETE
	@DeleteMapping(PATH_WITH_ASSET_ID)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	void deleteAssetById(@PathVariable(PATH_PARAM_ASSET_TYPE) AssetType assetType,
			@PathVariable(PATH_PARAM_ASSET_ID) String assetId);

}
