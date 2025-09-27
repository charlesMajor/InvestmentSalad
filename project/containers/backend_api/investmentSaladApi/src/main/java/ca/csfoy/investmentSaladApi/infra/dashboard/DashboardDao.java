package ca.csfoy.investmentSaladApi.infra.dashboard;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DashboardDao extends JpaRepository<DashboardEntity, String> {
	@Query(nativeQuery = true, value = "SELECT * FROM dashboard_entity WHERE user_id = ?1 LIMIT 1")
	DashboardEntity getOneByUserID(String userId);

	@Query(nativeQuery = true, value = "SELECT * FROM dashboard_entity WHERE id = ?1 AND user_id = ?2 LIMIT 1")
	DashboardEntity getOneByDashboardIdAndUserID(String dashboardId, String userId);
}
