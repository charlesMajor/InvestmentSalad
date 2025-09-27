package ca.csfoy.investmentSaladApi.infra.dashboard;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import ca.csfoy.investmentSaladApi.controller.exception.ErrorMessageLabel;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.DuplicateException;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.ObjectNotFoundException;
import ca.csfoy.investmentSaladApi.domain.TokenUtils;
import ca.csfoy.investmentSaladApi.domain.dashboard.Dashboard;
import ca.csfoy.investmentSaladApi.domain.dashboard.DashboardRepository;
import ca.csfoy.investmentSaladApi.infra.user.UserDao;
import ca.csfoy.investmentSaladApi.infra.user.UserEntity;

@Repository
public class DashboardRepositoryHibernate extends TokenUtils implements DashboardRepository {

	private final DashboardDao dao;
	private final DashboardEntityConverter converter;
	private final UserDao userDao;

	public DashboardRepositoryHibernate(DashboardDao dao, DashboardEntityConverter converter, UserDao userDao) {
		this.dao = dao;
		this.converter = converter;
		this.userDao = userDao;
	}

	// CREATE
	@Override
	public Dashboard create(Dashboard element) {
		if (dao.findById(element.getId()).isEmpty()) {
			return converter.fromEntityToPortfolio(
					dao.save(converter.fromDashboardToEntity(element, userDao.getReferenceById(getUserIdFromToken()))));
		}
		throw new DuplicateException(String.format(ErrorMessageLabel.MSG_0005_DUPLICATE_ID_POST, element.getId()));
	}

	@Override
	public Dashboard initializeDashboard(Dashboard dashboard, String userId) {
		Optional<UserEntity> userEntity = userDao.findById(userId);
		if (userEntity.isPresent()) {
			if (dao.findById(dashboard.getId()).isEmpty()) {
				return converter
						.fromEntityToPortfolio(dao.save(converter.fromDashboardToEntity(dashboard, userEntity.get())));
			}
			throw new DuplicateException(
					String.format(ErrorMessageLabel.MSG_0005_DUPLICATE_ID_POST, dashboard.getId()));
		} else {
			throw new ObjectNotFoundException(String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "User", userId));
		}

	}

	// GET
	@Override
	public Dashboard getBy(String id) {
		Optional<DashboardEntity> dashboardEntity = dao.findById(id);
		if (dashboardEntity.isPresent() && dashboardEntity.get().getUser().getId().equals(getUserIdFromToken())) {
			return converter.fromEntityToPortfolio(dashboardEntity.get());
		}
		throw new ObjectNotFoundException(String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Dashboard", id));
	}

	@Override
	public Dashboard getOneByUserId() {
		DashboardEntity dashboardEntity = dao.getOneByUserID(getUserIdFromToken());
		if (dashboardEntity != null) {
			return converter.fromEntityToPortfolio(dashboardEntity);
		}
		throw new ObjectNotFoundException(ErrorMessageLabel.MSG_USER_HAS_NO_DASHBOARD);
	}
}
