package ca.csfoy.investmentSaladApi.infra.assets.ressource;

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
import ca.csfoy.investmentSaladApi.domain.asset.ressource.RessourceAsset;
import ca.csfoy.investmentSaladApi.domain.asset.ressource.RessourceAssetRepository;
import ca.csfoy.investmentSaladApi.infra.assets.AssetEntityConverter;
import ca.csfoy.investmentSaladApi.infra.tag.TagDao;
import ca.csfoy.investmentSaladApi.infra.tag.TagEntity;
import ca.csfoy.investmentSaladApi.infra.tag.TagId;
import ca.csfoy.investmentSaladApi.infra.tag.ressource_asset_tag.RessourceAssetTagDao;
import ca.csfoy.investmentSaladApi.infra.tag.ressource_asset_tag.RessourceAssetTagEntity;

@Repository
public class RessourceAssetRepositoryHibernate extends TokenUtils implements RessourceAssetRepository {

	private AssetEntityConverter converter;
	private final RessourceAssetDao dao;
	private final TagDao tagDao;
	private final RessourceAssetTagDao ressourceDao;

	public RessourceAssetRepositoryHibernate(AssetEntityConverter converter, RessourceAssetDao dao, TagDao tagDao,
			RessourceAssetTagDao ressourceDao) {
		super();
		this.converter = converter;
		this.dao = dao;
		this.tagDao = tagDao;
		this.ressourceDao = ressourceDao;
	}

	// CREATE
	@Override
	public RessourceAsset create(RessourceAsset asset) {
		Optional<RessourceAssetEntity> entity = dao.findById(asset.getId());
		if (entity.isEmpty()) {
			RessourceAssetEntity createdEntity = dao.save(converter.fromRessourceAssetToEntity(asset));
			for (String tag : asset.getTags()) {
				Optional<TagEntity> tagToAdd = tagDao.findById(new TagId(tag, getUserIdFromToken()));
				if (tagToAdd.isPresent()) {
					RessourceAssetTagEntity linkedTag = ressourceDao
							.save(new RessourceAssetTagEntity(createdEntity, tagToAdd.get()));
					createdEntity.addTagAffectation(linkedTag);
				} else {
					throw new ObjectNotFoundException(
							String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Tag", tag));
				}

			}
			return converter.fromRessourceEntityToAsset(createdEntity);
		}
		throw new DuplicateException(
				String.format(ErrorMessageLabel.MSG_0005_DUPLICATE_ID_POST, "Ressource asset", asset.getId()));
	}

	// GET
	@Override
	public RessourceAsset getBy(String id) {
		RessourceAssetEntity entity = dao.getByAssetId(id, getUserIdFromToken());
		if (Objects.isNull(entity)) {
			throw new ObjectNotFoundException(
					String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Ressource asset", id));
		}
		return converter.fromRessourceEntityToAsset(entity);
	}

	@Override
	public List<RessourceAsset> getAllRessourceAssets() {
		return converter.fromRessourceEntityListToAssetList(dao.getAllRessourceAssets(getUserIdFromToken()));
	}

	@Override
	public List<RessourceAsset> getAllRessourceAssetsFromPortfolio(String id) {
		return converter
				.fromRessourceEntityListToAssetList(dao.getAllRessourceAssetsByPortfolioId(getUserIdFromToken(), id));
	}

	// UPDATE
	@Override
	public void save(String id, RessourceAsset asset) {
		Optional<RessourceAssetEntity> entity = dao.findById(id);
		if (entity.isPresent()) {
			Set<RessourceAssetTagEntity> assignedTags = entity.get().getAssetTags();
			List<RessourceAssetTagEntity> tagsToRemove = new ArrayList<>();
			List<String> assignedTagsIds = ressourceDao.getAllIdByAssetId(id, getUserIdFromToken());

			for (RessourceAssetTagEntity tagAffectation : assignedTags) {
				if (!asset.getTags().contains(tagAffectation.getId().getTag().getId())) {
					tagsToRemove.add(tagAffectation);
				}
			}
			for (RessourceAssetTagEntity tag : tagsToRemove) {
				entity.get().removeTagAffectation(tag);
			}
			ressourceDao.deleteAll(tagsToRemove);

			RessourceAssetEntity updatedEntity = dao.save(converter.fromRessourceAssetToEntity(asset));
			for (String tag : asset.getTags()) {
				if (!assignedTagsIds.contains(tag)) {
					Optional<TagEntity> tagToAdd = tagDao.findById(new TagId(tag, getUserIdFromToken()));

					if (tagToAdd.isPresent()) {
						RessourceAssetTagEntity linkedTag = ressourceDao
								.save(new RessourceAssetTagEntity(updatedEntity, tagToAdd.get()));
						updatedEntity.addTagAffectation(linkedTag);
					} else {
						throw new ObjectNotFoundException(
								String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Tag", tag));
					}
				}
			}

		} else {
			throw new ObjectNotFoundException(
					String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Ressource asset", id));
		}

	}

	// DELETE
	@Override
	public void delete(String id) {
		Optional<RessourceAssetEntity> entity = dao.findById(id);
		if (entity.isPresent()) {
			dao.delete(entity.get());
		} else {
			throw new ObjectNotFoundException(
					String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Ressource asset", id));
		}
	}
}
