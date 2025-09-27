package ca.csfoy.investmentSaladApi.domain.asset.crypto;

import java.util.List;

import ca.csfoy.investmentSaladApi.domain.BasicRepository;
import ca.csfoy.investmentSaladApi.domain.DeleteRepository;
import ca.csfoy.investmentSaladApi.domain.UpdateRepository;

public interface CryptoAssetRepository extends BasicRepository<String, CryptoAsset>,
		DeleteRepository<String, CryptoAsset>, UpdateRepository<String, CryptoAsset> {

	List<CryptoAsset> getAllCryptoAssets();

	List<CryptoAsset> getAllCryptoAssetsFromPortfolio(String id);
}
