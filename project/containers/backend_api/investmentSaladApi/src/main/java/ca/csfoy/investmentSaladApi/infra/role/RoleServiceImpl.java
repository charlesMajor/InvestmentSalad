package ca.csfoy.investmentSaladApi.infra.role;

import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {

	private final RoleDao roleDao;
	private final RoleEntity adminRole = new RoleEntity("1", "ADMIN");
	private final RoleEntity userRole = new RoleEntity("2", "USER");

	public RoleServiceImpl(RoleDao roleDao) {
		this.roleDao = roleDao;
	}

	public void ensureSeeded() {

		if (roleDao.count() == 0) {
			roleDao.save(adminRole);
			roleDao.save(userRole);
		}
	}
}
