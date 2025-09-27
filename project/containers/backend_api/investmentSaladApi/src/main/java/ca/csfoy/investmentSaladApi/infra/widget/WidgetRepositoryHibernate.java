package ca.csfoy.investmentSaladApi.infra.widget;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import ca.csfoy.investmentSaladApi.controller.exception.ErrorMessageLabel;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.DuplicateException;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.ObjectNotFoundException;
import ca.csfoy.investmentSaladApi.domain.TokenUtils;
import ca.csfoy.investmentSaladApi.domain.widget.Widget;
import ca.csfoy.investmentSaladApi.domain.widget.WidgetRepository;
import ca.csfoy.investmentSaladApi.infra.dashboard.DashboardDao;
import ca.csfoy.investmentSaladApi.infra.dashboard.DashboardEntity;
import ca.csfoy.investmentSaladApi.infra.tag.TagDao;
import ca.csfoy.investmentSaladApi.infra.tag.TagEntity;
import ca.csfoy.investmentSaladApi.infra.tag.TagId;

@Repository
public class WidgetRepositoryHibernate extends TokenUtils implements WidgetRepository {

	private final WidgetDao dao;
	private final DashboardDao dasboardDao;
	private final TagDao tagDao;
	private final WidgetEntityConverter converter;

	public WidgetRepositoryHibernate(WidgetDao dao, DashboardDao dasboardDao, TagDao tagDao,
			WidgetEntityConverter converter) {
		super();
		this.dao = dao;
		this.dasboardDao = dasboardDao;
		this.tagDao = tagDao;
		this.converter = converter;
	}

	// GET
	@Override
	public List<Widget> getAll() {
		DashboardEntity currentUserDashboardEntity = dasboardDao.getOneByUserID(getUserIdFromToken());
		if (currentUserDashboardEntity != null) {
			List<String> ids = dao.getAllByUserId(currentUserDashboardEntity);
			return dao.findAllById(ids).stream().map(converter::fromEntityToWidget).collect(Collectors.toList());
		}
		throw new ObjectNotFoundException(
				String.format(ErrorMessageLabel.MSG_0006_UNKNOWN_USER_ID_GET, "Dashboard", getUserIdFromToken()));
	}

	@Override
	public Widget getBy(String id) {
		Optional<WidgetEntity> entity = dao.findById(id);
		if (entity.isPresent()) {
			return converter.fromEntityToWidget(entity.get());
		} else {
			throw new ObjectNotFoundException(String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Widget", id));
		}
	}

	// CREATE
	@Override
	public Widget create(Widget widget) {
		DashboardEntity dashboardEntity = dasboardDao.getOneByDashboardIdAndUserID(widget.getDashboardId(),
				getUserIdFromToken());
		if (dashboardEntity != null) {
			if (dao.findById(widget.getId()).isPresent()) {
				throw new DuplicateException(
						String.format(ErrorMessageLabel.MSG_0005_DUPLICATE_ID_POST, "Widget", widget.getId()));
			}
			return converter.fromEntityToWidget(
					dao.save(converter.fromWidgetToEntity(widget, dashboardEntity, getWidgetTags(widget))));

		}
		throw new ObjectNotFoundException(
				String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Dashboard", widget.getDashboardId()));

	}

	// UPDATE
	@Override
	public void save(String id, Widget widget) {
		Optional<WidgetEntity> oldEntity = dao.findById(id);
		if (oldEntity.isPresent()) {
			DashboardEntity dashboardEntity = dasboardDao.getOneByDashboardIdAndUserID(widget.getDashboardId(),
					getUserIdFromToken());
			if (dashboardEntity != null) {
				Set<TagEntity> oldTags = oldEntity.get().getTags();
				Set<TagEntity> tagsToAdd = getWidgetTags(widget);
				WidgetEntity convertedWidget = converter.fromWidgetToEntity(widget, dashboardEntity, tagsToAdd);
				syncTags(oldTags, tagsToAdd, convertedWidget);
				dao.save(convertedWidget);

			} else {
				throw new ObjectNotFoundException(
						String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Dashboard", widget.getDashboardId()));
			}

		} else {
			throw new ObjectNotFoundException(String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Widget", id));

		}

	}

	// DELETE
	@Override
	public void delete(String id) {
		Optional<WidgetEntity> entity = dao.findById(id);
		if (entity.isPresent()) {
			List<TagEntity> tags = new ArrayList<>(entity.get().getTags());
			syncTags(new HashSet<>(tags), new HashSet<>(), entity.get());
			dao.delete(entity.get());

		} else {
			throw new ObjectNotFoundException(String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Widget", id));
		}
	}

	
	
	
	private void syncTags(Set<TagEntity> oldTags, Set<TagEntity> newTags, WidgetEntity widgetEntity) {
		for (TagEntity tag : oldTags) {
			if (!newTags.contains(tag)) {
				tag.removeWidget(widgetEntity.getId());
			}
		}
	}

	private Set<TagEntity> getWidgetTags(Widget widget) {
		Set<TagEntity> tags = new HashSet<>();
		for (String tag : widget.getTags()) {
			Optional<TagEntity> currentTag = tagDao.findById(new TagId(tag, getUserIdFromToken()));
			if (currentTag.isEmpty()) {
				throw new ObjectNotFoundException(String.format(ErrorMessageLabel.MSG_0001_UNKNOWN_ID_GET, "Tag", tag));
			}
			tags.add(currentTag.get());

		}
		return tags;
	}
}
