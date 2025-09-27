package ca.csfoy.investmentSaladApi.domain.user;

import ca.csfoy.investmentSaladApi.domain.UpdateRepository;

public interface UserRepository extends UpdateRepository<String, CustomUser> {

	CustomUser getByEmail(String email);
}
