package ca.csfoy.investmentSaladApi.infra.widget.distribution;

import java.util.Set;

import ca.csfoy.investmentSaladApi.domain.widget.WidgetTypes;
import ca.csfoy.investmentSaladApi.infra.dashboard.DashboardEntity;
import ca.csfoy.investmentSaladApi.infra.tag.TagEntity;
import ca.csfoy.investmentSaladApi.infra.widget.WidgetEntity;
import jakarta.persistence.Entity;

@Entity
public class DistributionWidgetEntity extends WidgetEntity {

	public DistributionWidgetEntity(String id, String name, DashboardEntity dashboard, int posX, int posY, int sizeX,
			int sizeY, WidgetTypes widgetType, Set<TagEntity> tags) {
		super(id, name, dashboard, posX, posY, sizeX, sizeY, widgetType, tags);
	}

	public DistributionWidgetEntity() {
		super();
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		DistributionWidgetEntity entity = (DistributionWidgetEntity) obj;
		return getId().equals(entity.getId()) && getName().equals(entity.getName())
				&& getDashboard().equals(entity.getDashboard()) && getPosX() == entity.getPosX()
				&& getPosY() == entity.getPosY() && getHeight() == entity.getHeight() && getWidth() == entity.getWidth()
				&& getWidgetType().equals(entity.getWidgetType()) && getTags().equals(entity.getTags());
	}
}
