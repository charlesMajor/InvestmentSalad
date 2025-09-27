package ca.csfoy.investmentSaladApi.domain.user;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

public class CustomUser {

	private String id;
	private String username;
	private String emailAddress;
	private String password;
	private Role role;

	public CustomUser(String id, String username, String emailAddress, String password, Role role) {
		this.id = id;
		this.username = username;
		this.emailAddress = emailAddress;
		this.password = password;
		this.role = role;
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

	public Role getRole() {
		return role;
	}

	public boolean isRoleAdmin() {
		return role.getRoleName().equalsIgnoreCase("ADMIN");
	}

	public Collection<GrantedAuthority> getGrantedAuthority() {
		Collection<GrantedAuthority> authorities = new ArrayList<>();
		if (this.isRoleAdmin()) {
			authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
		} else {
			authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
		}
		return authorities;
	}

	@Override
	public boolean equals(Object object) {
		if (object == null || getClass() != object.getClass())
			return false;

		CustomUser receivedItem = (CustomUser) object;

		return receivedItem.id.equals(this.id) && receivedItem.username.equals(this.username)
				&& receivedItem.emailAddress.equals(this.emailAddress) && receivedItem.password.equals(this.password)
				&& receivedItem.role.equals(this.role);
	}
}
