package ca.csfoy.investmentSaladApi.domain.widget.watch_list;

import java.util.List;
import java.util.Objects;

import ca.csfoy.investmentSaladApi.domain.widget.Widget;
import ca.csfoy.investmentSaladApi.domain.widget.WidgetTypes;

public class WatchListWidget extends Widget {

	List<String> symbols;

	public WatchListWidget(String id, String dashboardId, String name, int posX, int posY, int width, int height,
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
		if (!(o instanceof WatchListWidget))
			return false;
		if (!super.equals(o))
			return false;
		WatchListWidget widget = (WatchListWidget) o;
		return symbols.equals(widget.getSymbols());
	}

	@Override
	public int hashCode() {
		return Objects.hash(super.hashCode(), symbols);
	}

}
