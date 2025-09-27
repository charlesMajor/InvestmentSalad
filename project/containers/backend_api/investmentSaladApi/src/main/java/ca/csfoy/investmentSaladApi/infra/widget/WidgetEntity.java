package ca.csfoy.investmentSaladApi.infra.widget;

import java.util.HashSet;
import java.util.Set;

import ca.csfoy.investmentSaladApi.domain.widget.WidgetTypes;
import ca.csfoy.investmentSaladApi.infra.dashboard.DashboardEntity;
import ca.csfoy.investmentSaladApi.infra.tag.TagEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class WidgetEntity {

	@Id
	private String id;
	@Column(nullable = false, length = 30)
	private String name;
	@ManyToOne
	@JoinColumn(name = "dashboard_id")
	private DashboardEntity dashboard;
	@Column(nullable = false)
	private int posX;
	@Column(nullable = false)
	private int posY;

	@Column(nullable = false)
	private int width;

	@Column(nullable = false)
	private int height;

	private WidgetTypes widgetType;
	@ManyToMany(mappedBy = "widgets")
	private Set<TagEntity> tags = new HashSet<>();

	public WidgetEntity(String id, String name, DashboardEntity dashboard, int posX, int posY, int width, int height,
			WidgetTypes widgetType, Set<TagEntity> tags) {
		this.id = id;
		this.name = name;
		this.dashboard = dashboard;
		this.posX = posX;
		this.posY = posY;
		this.width = width;
		this.height = height;
		this.widgetType = widgetType;
		this.tags = tags;
		for (TagEntity tag : tags) {
			if (!tag.getWidgets().contains(this)) {
				tag.addWidget(this);
			}
		}

	}

	public WidgetEntity() {
	}

	public String getName() {
		return name;
	}

	public DashboardEntity getDashboard() {
		return dashboard;
	}

	public Set<TagEntity> getTags() {
		return tags;
	}

	public WidgetTypes getWidgetType() {
		return widgetType;
	}

	public String getId() {
		return id;
	}

	public int getPosX() {
		return posX;
	}

	public int getPosY() {
		return posY;
	}

	public int getWidth() {
		return width;
	}

	public int getHeight() {
		return height;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		WidgetEntity other = (WidgetEntity) obj;
		return id.equals(other.id);
	}

}
