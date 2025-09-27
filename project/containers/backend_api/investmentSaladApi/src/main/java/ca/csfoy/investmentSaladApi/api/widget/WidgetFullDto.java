package ca.csfoy.investmentSaladApi.api.widget;

import java.util.List;

import ca.csfoy.investmentSaladApi.api.validations.ValidUUID;
import ca.csfoy.investmentSaladApi.domain.widget.WidgetTypes;

public abstract class WidgetFullDto extends WidgetDto {
	@ValidUUID
	private final String id;
	@ValidUUID
	private final String dashboardId;

	public WidgetFullDto(String id, String dashboardId, String name, int posX, int posY, int width, int height,
			WidgetTypes widgetType, List<String> tags) {
		super(name, posX, posY, width, height, widgetType, tags);
		this.id = id;
		this.dashboardId = dashboardId;
	}

	public String getId() {
		return id;
	}

	public String getDashboardId() {
		return dashboardId;
	}

}
