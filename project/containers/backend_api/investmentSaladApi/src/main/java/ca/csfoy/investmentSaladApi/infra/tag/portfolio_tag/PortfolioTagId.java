package ca.csfoy.investmentSaladApi.infra.tag.portfolio_tag;

import java.io.Serializable;
import java.util.Objects;

import ca.csfoy.investmentSaladApi.infra.portfolio.PortfolioEntity;
import ca.csfoy.investmentSaladApi.infra.tag.TagEntity;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;

@Embeddable
public class PortfolioTagId implements Serializable {

	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name = "PORTFOLIO_ID")
	private PortfolioEntity portfolioEntity;

	@ManyToOne
	@JoinColumns({ @JoinColumn(name = "TAG_ID", referencedColumnName = "ID"),
			@JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID") })
	private TagEntity tagEntity;

	public PortfolioTagId(PortfolioEntity portfolioEntity, TagEntity tagEntity) {
		this.portfolioEntity = portfolioEntity;
		this.tagEntity = tagEntity;
	}

	public PortfolioTagId() {
	}

	public TagEntity getTagEntity() {
		return tagEntity;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public PortfolioEntity getPortfolioEntity() {
		return portfolioEntity;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		PortfolioTagId incomingId = (PortfolioTagId) o;
		return portfolioEntity.equals(incomingId.portfolioEntity) && tagEntity.equals(incomingId.tagEntity);
	}

	@Override
	public int hashCode() {
		return Objects.hash(portfolioEntity, tagEntity);
	}

}
