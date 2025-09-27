package ca.csfoy.investmentSaladApi.infra.tag;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;

@Embeddable
public class TagId implements Serializable {
	private static final long serialVersionUID = 1L;
	public String id;
	public String userEntity;

	public TagId(String id, String userId) {
		this.id = id;
		this.userEntity = userId;
	}

	public TagId() {
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		TagId tagId = (TagId) o;
		return id.equals(tagId.id) && userEntity.equals(tagId.userEntity);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, userEntity);
	}

	@Override
	public String toString() {
		return "Id: " + id + "User id: " + userEntity;
	}
}
