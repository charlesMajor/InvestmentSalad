package ca.csfoy.investmentSaladApi.infra.tag.portfolio_tag;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PortfolioTagDao extends JpaRepository<PortfolioTagEntity, PortfolioTagId> {

	@Query(value = "SELECT * FROM portfolio_tag_entity WHERE portfolio_id = ?1 AND user_id = ?2", nativeQuery = true)
	List<PortfolioTagEntity> getAllByPortfolioId(String portofolioId, String userId);

	@Query(value = "SELECT tag_id FROM portfolio_tag_entity WHERE portfolio_id = ?1 AND user_id = ?2", nativeQuery = true)
	List<String> getAllIdByPortfolioId(String portofolioId, String userId);
}
