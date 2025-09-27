package ca.csfoy.investmentSaladApi.infra.user;

import org.springframework.stereotype.Component;

import ca.csfoy.investmentSaladApi.domain.Roles;
import ca.csfoy.investmentSaladApi.domain.user.CustomUser;
import ca.csfoy.investmentSaladApi.domain.user.Role;
import ca.csfoy.investmentSaladApi.infra.role.RoleEntity;

@Component
public class UserEntityConverter {

	public UserEntityConverter() {
	}

	public UserEntity fromCustomUserToUserEntity(CustomUser user) {
		return new UserEntity(user.getId(), user.getUsername(), user.getEmailAddress(), user.getPassword(),
				fromRoleToRoleEntity(user.getRole()));

	}

	public CustomUser fromUserEntityToCustomUser(UserEntity user) {
		return new CustomUser(user.getId(), user.getUsername(), user.getEmail(), user.getPassword(),
				fromRoleEntityToRole(user.getRole()));
	}

	public RoleEntity fromRoleToRoleEntity(Role role) {
		return new RoleEntity(role.getIdentifier(), role.getRoleName());
	}

	public Role fromRoleEntityToRole(RoleEntity role) {
		Roles convertedRole;
		if (role.getId().toString().equals("2"))
			convertedRole = Roles.USER;
		else
			convertedRole = Roles.ADMIN;
		return new Role(role.getId(), convertedRole);
	}
}
