package ca.csfoy.investmentSaladApi.security;

import java.security.Principal;

public class UserPrincipal implements Principal {

	private final String id;
	private final String username;

	public UserPrincipal(String id, String username) {
		this.id = id;
		this.username = username;
	}

	@Override
	public String getName() {
		return username;
	}

	public String getUserId() {
		return id;
	}
}