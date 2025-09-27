package ca.csfoy.investmentSaladApi.controller.user;

import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import ca.csfoy.investmentSaladApi.api.user.FullUserDto;
import ca.csfoy.investmentSaladApi.api.user.LightUserDto;
import ca.csfoy.investmentSaladApi.api.user.UserDto;
import ca.csfoy.investmentSaladApi.domain.Roles;
import ca.csfoy.investmentSaladApi.domain.user.CustomUser;
import ca.csfoy.investmentSaladApi.domain.user.Role;

@Component
public class UserConverter {

	private final PasswordEncoder passwordEncoder;

	public UserConverter(PasswordEncoder passwordEncoder) {
		this.passwordEncoder = passwordEncoder;
	}

	public LightUserDto fromUserToLightDto(CustomUser user) {
		return new LightUserDto(user.getId(), user.getUsername());
	}

	public FullUserDto fromUserToFullUserDto(CustomUser user) {
		return new FullUserDto(user.getId(), user.getUsername(), user.getEmailAddress(), "******");
	}

	public CustomUser fromLightUserDtoToUser(LightUserDto user) {
		return new CustomUser(user.getId(), user.getUsername(), null, null, new Role("2", Roles.USER));
	}

	public CustomUser fromFullDtoUserToUser(FullUserDto user) {
		return new CustomUser(user.getId(), user.getUsername(), user.getEmailAddress(),
				passwordEncoder.encode(user.getPassword()), new Role("2", Roles.USER));
	}

	public CustomUser fromUserDtoToUser(UserDto user) {
		return new CustomUser(UUID.randomUUID().toString(), user.getUsername(), user.getEmailAddress(),
				passwordEncoder.encode(user.getPassword()), new Role("2", Roles.USER));
	}

}
