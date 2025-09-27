package ca.csfoy.investmentSaladApi.infra.assets.stock;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Repository;

import ca.csfoy.investmentSaladApi.controller.exception.ErrorMessageLabel;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.DuplicateException;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.ObjectNotFoundException;
import ca.csfoy.investmentSaladApi.domain.TokenUtils;
import ca.csfoy.investmentSaladApi.domain.asset.stock.StockAsset;
import ca.csfoy.investmentSaladApi.domain.asset.stock.StockAssetRepository;
import ca.csfoy.investmentSaladApi.infra.assets.AssetEntityConverter;
import ca.csfoy.investmentSaladApi.infra.tag.TagDao;
import ca.csfoy.investmentSaladApi.infra.tag.TagEntity;
import ca.csfoy.investmentSaladApi.infra.tag.TagId;
import ca.csfoy.investmentSaladApi.infra.tag.stock_asset_tag.StockAssetTagDao;
import ca.csfoy.investmentSaladApi.infra.tag.stock_asset_tag.StockAssetTagEntity;

@Repository
public class StockAssetRepositoryHibernate extends TokenUtils implements StockAssetRepository {

	private AssetEntityConverter converter;
	private final StockAssetDao dao;
	private final TagDao tagDao;
	private final StockAssetTagDao stockDao;

	public StockAssetRepositoryHibernate(AssetEntityConverter converter, StockAssetDao dao, TagDao tagDao,
			StockAssetTagDao stockDao) {
		super();
		this.converter = converter;
		this.dao = dao;
		this.tagDao = tagDao;
		this.stockDao = stockDao;
	}

	// CREATE
	@Override
	public StockAsset create(StockAsset asset) {
		Optional<StockAssetEntity> entity = dao.findById(asset.getId());
		if (entity.isEmpty()) {

			StockAssetEntity createdEntity = dao.save(converter.fromStockAssetToEntity(asset));
			for (String tag : asset.getTags()) {
				Optional<TagEntity> tagToAdd = tagDao.findById(new TagId(tag, getUserIdFromToken()));
				if (tagToAdd.isPresent()) {
					StockAssetTagEntity linkedTag = stockDao
							.save(new StockAssetTagEntity(createdEntity, tagToAdd.get()));
					createdEntity.addTagAffectation(linkedTag);
				} else {
					throw new ObjectNotFoundException(
							String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Tag", tag));
				}

			}
			return converter.fromStockEntityToStockAsset(createdEntity);
		}
		throw new DuplicateException(
				String.format(ErrorMessageLabel.MSG_0005_DUPLICATE_ID_POST, "Stock asset", asset.getId()));
	}

	// GET
	@Override
	public StockAsset getBy(String id) {
		StockAssetEntity entity = dao.getByAssetId(id, getUserIdFromToken());
		if (Objects.isNull(entity)) {
			throw new ObjectNotFoundException(
					String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Stock asset", id));
		}
		return converter.fromStockEntityToStockAsset(dao.getByAssetId(id, getUserIdFromToken()));
	}

	@Override
	public List<StockAsset> getAllStockAssets() {
		return converter.fromStockEntityListToAssetList(dao.getAllStockAssets(getUserIdFromToken()));
	}

	@Override
	public List<StockAsset> getAllStockAssetsFromPortfolio(String id) {
		return converter.fromStockEntityListToAssetList(dao.getAllStockAssetsByPortfolioId(getUserIdFromToken(), id));
	}

	// UPDATE
	@Override
	public void save(String id, StockAsset asset) {

		Optional<StockAssetEntity> entity = dao.findById(id);
		if (entity.isPresent()) {
			Set<StockAssetTagEntity> assignedTags = entity.get().getAssetTags();
			List<StockAssetTagEntity> tagsToRemove = new ArrayList<>();
			List<String> assignedTagsIds = stockDao.getAllIdByAssetId(id, getUserIdFromToken());

			for (StockAssetTagEntity tagAffectation : assignedTags) {
				if (!asset.getTags().contains(tagAffectation.getId().getTag().getId())) {
					tagsToRemove.add(tagAffectation);
				}
			}
			for (StockAssetTagEntity tag : tagsToRemove) {
				entity.get().removeTagAffectation(tag);
			}
			stockDao.deleteAll(tagsToRemove);

			StockAssetEntity updatedEntity = dao.save(converter.fromStockAssetToEntity(asset));
			for (String tag : asset.getTags()) {
				if (!assignedTagsIds.contains(tag)) {
					Optional<TagEntity> tagToAdd = tagDao.findById(new TagId(tag, getUserIdFromToken()));

					if (tagToAdd.isPresent()) {
						StockAssetTagEntity linkedTag = stockDao
								.save(new StockAssetTagEntity(updatedEntity, tagToAdd.get()));
						updatedEntity.addTagAffectation(linkedTag);
					} else {
						throw new ObjectNotFoundException(
								String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Tag", tag));
					}
				}
			}

		} else {
			throw new ObjectNotFoundException(
					String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Stock asset", id));
		}

	}

	// DELETE
	@Override
	public void delete(String id) {
		Optional<StockAssetEntity> entity = dao.findById(id);
		if (entity.isPresent()) {
			dao.delete(entity.get());
		} else {
			throw new ObjectNotFoundException(
					String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Stock asset", id));
		}
	}

}
