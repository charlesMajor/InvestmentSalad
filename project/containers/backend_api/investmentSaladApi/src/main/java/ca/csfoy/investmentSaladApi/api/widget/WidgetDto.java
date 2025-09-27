package ca.csfoy.investmentSaladApi.api.widget;

import java.util.List;

import org.springframework.lang.NonNull;

import ca.csfoy.investmentSaladApi.api.validations.ValidName;
import ca.csfoy.investmentSaladApi.domain.widget.WidgetTypes;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public abstract class WidgetDto {

	@ValidName
	private final String name;

	@Min(value = 0)
	private int posX;
	
	@Min(value = 0)
	private int posY;
	
	@Min(value = 1)
	@Max(value = 2)
	private int width;
	
	@Min(value = 1)
	@Max(value = 2)
	private int height;

	@NonNull
	private WidgetTypes widgetType;

	@NotNull
	private List<String> tags;

	public WidgetDto(String name, int posX, int posY, int width, int height, WidgetTypes widgetType,
			List<String> tags) {
		this.name = name;
		this.posX = posX;
		this.posY = posY;
		this.width = width;
		this.height = height;
		this.widgetType = widgetType;
		this.tags = tags;
	}

	public List<String> getTags() {
		return tags;
	}

	public String getName() {
		return name;
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

	public WidgetTypes getWidgetType() {
		return widgetType;
	}

	public void setWidgetType(WidgetTypes widgetType) {
		this.widgetType = widgetType;
	}

}
