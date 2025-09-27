package ca.csfoy.investmentSaladApi.domain.widget.net_worth;

import java.util.List;
import java.util.Objects;

import ca.csfoy.investmentSaladApi.domain.widget.Widget;
import ca.csfoy.investmentSaladApi.domain.widget.WidgetTypes;

public class NetWorthWidget extends Widget {
	private boolean isDetailChart;
	private String period;

	public NetWorthWidget(String id, String dashboardId, String name, int posX, int posY, int width, int height,
			WidgetTypes widgetType, List<String> tags, boolean isDetailChart, String period) {
		super(id, dashboardId, name, posX, posY, width, height, widgetType, tags);
		this.isDetailChart = isDetailChart;
		this.period = period;
	}

	public boolean isDetailChart() {
		return isDetailChart;
	}

	public String getPeriod() {
		return period;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof NetWorthWidget))
			return false;
		if (!super.equals(o))
			return false;
		NetWorthWidget widget = (NetWorthWidget) o;
		return isDetailChart == widget.isDetailChart && period.equals(widget.getPeriod());
	}

	@Override
	public int hashCode() {
		return Objects.hash(super.hashCode(), isDetailChart, period);
	}
}
