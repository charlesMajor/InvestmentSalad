package ca.csfoy.investmentSaladApi.infra.tag.portfolio_tag;

import java.util.Objects;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;

@Entity
public class PortfolioTagEntity {

	@EmbeddedId
	private PortfolioTagId id;

	public PortfolioTagEntity() {
	}

	public PortfolioTagEntity(PortfolioTagId portfolioTagId) {
		this.id = portfolioTagId;
	}

	public PortfolioTagId getId() {
		return id;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		PortfolioTagEntity incomingEntity = (PortfolioTagEntity) o;
		return id.equals(incomingEntity.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

}
