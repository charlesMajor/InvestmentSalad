package ca.csfoy.investmentSaladApi.infra.assets.crypto;

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
import ca.csfoy.investmentSaladApi.domain.asset.crypto.CryptoAsset;
import ca.csfoy.investmentSaladApi.domain.asset.crypto.CryptoAssetRepository;
import ca.csfoy.investmentSaladApi.infra.assets.AssetEntityConverter;
import ca.csfoy.investmentSaladApi.infra.tag.TagDao;
import ca.csfoy.investmentSaladApi.infra.tag.TagEntity;
import ca.csfoy.investmentSaladApi.infra.tag.TagId;
import ca.csfoy.investmentSaladApi.infra.tag.crypto_asset_tag.CryptoAssetTagDao;
import ca.csfoy.investmentSaladApi.infra.tag.crypto_asset_tag.CryptoAssetTagEntity;

@Repository
public class CryptoAssetRepositoryHibernate extends TokenUtils implements CryptoAssetRepository {

	private final CryptoAssetDao dao;
	private final TagDao tagDao;
	private final CryptoAssetTagDao cryptoTagDao;
	private final AssetEntityConverter converter;

	public CryptoAssetRepositoryHibernate(CryptoAssetDao dao, TagDao tagDao, CryptoAssetTagDao cryptoTagDao,
			AssetEntityConverter converter) {
		super();
		this.dao = dao;
		this.tagDao = tagDao;
		this.cryptoTagDao = cryptoTagDao;
		this.converter = converter;
	}

	// CREATE
	@Override
	public CryptoAsset create(CryptoAsset asset) {
		Optional<CryptoAssetEntity> entity = dao.findById(asset.getId());
		if (entity.isEmpty()) {
			CryptoAssetEntity createdEntity = dao.save(converter.fromCryptoAssetToEntity(asset));
			for (String tag : asset.getTags()) {
				Optional<TagEntity> tagToAdd = tagDao.findById(new TagId(tag, getUserIdFromToken()));

				if (tagToAdd.isPresent()) {
					CryptoAssetTagEntity linkedTag = cryptoTagDao
							.save(new CryptoAssetTagEntity(createdEntity, tagToAdd.get()));
					createdEntity.addTagAffectation(linkedTag);
				} else {
					throw new ObjectNotFoundException(
							String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Tag", tag));
				}

			}
			return converter.fromCryptoEntityToCryptoAsset(createdEntity);
		}
		throw new DuplicateException(
				String.format(ErrorMessageLabel.MSG_0005_DUPLICATE_ID_POST, "Crypto asset", asset.getId()));
	}

	// GET
	@Override
	public CryptoAsset getBy(String id) {
		CryptoAssetEntity entity = dao.getByAssetId(id, getUserIdFromToken());
		if (Objects.isNull(entity)) {
			throw new ObjectNotFoundException(
					String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Crypto asset", id));
		}
		return converter.fromCryptoEntityToCryptoAsset(dao.getByAssetId(id, getUserIdFromToken()));
	}

	@Override
	public List<CryptoAsset> getAllCryptoAssets() {
		return converter.fromCryptoEntityListToAssetList(dao.getAllCryptoAssets(getUserIdFromToken()));
	}

	@Override
	public List<CryptoAsset> getAllCryptoAssetsFromPortfolio(String id) {
		return converter.fromCryptoEntityListToAssetList(dao.getAllCryptoAssetsByPortfolioId(getUserIdFromToken(), id));
	}

	// UPDATE
	@Override
	public void save(String id, CryptoAsset asset) {

		Optional<CryptoAssetEntity> entity = dao.findById(id);
		if (entity.isPresent()) {
			Set<CryptoAssetTagEntity> assignedTags = entity.get().getAssetTags();
			List<CryptoAssetTagEntity> tagsToRemove = new ArrayList<>();
			List<String> assignedTagsIds = cryptoTagDao.getAllIdByAssetId(id, getUserIdFromToken());

			for (CryptoAssetTagEntity tagAffectation : assignedTags) {
				if (!asset.getTags().contains(tagAffectation.getId().getTag().getId())) {
					tagsToRemove.add(tagAffectation);
				}
			}
			for (CryptoAssetTagEntity tag : tagsToRemove) {
				entity.get().removeTagAffectation(tag);
			}
			cryptoTagDao.deleteAll(tagsToRemove);

			CryptoAssetEntity updatedEntity = dao.save(converter.fromCryptoAssetToEntity(asset));
			for (String tag : asset.getTags()) {
				if (!assignedTagsIds.contains(tag)) {
					Optional<TagEntity> tagToAdd = tagDao.findById(new TagId(tag, getUserIdFromToken()));

					if (tagToAdd.isPresent()) {
						CryptoAssetTagEntity linkedTag = cryptoTagDao
								.save(new CryptoAssetTagEntity(updatedEntity, tagToAdd.get()));
						updatedEntity.addTagAffectation(linkedTag);
					} else {
						throw new ObjectNotFoundException(
								String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Tag", tag));
					}
				}
			}

		} else {
			throw new ObjectNotFoundException(
					String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Crypto asset", id));
		}

	}

	// DELETE
	@Override
	public void delete(String id) {
		Optional<CryptoAssetEntity> entity = dao.findById(id);
		if (entity.isPresent()) {
			dao.delete(entity.get());
		} else {
			throw new ObjectNotFoundException(
					String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Crypto asset", id));
		}
	}

}
