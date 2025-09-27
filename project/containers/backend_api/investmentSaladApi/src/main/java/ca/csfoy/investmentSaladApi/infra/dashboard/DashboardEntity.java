package ca.csfoy.investmentSaladApi.infra.dashboard;

import java.util.Set;

import ca.csfoy.investmentSaladApi.infra.user.UserEntity;
import ca.csfoy.investmentSaladApi.infra.widget.distribution.DistributionWidgetEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class DashboardEntity {
	@Id
	private String id;
	@ManyToOne
	@JoinColumn(name = "user_Id")
	private UserEntity user;

	@OneToMany(mappedBy = "dashboard", cascade = CascadeType.ALL)
	private Set<DistributionWidgetEntity> widgets;

	public DashboardEntity() {
	}

	public DashboardEntity(String id, UserEntity user) {
		this.id = id;
		this.user = user;
	}

	public String getId() {
		return id;
	}

	public UserEntity getUser() {
		return user;
	}

	public Set<DistributionWidgetEntity> getWidgets() {
		return widgets;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		DashboardEntity dashboardEntity = (DashboardEntity) o;
		return id.equals(dashboardEntity.id) && user.equals(dashboardEntity.user);
	}
}
