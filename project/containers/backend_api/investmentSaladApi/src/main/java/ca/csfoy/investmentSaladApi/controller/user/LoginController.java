package ca.csfoy.investmentSaladApi.controller.user;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.RestController;

import ca.csfoy.investmentSaladApi.api.user.LoginResource;
import ca.csfoy.investmentSaladApi.api.user.TokenDto;
import ca.csfoy.investmentSaladApi.api.user.UserCredentialsDto;
import ca.csfoy.investmentSaladApi.domain.user.CustomUser;
import ca.csfoy.investmentSaladApi.domain.user.UserRepository;
import ca.csfoy.investmentSaladApi.security.JwtTokenManager;


@RestController
public class LoginController implements LoginResource {

    private final UserRepository repo;
    private final AuthenticationManager authManager;
    private final JwtTokenManager tokenManager;

    public LoginController(UserRepository repo, AuthenticationManager authManager, JwtTokenManager tokenManager) {
        this.repo = repo;
        this.authManager = authManager;
        this.tokenManager = tokenManager;
    }

    @Override
    public TokenDto loginUser(UserCredentialsDto user) 
    {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmailAddress(), user.getPassword()));
        CustomUser userDetails = repo.getByEmail(user.getEmailAddress());
        String token = tokenManager.createToken(userDetails.getEmailAddress(), userDetails.getRole(), userDetails.getId());
        return new TokenDto(token);
    }
}
