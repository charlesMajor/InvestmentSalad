package ca.csfoy.investmentSaladApi.domain.widget;

import java.util.List;
import java.util.Objects;

public abstract class Widget {
	private final String id;
	private final String dashboardId;
	private final String name;
	private int posX;
	private int posY;
	private int width;
	private int height;
	private WidgetTypes widgetType;
	private List<String> tags;

	public Widget(String id, String dashboardId, String name, int posX, int posY, int width, int height,
			WidgetTypes widgetType, List<String> tags) {
		super();
		this.id = id;
		this.name = name;
		this.dashboardId = dashboardId;
		this.posX = posX;
		this.posY = posY;
		this.width = width;
		this.height = height;
		this.widgetType = widgetType;
		this.tags = tags;
	}

	public String getName() {
		return name;
	}

	public List<String> getTags() {
		return tags;
	}

	public String getDashboardId() {
		return dashboardId;
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

	public WidgetTypes getWidgetType() {
		return this.widgetType;
	}

	public int getWidth() {
		return width;
	}

	public int getHeight() {
		return height;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof Widget))
			return false;
		Widget widget = (Widget) o;
		return posX == widget.posX && posY == widget.posY && width == widget.width && height == widget.height
				&& id.equals(widget.getId()) && dashboardId.equals(widget.getDashboardId())
				&& name.equals(widget.getName()) && widgetType == widget.widgetType && tags.equals(widget.getTags());
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, dashboardId, name, posX, posY, width, height, widgetType, tags);
	}
}
