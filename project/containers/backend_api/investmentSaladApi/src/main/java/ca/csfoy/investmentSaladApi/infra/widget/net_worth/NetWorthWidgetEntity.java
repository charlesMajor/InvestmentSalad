package ca.csfoy.investmentSaladApi.infra.widget.net_worth;

import java.util.Set;

import ca.csfoy.investmentSaladApi.domain.widget.WidgetTypes;
import ca.csfoy.investmentSaladApi.infra.dashboard.DashboardEntity;
import ca.csfoy.investmentSaladApi.infra.tag.TagEntity;
import ca.csfoy.investmentSaladApi.infra.widget.WidgetEntity;
import jakarta.persistence.Entity;

@Entity
public class NetWorthWidgetEntity extends WidgetEntity {

	private boolean isDetailPage;
	private String period;

	public NetWorthWidgetEntity(String id, String name, DashboardEntity dashboard, int posX, int posY, int width,
			int height, WidgetTypes widgetType, Set<TagEntity> tags, boolean isDetailPage, String period) {
		super(id, name, dashboard, posX, posY, width, height, widgetType, tags);
		this.isDetailPage = isDetailPage;
		this.period = period;
	}

	public NetWorthWidgetEntity() {

	}

	public boolean isDetailPage() {
		return isDetailPage;
	}

	public String getPeriod() {
		return period;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		NetWorthWidgetEntity entity = (NetWorthWidgetEntity) obj;
		return getId().equals(entity.getId()) && getName().equals(entity.getName())
				&& getDashboard().equals(entity.getDashboard()) && getPosX() == entity.getPosX()
				&& getPosY() == entity.getPosY() && getHeight() == entity.getHeight() && getWidth() == entity.getWidth()
				&& getWidgetType().equals(entity.getWidgetType()) && getTags().equals(entity.getTags())
				&& isDetailPage == entity.isDetailPage() && period.equals(entity.getPeriod());
	}

}
