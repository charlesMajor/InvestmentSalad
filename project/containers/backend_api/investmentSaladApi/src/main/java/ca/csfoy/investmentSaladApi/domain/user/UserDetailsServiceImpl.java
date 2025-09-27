package ca.csfoy.investmentSaladApi.domain.user;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	private final UserRepository repo;

	public UserDetailsServiceImpl(UserRepository repo) {
		this.repo = repo;
	}

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		CustomUser user = repo.getByEmail(email);

		return new User(user.getEmailAddress(), user.getPassword(), user.getGrantedAuthority());
	}

}
