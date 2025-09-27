package ca.csfoy.investmentSaladApi.infra.portfolio;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import ca.csfoy.investmentSaladApi.controller.exception.ErrorMessageLabel;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.DuplicateException;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.ObjectNotFoundException;
import ca.csfoy.investmentSaladApi.domain.TokenUtils;
import ca.csfoy.investmentSaladApi.domain.portfolio.Portfolio;
import ca.csfoy.investmentSaladApi.domain.portfolio.PortfolioRepository;
import ca.csfoy.investmentSaladApi.infra.tag.TagDao;
import ca.csfoy.investmentSaladApi.infra.tag.TagId;
import ca.csfoy.investmentSaladApi.infra.tag.portfolio_tag.PortfolioTagDao;
import ca.csfoy.investmentSaladApi.infra.tag.portfolio_tag.PortfolioTagEntity;
import ca.csfoy.investmentSaladApi.infra.tag.portfolio_tag.PortfolioTagId;
import ca.csfoy.investmentSaladApi.infra.user.UserDao;

@Repository
public class PortfolioRepositoryHibernate extends TokenUtils implements PortfolioRepository {
	private final PortfolioDao dao;
	private final PortfolioEntityConverter converter;
	private final UserDao userDao;
	private final TagDao tagDao;
	private final PortfolioTagDao portfolioTagDao;

	public PortfolioRepositoryHibernate(PortfolioDao dao, PortfolioEntityConverter converter, UserDao userDao,
			TagDao tagDao, PortfolioTagDao portfolioTagDao) {
		super();
		this.dao = dao;
		this.converter = converter;
		this.userDao = userDao;
		this.tagDao = tagDao;
		this.portfolioTagDao = portfolioTagDao;
	}

	// CREATE
	@Override
	public Portfolio create(Portfolio portfolio) {
		if (dao.findById(portfolio.getId()).isEmpty()) {
			PortfolioEntity createdEntity = dao
					.save(converter.fromPortfolioToEntity(portfolio, userDao.getReferenceById(getUserIdFromToken())));
			for (String tag : portfolio.getTags()) {
				if (tagDao.findById(new TagId(tag, getUserIdFromToken())).isEmpty()) {
					throw new ObjectNotFoundException("Tag not found");
				}
				createdEntity
						.addTagAffectation(portfolioTagDao.save(new PortfolioTagEntity(new PortfolioTagId(createdEntity,
								tagDao.findById(new TagId(tag, getUserIdFromToken())).get()))));
			}

			return converter.fromEntityToPortfolio(createdEntity);
		}
		throw new DuplicateException(
				String.format(ErrorMessageLabel.MSG_CREATE_PORTFOLIO_NAME_AREADY_EXIST, portfolio.getName()));

	}

	// GET
	@Override
	public Portfolio getBy(String id) {
		PortfolioEntity portfolioEntity = dao.getPortfolioById(getUserIdFromToken(), id);
		if (portfolioEntity != null) {
			return converter.fromEntityToPortfolio(portfolioEntity);
		}
		throw new ObjectNotFoundException(String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Portfolio", id));
	}

	@Override
	public List<Portfolio> getAllByUserId() {
		return converter.fromEntityListToPortfolioList(dao.getAllByUserID(getUserIdFromToken()));
	}

	// UPDATE
	@Override
	public void save(String id, Portfolio portfolio) {
		PortfolioEntity entity = dao.getPortfolioById(getUserIdFromToken(), id);
		if (entity != null) {
			List<PortfolioTagEntity> tagToRemove = new ArrayList<>();
			List<String> assignedTagIds = portfolioTagDao.getAllIdByPortfolioId(id, getUserIdFromToken());

			for (PortfolioTagEntity tagAffectation : entity.getPortfolioTags()) {
				if (!portfolio.getTags().contains(tagAffectation.getId().getTagEntity().getId())) {
					tagToRemove.add(tagAffectation);
				}
			}
			for (PortfolioTagEntity tag : tagToRemove) {
				entity.removeTagAffectation(tag);
			}
			portfolioTagDao.deleteAll(tagToRemove);

			PortfolioEntity updatedEntity = dao
					.save(converter.fromPortfolioToEntity(portfolio, userDao.findById(getUserIdFromToken()).get()));
			for (String tag : portfolio.getTags()) {
				if (!assignedTagIds.contains(tag)) {
					if (tagDao.findById(new TagId(tag, getUserIdFromToken())).isEmpty()) {
						throw new ObjectNotFoundException("Tag not found");
					}
					updatedEntity.addTagAffectation(
							portfolioTagDao.save(new PortfolioTagEntity(new PortfolioTagId(updatedEntity,
									tagDao.findById(new TagId(tag, getUserIdFromToken())).get()))));
				}
			}

		} else
			throw new ObjectNotFoundException(String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Portfolio", id));
	}

	// DELETE
	@Override
	public void delete(String id) {
		PortfolioEntity entity = dao.getPortfolioById(getUserIdFromToken(), id);
		if (entity != null) {
			dao.delete(entity);
		} else {
			throw new ObjectNotFoundException(String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Portfolio", id));
		}
	}
}
