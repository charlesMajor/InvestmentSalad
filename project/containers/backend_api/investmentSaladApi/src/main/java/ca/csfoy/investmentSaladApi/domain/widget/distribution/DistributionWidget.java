package ca.csfoy.investmentSaladApi.domain.widget.distribution;

import java.util.List;
import java.util.Objects;

import ca.csfoy.investmentSaladApi.domain.widget.Widget;
import ca.csfoy.investmentSaladApi.domain.widget.WidgetTypes;

public class DistributionWidget extends Widget {

	public DistributionWidget(String id, String dashboardId, String name, int posX, int posY, int sizeX, int sizeY,
			WidgetTypes widgetType, List<String> tags) {
		super(id, dashboardId, name, posX, posY, sizeX, sizeY, widgetType, tags);
	}
	
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof DistributionWidget))
			return false;
		return super.equals(o);
	}

	@Override
	public int hashCode() {
		return Objects.hash(super.hashCode());
	}
}
