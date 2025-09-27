package ca.csfoy.investmentSaladApi.infra.widget;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ca.csfoy.investmentSaladApi.infra.dashboard.DashboardEntity;

public interface WidgetDao extends JpaRepository<WidgetEntity, String> {

	@Query("SELECT w.id FROM DistributionWidgetEntity w WHERE w.dashboard = :dashboard " + "UNION "
			+ "SELECT n.id FROM NetWorthWidgetEntity n WHERE n.dashboard = :dashboard " + "UNION "
			+ "SELECT a.id FROM WatchListWidgetEntity a WHERE a.dashboard = :dashboard")
	List<String> getAllByUserId(@Param("dashboard") DashboardEntity dashboard);

}
