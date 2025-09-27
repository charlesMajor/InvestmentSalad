package ca.csfoy.investmentSaladApi.infra.widget.watch_list;

import java.util.List;
import java.util.Set;

import ca.csfoy.investmentSaladApi.domain.widget.WidgetTypes;
import ca.csfoy.investmentSaladApi.infra.dashboard.DashboardEntity;
import ca.csfoy.investmentSaladApi.infra.tag.TagEntity;
import ca.csfoy.investmentSaladApi.infra.widget.WidgetEntity;
import jakarta.persistence.Entity;

@Entity
public class WatchListWidgetEntity extends WidgetEntity {

	List<String> symbols;

	public WatchListWidgetEntity(String id, String name, DashboardEntity dashboard, int posX, int posY, int width,
			int height, WidgetTypes widgetType, Set<TagEntity> tags, List<String> symbols) {
		super(id, name, dashboard, posX, posY, width, height, widgetType, tags);
		this.symbols = symbols;
	}

	public WatchListWidgetEntity() {
		super();
	}

	public List<String> getSymbols() {
		return symbols;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		WatchListWidgetEntity entity = (WatchListWidgetEntity) obj;
		return getId().equals(entity.getId()) && getName().equals(entity.getName())
				&& getDashboard().equals(entity.getDashboard()) && getPosX() == entity.getPosX()
				&& getPosY() == entity.getPosY() && getHeight() == entity.getHeight() && getWidth() == entity.getWidth()
				&& getWidgetType().equals(entity.getWidgetType()) && getTags().equals(entity.getTags())
				&& symbols.equals(entity.getSymbols());
	}

}
