package ca.csfoy.investmentSaladApi.api.user;

public class UserCredentialsDto {

	private final String emailAddress;
	private final String password;

	public UserCredentialsDto(String emailAddress, String password) {
		this.emailAddress = emailAddress;
		this.password = password;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public String getPassword() {
		return password;
	}

}
