package ca.csfoy.investmentSaladApi.infra.role;

import java.util.Set;

import ca.csfoy.investmentSaladApi.infra.user.UserEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class RoleEntity {

	@Id
	private String id;

	@Column(length = 25)
	private String roleName;

	@OneToMany(targetEntity = UserEntity.class, mappedBy = "role", cascade = CascadeType.ALL)
	private Set<UserEntity> users;

	public RoleEntity() {

	}

	public RoleEntity(String identifier, String roleName) {
		this.id = identifier;
		this.roleName = roleName;
	}

	public String getId() {
		return id;
	}

	public String getRoleName() {
		return roleName;
	}

	public Set<UserEntity> getUsers() {
		return users;
	}

	@Override
	public boolean equals(Object object) {
		if (object == null || getClass() != object.getClass())
			return false;

		RoleEntity receivedEntity = (RoleEntity) object;
		return (receivedEntity.id.equals(this.id) && receivedEntity.roleName.equals(this.roleName));
	}
}
