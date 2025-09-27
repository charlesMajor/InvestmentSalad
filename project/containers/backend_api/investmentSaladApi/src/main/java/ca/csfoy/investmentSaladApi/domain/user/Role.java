package ca.csfoy.investmentSaladApi.domain.user;

import java.util.Objects;

import ca.csfoy.investmentSaladApi.domain.Roles;

public class Role {

	private String identifier;
	private Roles role;

	public final static String ADMIN_ROLE_IDENTIFIER = "1";
	public final static String USER_ROLE_IDENTIFIER = "2";

	public Role(String identifier, Roles role) {

		this.identifier = identifier;
		this.role = role;
	}

	public String getIdentifier() {
		return identifier;
	}

	public String getRoleName() {
		return role.name();
	}

	@Override
	public int hashCode() {
		return Objects.hash(identifier, role);
	}

	@Override
	public boolean equals(Object object) {
		if (object == this) {
			return true;
		}

		if (object instanceof Role) {
			Role that = (Role) object;

			return Objects.equals(this.identifier, that.identifier) && Objects.equals(this.role, that.role);
		}

		return false;
	}
}
