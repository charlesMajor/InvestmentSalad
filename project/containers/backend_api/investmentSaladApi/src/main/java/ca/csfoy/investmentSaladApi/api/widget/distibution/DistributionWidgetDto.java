package ca.csfoy.investmentSaladApi.api.widget.distibution;

import java.util.List;

import ca.csfoy.investmentSaladApi.api.widget.WidgetDto;
import ca.csfoy.investmentSaladApi.domain.widget.WidgetTypes;

public class DistributionWidgetDto extends WidgetDto {

	public DistributionWidgetDto(String name, int posX, int posY, int width, int height, WidgetTypes widgetType,
			List<String> tags) {
		super(name, posX, posY, width, height, widgetType, tags);

	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		DistributionWidgetDto dto = (DistributionWidgetDto) o;
		return getName().equals(dto.getName()) && this.getPosX() == dto.getPosX() && this.getPosY() == dto.getPosY()
				&& this.getHeight() == dto.getHeight() && this.getWidth() == dto.getWidth()
				&& this.getTags().equals(dto.getTags());
	}

}
