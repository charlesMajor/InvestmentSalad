package ca.csfoy.investmentSaladApi.api.widget.watch_list;

import java.util.List;

import ca.csfoy.investmentSaladApi.api.widget.WidgetFullDto;
import ca.csfoy.investmentSaladApi.domain.widget.WidgetTypes;
import jakarta.validation.constraints.NotNull;

public class WatchListWidgetFullDto extends WidgetFullDto {

	@NotNull
	private List<String> symbols;

	public WatchListWidgetFullDto(String id, String dashboardId, String name, int posX, int posY, int width, int height,
			WidgetTypes widgetType, List<String> tags, List<String> symbols) {
		super(id, dashboardId, name, posX, posY, width, height, widgetType, tags);
		this.symbols = symbols;
	}

	public List<String> getSymbols() {
		return symbols;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		WatchListWidgetFullDto dto = (WatchListWidgetFullDto) o;
		return getId().equals(dto.getId()) && getDashboardId().equals(dto.getDashboardId())
				&& getName().equals(dto.getName()) && this.getPosX() == dto.getPosX() && this.getPosY() == dto.getPosY()
				&& this.getHeight() == dto.getHeight() && this.getWidth() == dto.getWidth()
				&& this.getTags().equals(dto.getTags()) && symbols.equals(dto.symbols);
	}

}
