package ca.csfoy.investmentSaladApi.domain;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import ca.csfoy.investmentSaladApi.security.UserPrincipal;

public abstract class TokenUtils {

	public String getUserIdFromToken() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String userId = ((UserPrincipal) authentication.getPrincipal()).getUserId();
		return userId;
	}
}
