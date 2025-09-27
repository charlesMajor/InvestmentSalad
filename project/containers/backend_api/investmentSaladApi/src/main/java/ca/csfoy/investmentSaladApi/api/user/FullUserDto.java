package ca.csfoy.investmentSaladApi.api.user;

import ca.csfoy.investmentSaladApi.api.validations.ValidEmail;
import ca.csfoy.investmentSaladApi.api.validations.ValidName;
import ca.csfoy.investmentSaladApi.api.validations.ValidPassword;
import ca.csfoy.investmentSaladApi.api.validations.ValidUUID;

public class FullUserDto {

	@ValidUUID
	private final String id;
	@ValidName(min = 3)
	private final String username;
	@ValidEmail
	private final String emailAddress;
	@ValidPassword
	private final String password;

	public FullUserDto(String id, String username, String emailAddress, String password) {
		this.id = id;
		this.username = username;
		this.emailAddress = emailAddress;
		this.password = password;
	}

	public String getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public String getPassword() {
		return password;
	}

	@Override
	public boolean equals(Object object) {
		if (object == null || getClass() != object.getClass())
			return false;
		FullUserDto dto = (FullUserDto) object;
		return dto.id.equals(this.id) && dto.username.equals(this.username)
				&& dto.emailAddress.equals(this.emailAddress) && dto.password.equals(this.password);
	}
}
