package ca.csfoy.investmentSaladApi.api.tag;


import ca.csfoy.investmentSaladApi.api.validations.ValidHexColor;
import ca.csfoy.investmentSaladApi.api.validations.ValidName;
import ca.csfoy.investmentSaladApi.api.validations.ValidUUID;

public class FullTagDto {
	
	@ValidUUID
	private String tagId;
	
	@ValidName(min=1, max = 16)
	private String name;
	
	@ValidHexColor
	private String hexColor;

	public FullTagDto(String tagId,String name, String hexColor) {
		this.name = name;
		this.hexColor = hexColor;
		this.tagId = tagId;
	}

	public String getTagId() {
		return tagId;
	}

	public String getName() {
		return name;
	}

	public String getHexColor() {
		return hexColor;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		FullTagDto dto = (FullTagDto) o;
		return tagId.equals(dto.tagId) && name.equals(dto.name) && hexColor.equals(dto.hexColor);
	}
}
