package ca.csfoy.investmentSaladApi.api.user;

import ca.csfoy.investmentSaladApi.api.validations.ValidEmail;
import ca.csfoy.investmentSaladApi.api.validations.ValidName;
import ca.csfoy.investmentSaladApi.api.validations.ValidPassword;

public class UserDto {

	@ValidName(min = 3)
	private final String username;
	@ValidEmail
	private final String emailAddress;
	@ValidPassword
	private final String password;

	public UserDto(String username, String emailAddress, String password) {
		this.username = username;
		this.emailAddress = emailAddress;
		this.password = password;
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
		UserDto dto = (UserDto) object;
		return dto.username.equals(this.username) && dto.emailAddress.equals(this.emailAddress)
				&& dto.password.equals(this.password);
	}
}
