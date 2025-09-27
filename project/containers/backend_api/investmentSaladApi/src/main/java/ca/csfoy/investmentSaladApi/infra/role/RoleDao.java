package ca.csfoy.investmentSaladApi.infra.role;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleDao extends JpaRepository<RoleEntity, String> {

}
