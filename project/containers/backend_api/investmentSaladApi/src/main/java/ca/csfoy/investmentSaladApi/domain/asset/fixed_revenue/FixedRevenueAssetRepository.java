package ca.csfoy.investmentSaladApi.domain.asset.fixed_revenue;

import java.util.List;

import ca.csfoy.investmentSaladApi.domain.BasicRepository;
import ca.csfoy.investmentSaladApi.domain.DeleteRepository;
import ca.csfoy.investmentSaladApi.domain.UpdateRepository;

public interface FixedRevenueAssetRepository extends BasicRepository<String, FixedRevenueAsset>,
		DeleteRepository<String, FixedRevenueAsset>, UpdateRepository<String, FixedRevenueAsset> {

	List<FixedRevenueAsset> getAllFixedRevenueAssets();

	List<FixedRevenueAsset> getAllFixedRevenueAssetsFromPortfolio(String id);

}
