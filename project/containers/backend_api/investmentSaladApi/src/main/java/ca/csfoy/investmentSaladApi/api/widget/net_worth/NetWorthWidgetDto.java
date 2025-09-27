package ca.csfoy.investmentSaladApi.api.widget.net_worth;

import java.util.List;

import org.springframework.lang.NonNull;

import ca.csfoy.investmentSaladApi.api.widget.WidgetDto;
import ca.csfoy.investmentSaladApi.domain.widget.WidgetTypes;
import jakarta.validation.constraints.NotBlank;

public class NetWorthWidgetDto extends WidgetDto {

	@NonNull
	private boolean isDetailChart;

	private boolean detailChart;
	@NotBlank
	private String period;

	public NetWorthWidgetDto(String name, int posX, int posY, int width, int height, WidgetTypes widgetType,
			List<String> tags, boolean isDetailChart, String period) {
		super(name, posX, posY, width, height, widgetType, tags);
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
		NetWorthWidgetDto dto = (NetWorthWidgetDto) o;
		return getName().equals(dto.getName()) && this.getPosX() == dto.getPosX() && this.getPosY() == dto.getPosY()
				&& this.getHeight() == dto.getHeight() && this.getWidth() == dto.getWidth()
				&& this.getTags().equals(dto.getTags()) && detailChart == dto.isDetailChart()
				&& getPeriod().equals(dto.getPeriod());
	}
}
