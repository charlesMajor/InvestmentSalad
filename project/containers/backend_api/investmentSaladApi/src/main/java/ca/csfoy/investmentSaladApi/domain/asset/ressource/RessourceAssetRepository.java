package ca.csfoy.investmentSaladApi.domain.asset.ressource;

import java.util.List;

import ca.csfoy.investmentSaladApi.domain.BasicRepository;
import ca.csfoy.investmentSaladApi.domain.DeleteRepository;
import ca.csfoy.investmentSaladApi.domain.UpdateRepository;

public interface RessourceAssetRepository extends BasicRepository<String, RessourceAsset>,
		DeleteRepository<String, RessourceAsset>, UpdateRepository<String, RessourceAsset> {

	List<RessourceAsset> getAllRessourceAssets();

	List<RessourceAsset> getAllRessourceAssetsFromPortfolio(String id);

}
