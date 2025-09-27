package ca.csfoy.investmentSaladApi.infra.portfolio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PortfolioDao extends JpaRepository<PortfolioEntity, String> {

	@Query("SELECT p FROM PortfolioEntity p WHERE p.user.id = ?1")
	List<PortfolioEntity> getAllByUserID(String userId);

	@Query("SELECT p FROM PortfolioEntity p WHERE p.user.id = ?1 AND p.id = ?2")
	PortfolioEntity getPortfolioById(String userId, String portfolioId);
}
