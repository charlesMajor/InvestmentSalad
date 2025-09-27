package ca.csfoy.investmentSaladApi.api.widget.net_worth;

import java.util.List;

import ca.csfoy.investmentSaladApi.api.widget.WidgetFullDto;
import ca.csfoy.investmentSaladApi.domain.widget.WidgetTypes;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class NetWorthWidgetFullDto extends WidgetFullDto {

	@NotNull
	private boolean detailChart;
	@NotBlank
	private String period;

	public NetWorthWidgetFullDto(String id, String dashboardId, String name, int posX, int posY, int width, int height,
			WidgetTypes widgetType, List<String> tags, boolean isDetailChart, String period) {
		super(id, dashboardId, name, posX, posY, width, height, widgetType, tags);
		this.detailChart = isDetailChart;
		this.period = period;
	}

	public boolean isDetailChart() {
		return detailChart;
	}

	public String getPeriod() {
		return period;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		NetWorthWidgetFullDto dto = (NetWorthWidgetFullDto) o;
		return getId().equals(dto.getId()) && getDashboardId().equals(dto.getDashboardId())
				&& getName().equals(dto.getName()) && this.getPosX() == dto.getPosX() && this.getPosY() == dto.getPosY()
				&& this.getHeight() == dto.getHeight() && this.getWidth() == dto.getWidth()
				&& this.getTags().equals(dto.getTags()) && detailChart == dto.detailChart
				&& getPeriod().equals(dto.getPeriod());
	}
}
