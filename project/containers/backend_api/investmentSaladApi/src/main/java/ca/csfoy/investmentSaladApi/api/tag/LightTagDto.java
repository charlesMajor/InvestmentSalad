package ca.csfoy.investmentSaladApi.api.tag;


import ca.csfoy.investmentSaladApi.api.validations.ValidHexColor;
import ca.csfoy.investmentSaladApi.api.validations.ValidName;

public class LightTagDto {

	@ValidName(min = 1, max = 16)
	private String name;
	@ValidHexColor
	private String hexColor;
	
	public LightTagDto(String name, String hexColor) {
		this.name = name;
		this.hexColor = hexColor;
	}

	public String getName() {
		return name;
	}

	public String getHexColor() {
		return hexColor;
	}
	
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LightTagDto dto = (LightTagDto) o;
        return name.equals(dto.name) &&
               hexColor.equals(dto.hexColor);
    }
}
