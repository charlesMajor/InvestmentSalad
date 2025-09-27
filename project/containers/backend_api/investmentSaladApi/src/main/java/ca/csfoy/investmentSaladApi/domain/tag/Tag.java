package ca.csfoy.investmentSaladApi.domain.tag;

public class Tag {

	private String tagId;
	private String name;
	private int hexColor;

	public Tag(String tagId, String name, int hexColor) {
		this.tagId = tagId;
		this.name = name;
		this.hexColor = hexColor;
	}

	public String getTagId() {
		return tagId;
	}

	public String getName() {
		return name;
	}

	public int getHexColor() {
		return hexColor;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		Tag incomingTag = (Tag) o;
		return tagId.equals(incomingTag.getTagId()) && name.equals(incomingTag.getName())
				&& this.hexColor == incomingTag.getHexColor();
	}
}
