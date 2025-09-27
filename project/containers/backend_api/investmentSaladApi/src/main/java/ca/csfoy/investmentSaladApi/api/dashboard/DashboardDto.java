package ca.csfoy.investmentSaladApi.api.dashboard;

import ca.csfoy.investmentSaladApi.api.validations.ValidUUID;

public class DashboardDto {
	@ValidUUID
	String id;

	public DashboardDto(String id) {
		this.id = id;
	}

	public String getId() {
		return id;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		DashboardDto dto = (DashboardDto) o;
		return dto.id == id;
	}

}
