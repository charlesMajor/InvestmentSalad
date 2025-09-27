package ca.csfoy.investmentSaladApi.api.widget.watch_list;

import java.util.List;

import ca.csfoy.investmentSaladApi.api.widget.WidgetDto;
import ca.csfoy.investmentSaladApi.domain.widget.WidgetTypes;
import jakarta.validation.constraints.NotNull;

public class WatchListWidgetDto extends WidgetDto {

	@NotNull
	private List<String> symbols;

	public WatchListWidgetDto(String name, int posX, int posY, int width, int height, WidgetTypes widgetType,
			List<String> tags, List<String> symbols) {
		super(name, posX, posY, width, height, widgetType, tags);
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
		WatchListWidgetDto dto = (WatchListWidgetDto) o;
		return getName().equals(dto.getName()) && this.getPosX() == dto.getPosX() && this.getPosY() == dto.getPosY()
				&& this.getHeight() == dto.getHeight() && this.getWidth() == dto.getWidth()
				&& this.getTags().equals(dto.getTags()) && symbols.equals(dto.symbols);
	}

}
