package ca.csfoy.investmentSaladApi.infra.widget;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import ca.csfoy.investmentSaladApi.domain.widget.Widget;
import ca.csfoy.investmentSaladApi.domain.widget.distribution.DistributionWidget;
import ca.csfoy.investmentSaladApi.domain.widget.net_worth.NetWorthWidget;
import ca.csfoy.investmentSaladApi.domain.widget.watch_list.WatchListWidget;
import ca.csfoy.investmentSaladApi.infra.dashboard.DashboardEntity;
import ca.csfoy.investmentSaladApi.infra.tag.TagEntity;
import ca.csfoy.investmentSaladApi.infra.widget.distribution.DistributionWidgetEntity;
import ca.csfoy.investmentSaladApi.infra.widget.net_worth.NetWorthWidgetEntity;
import ca.csfoy.investmentSaladApi.infra.widget.watch_list.WatchListWidgetEntity;

@Component
public class WidgetEntityConverter {

	public Widget fromEntityToWidget(WidgetEntity entity) {
		switch (entity.getWidgetType()) {
		case DISTRIBUTION: {
			DistributionWidgetEntity castedEntity = (DistributionWidgetEntity) entity;
			return new DistributionWidget(castedEntity.getId(), castedEntity.getDashboard().getId(), castedEntity.getName(),
					castedEntity.getPosX(), castedEntity.getPosY(), castedEntity.getWidth(), castedEntity.getHeight(),
					castedEntity.getWidgetType(),
					castedEntity.getTags().stream().map(TagEntity::getId).collect(Collectors.toList()));
		}
		case NET_WORTH: {
			NetWorthWidgetEntity castedEntity = (NetWorthWidgetEntity) entity;
			return new NetWorthWidget(castedEntity.getId(), castedEntity.getDashboard().getId(), castedEntity.getName(),
					castedEntity.getPosX(), castedEntity.getPosY(), castedEntity.getWidth(), castedEntity.getHeight(),
					castedEntity.getWidgetType(),
					castedEntity.getTags().stream().map(TagEntity::getId).collect(Collectors.toList()),
					castedEntity.isDetailPage(), castedEntity.getPeriod());
		}
		case WATCH_LIST: {
			WatchListWidgetEntity castedEntity = (WatchListWidgetEntity) entity;
			return new WatchListWidget(castedEntity.getId(), castedEntity
					.getDashboard().getId(), castedEntity.getName(),
					castedEntity.getPosX(), castedEntity.getPosY(), castedEntity.getWidth(), castedEntity.getHeight(),
					castedEntity.getWidgetType(),
					castedEntity.getTags().stream().map(TagEntity::getId).collect(Collectors.toList()),
					castedEntity.getSymbols());
		}
		}
		return null;

	}

	public WidgetEntity fromWidgetToEntity(Widget widget, DashboardEntity dasboard, Set<TagEntity> tags) {
		switch (widget.getWidgetType()) {
		case DISTRIBUTION: {
			DistributionWidget castedWidget = (DistributionWidget) widget;
			return new DistributionWidgetEntity(castedWidget.getId(), castedWidget.getName(), dasboard,
					castedWidget.getPosX(), castedWidget.getPosY(), castedWidget.getWidth(), castedWidget.getHeight(),
					widget.getWidgetType(), tags);
		}
		case NET_WORTH: {
			NetWorthWidget castedWidget = (NetWorthWidget) widget;
			return new NetWorthWidgetEntity(castedWidget.getId(), castedWidget.getName(), dasboard,
					castedWidget.getPosX(), castedWidget.getPosY(), castedWidget.getWidth(), castedWidget.getHeight(),
					widget.getWidgetType(), tags, castedWidget.isDetailChart(), castedWidget.getPeriod());
		}
		case WATCH_LIST: {
			WatchListWidget castedWidget = (WatchListWidget) widget;
			return new WatchListWidgetEntity(castedWidget.getId(), castedWidget.getName(), dasboard,
					castedWidget.getPosX(), castedWidget.getPosY(), castedWidget.getWidth(), castedWidget.getHeight(),
					widget.getWidgetType(), tags, castedWidget.getSymbols());
		}
		}
		return null;

	}
}
