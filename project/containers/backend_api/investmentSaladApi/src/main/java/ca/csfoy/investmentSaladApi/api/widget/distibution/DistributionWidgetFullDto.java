package ca.csfoy.investmentSaladApi.api.widget.distibution;

import java.util.List;

import ca.csfoy.investmentSaladApi.api.widget.WidgetFullDto;
import ca.csfoy.investmentSaladApi.domain.widget.WidgetTypes;

public class DistributionWidgetFullDto extends WidgetFullDto {
	public DistributionWidgetFullDto(String id, String dashboardId, String name, int posX, int posY, int width,
			int height, WidgetTypes widgetType, List<String> tags) {
		super(id, dashboardId, name, posX, posY, width, height, widgetType, tags);
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		DistributionWidgetFullDto dto = (DistributionWidgetFullDto) o;
		return getId().equals(dto.getId()) && getDashboardId().equals(dto.getDashboardId())
				&& getName().equals(dto.getName()) && this.getPosX() == dto.getPosX() && this.getPosY() == dto.getPosY()
				&& this.getHeight() == dto.getHeight() && this.getWidth() == dto.getWidth()
				&& this.getTags().equals(dto.getTags());
	}

}
