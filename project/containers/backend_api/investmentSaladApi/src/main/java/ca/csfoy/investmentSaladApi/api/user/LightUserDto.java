package ca.csfoy.investmentSaladApi.api.user;

import ca.csfoy.investmentSaladApi.api.validations.ValidName;
import ca.csfoy.investmentSaladApi.api.validations.ValidUUID;

public class LightUserDto {

	@ValidUUID
	private final String id;
	@ValidName(min = 3)
	private final String username;

	public LightUserDto(String id, String username) {
		this.id = id;
		this.username = username;
	}

	public String getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	@Override
	public boolean equals(Object object) {
		if (object == null || getClass() != object.getClass())
			return false;

		LightUserDto dto = (LightUserDto) object;

		return dto.username.equals(this.username) && dto.id.equals(this.id);
	}
}