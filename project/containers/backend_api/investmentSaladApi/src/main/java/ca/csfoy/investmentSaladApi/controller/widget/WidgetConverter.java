package ca.csfoy.investmentSaladApi.controller.widget;

import java.util.UUID;

import org.springframework.stereotype.Component;

import ca.csfoy.investmentSaladApi.api.widget.WidgetDto;
import ca.csfoy.investmentSaladApi.api.widget.WidgetFullDto;
import ca.csfoy.investmentSaladApi.api.widget.distibution.DistributionWidgetDto;
import ca.csfoy.investmentSaladApi.api.widget.distibution.DistributionWidgetFullDto;
import ca.csfoy.investmentSaladApi.api.widget.net_worth.NetWorthWidgetFullDto;
import ca.csfoy.investmentSaladApi.api.widget.net_worth.NetWorthWidgetDto;
import ca.csfoy.investmentSaladApi.api.widget.watch_list.WatchListWidgetDto;
import ca.csfoy.investmentSaladApi.api.widget.watch_list.WatchListWidgetFullDto;
import ca.csfoy.investmentSaladApi.domain.widget.Widget;
import ca.csfoy.investmentSaladApi.domain.widget.distribution.DistributionWidget;
import ca.csfoy.investmentSaladApi.domain.widget.net_worth.NetWorthWidget;
import ca.csfoy.investmentSaladApi.domain.widget.watch_list.WatchListWidget;

@Component
public class WidgetConverter {

	public Widget fromDtoToWidget(WidgetDto dto, String dashboardId) {
		switch (dto.getWidgetType()) {
		case DISTRIBUTION: {
			DistributionWidgetDto castedDto = (DistributionWidgetDto) dto;
			return new DistributionWidget(UUID.randomUUID().toString(), dashboardId, castedDto.getName(),
					castedDto.getPosX(), castedDto.getPosY(), castedDto.getWidth(), castedDto.getHeight(),
					castedDto.getWidgetType(), castedDto.getTags());
		}
		case NET_WORTH: {
			NetWorthWidgetDto castedDto = (NetWorthWidgetDto) dto;
			return new NetWorthWidget(UUID.randomUUID().toString(), dashboardId, castedDto.getName(),
					castedDto.getPosX(), castedDto.getPosY(), castedDto.getWidth(), castedDto.getHeight(),
					castedDto.getWidgetType(), castedDto.getTags(), castedDto.isDetailChart(), castedDto.getPeriod());
		}
		case WATCH_LIST: {
			WatchListWidgetDto castedDto = (WatchListWidgetDto) dto;
			return new WatchListWidget(UUID.randomUUID().toString(), dashboardId, castedDto.getName(),
					castedDto.getPosX(), castedDto.getPosY(), castedDto.getWidth(), castedDto.getHeight(),
					castedDto.getWidgetType(), castedDto.getTags(), castedDto.getSymbols());
		}
		}
		return null;

	}

	public Widget fromFullDtoToWidget(WidgetDto dto, String dashboardId) {
		switch (dto.getWidgetType()) {
		case DISTRIBUTION: {
			DistributionWidgetFullDto castedDto = (DistributionWidgetFullDto) dto;
			return new DistributionWidget(castedDto.getId(), dashboardId, castedDto.getName(), castedDto.getPosX(),
					castedDto.getPosY(), castedDto.getWidth(), castedDto.getHeight(), castedDto.getWidgetType(),
					castedDto.getTags());
		}
		case NET_WORTH: {
			NetWorthWidgetFullDto castedDto = (NetWorthWidgetFullDto) dto;
			return new NetWorthWidget(castedDto.getId(), dashboardId, castedDto.getName(), castedDto.getPosX(),
					castedDto.getPosY(), castedDto.getWidth(), castedDto.getHeight(), castedDto.getWidgetType(),
					castedDto.getTags(), castedDto.isDetailChart(), castedDto.getPeriod());
		}
		case WATCH_LIST: {
			WatchListWidgetFullDto castedDto = (WatchListWidgetFullDto) dto;
			return new WatchListWidget(castedDto.getId(), dashboardId, castedDto.getName(), castedDto.getPosX(),
					castedDto.getPosY(), castedDto.getWidth(), castedDto.getHeight(), castedDto.getWidgetType(),
					castedDto.getTags(), castedDto.getSymbols());
		}
		}
		return null;

	}

	public WidgetFullDto fromWidgetToFullDto(Widget widget) {
		switch (widget.getWidgetType()) {
		case DISTRIBUTION: {
			DistributionWidget castedWidget = (DistributionWidget) widget;
			return new DistributionWidgetFullDto(castedWidget.getId(), castedWidget.getDashboardId(),
					castedWidget.getName(), castedWidget.getPosX(), castedWidget.getPosY(), castedWidget.getWidth(),
					castedWidget.getHeight(), castedWidget.getWidgetType(), castedWidget.getTags());
		}
		case NET_WORTH: {
			NetWorthWidget castedWidget = (NetWorthWidget) widget;
			return new NetWorthWidgetFullDto(castedWidget.getId(), castedWidget.getDashboardId(),
					castedWidget.getName(), castedWidget.getPosX(), castedWidget.getPosY(), castedWidget.getWidth(),
					castedWidget.getHeight(), castedWidget.getWidgetType(), castedWidget.getTags(),
					castedWidget.isDetailChart(), castedWidget.getPeriod());
		}
		case WATCH_LIST: {
			WatchListWidget castedWidget = (WatchListWidget) widget;
			return new WatchListWidgetFullDto(castedWidget.getId(), castedWidget.getDashboardId(),
					castedWidget.getName(), castedWidget.getPosX(), castedWidget.getPosY(), castedWidget.getWidth(),
					castedWidget.getHeight(), castedWidget.getWidgetType(), castedWidget.getTags(),
					castedWidget.getSymbols());
		}
		}
		return null;

	}
}
