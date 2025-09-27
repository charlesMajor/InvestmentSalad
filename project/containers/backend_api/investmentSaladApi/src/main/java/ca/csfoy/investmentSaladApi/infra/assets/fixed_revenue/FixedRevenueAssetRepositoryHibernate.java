
package ca.csfoy.investmentSaladApi.infra.assets.fixed_revenue;

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
import ca.csfoy.investmentSaladApi.domain.asset.fixed_revenue.FixedRevenueAsset;
import ca.csfoy.investmentSaladApi.domain.asset.fixed_revenue.FixedRevenueAssetRepository;
import ca.csfoy.investmentSaladApi.infra.assets.AssetEntityConverter;
import ca.csfoy.investmentSaladApi.infra.tag.TagDao;
import ca.csfoy.investmentSaladApi.infra.tag.TagEntity;
import ca.csfoy.investmentSaladApi.infra.tag.TagId;
import ca.csfoy.investmentSaladApi.infra.tag.fixed_revenue_asset_tag.FixedRevenueAssetTagDao;
import ca.csfoy.investmentSaladApi.infra.tag.fixed_revenue_asset_tag.FixedRevenueAssetTagEntity;

@Repository
public class FixedRevenueAssetRepositoryHibernate extends TokenUtils implements FixedRevenueAssetRepository {

	private final FixedRevenueAssetDao dao;
	private final FixedRevenueAssetTagDao fixedRevenueTagDao;
	private final TagDao tagDao;
	private AssetEntityConverter converter;

	public FixedRevenueAssetRepositoryHibernate(FixedRevenueAssetDao dao, FixedRevenueAssetTagDao fixedRevenueDao,
			TagDao tagDao, AssetEntityConverter converter) {
		super();
		this.dao = dao;
		this.fixedRevenueTagDao = fixedRevenueDao;
		this.tagDao = tagDao;
		this.converter = converter;
	}

	// CREATE
	@Override
	public FixedRevenueAsset create(FixedRevenueAsset asset) {
		Optional<FixedRevenueAssetEntity> entity = dao.findById(asset.getId());
		if (entity.isEmpty()) {
			FixedRevenueAssetEntity createdEntity = dao.save(converter.fromFixedRevenueAssetToEntity(asset));
			for (String tag : asset.getTags()) {
				Optional<TagEntity> tagToAdd = tagDao.findById(new TagId(tag, getUserIdFromToken()));
				if (tagToAdd.isPresent()) {
					FixedRevenueAssetTagEntity linkedTag = fixedRevenueTagDao
							.save(new FixedRevenueAssetTagEntity(createdEntity, tagToAdd.get()));
					createdEntity.addTagAffectation(linkedTag);
				} else {
					throw new ObjectNotFoundException(
							String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Tag", tag));
				}
			}
			return converter.fromFixedRevenueEntityAsset(createdEntity);
		} else {
			throw new DuplicateException(
					String.format(ErrorMessageLabel.MSG_0005_DUPLICATE_ID_POST, "Fixed revenue asset", asset.getId()));
		}
	}

	// GET
	@Override
	public FixedRevenueAsset getBy(String id) {
		FixedRevenueAssetEntity entity = dao.getByAssetId(id, getUserIdFromToken());
		if (Objects.isNull(entity)) {
			throw new ObjectNotFoundException(
					String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Fixed revenue asset", id));
		}
		return converter.fromFixedRevenueEntityAsset(entity);
	}

	@Override
	public List<FixedRevenueAsset> getAllFixedRevenueAssets() {
		return converter.fromFixedRevenueEntityListToAssetList(dao.getAllFixedRevenueAssets(getUserIdFromToken()));
	}

	@Override
	public List<FixedRevenueAsset> getAllFixedRevenueAssetsFromPortfolio(String id) {
		return converter.fromFixedRevenueEntityListToAssetList(
				dao.getAllFixedRevenueAssetsByPortfolioId(getUserIdFromToken(), id));
	}

	// UPDATE
	@Override
	public void save(String id, FixedRevenueAsset asset) {
		Optional<FixedRevenueAssetEntity> entity = dao.findById(id);
		if (entity.isPresent()) {
			Set<FixedRevenueAssetTagEntity> assignedTags = entity.get().getAssetTags();
			List<FixedRevenueAssetTagEntity> tagsToRemove = new ArrayList<>();
			List<String> assignedTagsIds = fixedRevenueTagDao.getAllIdByAssetId(id, getUserIdFromToken());

			for (FixedRevenueAssetTagEntity tagAffectation : assignedTags) {
				if (!asset.getTags().contains(tagAffectation.getId().getTag().getId())) {
					tagsToRemove.add(tagAffectation);
				}
			}
			for (FixedRevenueAssetTagEntity tag : tagsToRemove) {
				entity.get().removeTagAffectation(tag);
			}
			fixedRevenueTagDao.deleteAll(tagsToRemove);

			FixedRevenueAssetEntity updatedEntity = dao.save(converter.fromFixedRevenueAssetToEntity(asset));
			for (String tag : asset.getTags()) {
				if (!assignedTagsIds.contains(tag)) {
					Optional<TagEntity> tagToAdd = tagDao.findById(new TagId(tag, getUserIdFromToken()));

					if (tagToAdd.isPresent()) {
						FixedRevenueAssetTagEntity linkedTag = fixedRevenueTagDao
								.save(new FixedRevenueAssetTagEntity(updatedEntity, tagToAdd.get()));
						updatedEntity.addTagAffectation(linkedTag);
					} else {
						throw new ObjectNotFoundException(
								String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Tag", tag));
					}
				}
			}

		} else {
			throw new ObjectNotFoundException(
					String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Fixed revenue asset", id));
		}

	}

	// DELETE
	@Override
	public void delete(String id) {
		Optional<FixedRevenueAssetEntity> entity = dao.findById(id);
		if (entity.isPresent()) {
			dao.delete(entity.get());
		} else {
			throw new ObjectNotFoundException(
					String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Fixed revenue asset", id));
		}
	}

}
