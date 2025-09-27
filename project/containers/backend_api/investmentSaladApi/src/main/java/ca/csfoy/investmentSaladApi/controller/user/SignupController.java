package ca.csfoy.investmentSaladApi.controller.user;

import org.springframework.web.bind.annotation.RestController;

import ca.csfoy.investmentSaladApi.api.user.SignupResource;
import ca.csfoy.investmentSaladApi.api.user.TokenDto;
import ca.csfoy.investmentSaladApi.api.user.UserDto;
import ca.csfoy.investmentSaladApi.controller.dashboard.DashboardConverter;
import ca.csfoy.investmentSaladApi.controller.exception.ErrorMessageLabel;
import ca.csfoy.investmentSaladApi.controller.validations.CustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.ValidatorFactory;
import ca.csfoy.investmentSaladApi.domain.dashboard.DashboardRepository;
import ca.csfoy.investmentSaladApi.domain.user.CustomUser;
import ca.csfoy.investmentSaladApi.domain.user.UserRepository;
import ca.csfoy.investmentSaladApi.security.JwtTokenManager;

@RestController
public class SignupController implements SignupResource {

	private final UserRepository repo;
	private final DashboardRepository dashboardRepo;
	private final DashboardConverter dashboardConverter;
	private final JwtTokenManager tokenManager;
	private final UserConverter converter;
	private final ValidatorFactory validatorFactory;

	public SignupController(UserRepository repo, DashboardRepository dashboardRepo,
			DashboardConverter dashboardConverter, JwtTokenManager tokenManager, UserConverter converter,
			ValidatorFactory validatorFactory) {
		super();
		this.repo = repo;
		this.dashboardRepo = dashboardRepo;
		this.dashboardConverter = dashboardConverter;
		this.tokenManager = tokenManager;
		this.converter = converter;
		this.validatorFactory = validatorFactory;
	}

	@Override
	public TokenDto signUpUser(UserDto user) {
		CustomValidator<UserDto, String> validator = validatorFactory.getUserDtoValidator();
		validator.validate(user);
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		repo.create(converter.fromUserDtoToUser(user));
		CustomUser userDetails = repo.getByEmail(user.getEmailAddress());
		String token = tokenManager.createToken(userDetails.getEmailAddress(), userDetails.getRole(),
				userDetails.getId());
		dashboardRepo.initializeDashboard(dashboardConverter.fromDtoToDashboard(), userDetails.getId());
		return new TokenDto(token);
	}
}
