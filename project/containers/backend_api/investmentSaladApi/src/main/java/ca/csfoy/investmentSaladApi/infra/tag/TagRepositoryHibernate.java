package ca.csfoy.investmentSaladApi.infra.tag;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import ca.csfoy.investmentSaladApi.controller.exception.ErrorMessageLabel;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.DuplicateException;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.ObjectNotFoundException;
import ca.csfoy.investmentSaladApi.domain.TokenUtils;
import ca.csfoy.investmentSaladApi.domain.tag.Tag;
import ca.csfoy.investmentSaladApi.domain.tag.TagRepository;
import ca.csfoy.investmentSaladApi.infra.assets.crypto.CryptoAssetDao;
import ca.csfoy.investmentSaladApi.infra.assets.fixed_revenue.FixedRevenueAssetDao;
import ca.csfoy.investmentSaladApi.infra.assets.ressource.RessourceAssetDao;
import ca.csfoy.investmentSaladApi.infra.assets.stock.StockAssetDao;
import ca.csfoy.investmentSaladApi.infra.portfolio.PortfolioDao;
import ca.csfoy.investmentSaladApi.infra.tag.crypto_asset_tag.CryptoAssetTagDao;
import ca.csfoy.investmentSaladApi.infra.tag.fixed_revenue_asset_tag.FixedRevenueAssetTagDao;
import ca.csfoy.investmentSaladApi.infra.tag.portfolio_tag.PortfolioTagDao;
import ca.csfoy.investmentSaladApi.infra.tag.ressource_asset_tag.RessourceAssetTagDao;
import ca.csfoy.investmentSaladApi.infra.tag.stock_asset_tag.StockAssetTagDao;
import ca.csfoy.investmentSaladApi.infra.user.UserDao;

@Repository
public class TagRepositoryHibernate extends TokenUtils implements TagRepository {
	private final TagDao dao;
	private final TagEntityConverter converter;
	private final UserDao userDao;

	public TagRepositoryHibernate(TagDao dao, CryptoAssetDao cryptoDao, StockAssetDao stockDao,
			FixedRevenueAssetDao fixedRevenueDao, RessourceAssetDao ressourceDao, PortfolioDao portfolioDao,
			CryptoAssetTagDao cryptoTagDao, StockAssetTagDao stockTagDao, FixedRevenueAssetTagDao fixedRevenueTagDao,
			RessourceAssetTagDao ressourceTagDao, PortfolioTagDao portfolioTagDao, TagEntityConverter converter,
			UserDao userDao) {
		super();
		this.dao = dao;
		this.converter = converter;
		this.userDao = userDao;
	}

	// CREATE
	@Override
	public Tag create(Tag tag) {
		String userId = getUserIdFromToken();
		if (dao.findById(new TagId(tag.getTagId(), userId)).isEmpty()
				&& dao.getByNameAndColor(tag.getName(), tag.getHexColor(), userId).isEmpty()) {
			TagEntity entity = dao.save(converter.fromTagToEntity(tag, userDao.getReferenceById(userId)));
			return converter.fromEntityToTag(entity);
		}
		throw new DuplicateException(String.format(ErrorMessageLabel.MSG_CREATE_TAG_NAME_AREADY_EXIST, tag.getName()));
	}

	// GET
	@Override
	public Tag getBy(TagId id) {

		Optional<TagEntity> tag = dao.findById(id);
		if (tag.isPresent()) {
			return converter.fromEntityToTag(tag.get());
		}
		throw new ObjectNotFoundException(String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Tag", id));
	}

	@Override
	public List<String> getAllTagsByAssetId(String assetId) {
		return dao.getAllTagsByAssetId(getUserIdFromToken(), assetId);
	}

	@Override
	public List<String> getAllAssetsByTagId(String tagId) {
		return dao.getAllAssetsByTagId(getUserIdFromToken(), tagId);
	}

	@Override
	public List<Tag> getAllByUserId() {
		return converter.fromEntityListToTagList(dao.getAllByUserID(getUserIdFromToken()));
	}

	@Override
	public Tag getByTagId(String tagId) {
		return getBy(new TagId(tagId, getUserIdFromToken()));
	}

	// UPDATE
	@Override
	public void save(TagId id, Tag element) {
		if (dao.findById(id).isPresent()) {
			dao.save(converter.fromTagToEntity(element, userDao.getReferenceById(getUserIdFromToken())));
		} else
			throw new ObjectNotFoundException(String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Tag", id.toString()));
	}

	@Override
	public void saveByTagId(String tagId, Tag element) {
		save(new TagId(tagId, getUserIdFromToken()), element);
	}

	// DELETE
	@Override
	public void delete(TagId id) {
		if (dao.findById(id).isPresent()) {
			dao.deleteById(id);
		} else
			throw new ObjectNotFoundException(String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Tag", id.toString()));
	}

	@Override
	public void deleteByTagId(String tagId) {
		delete(new TagId(tagId, getUserIdFromToken()));
	}

}