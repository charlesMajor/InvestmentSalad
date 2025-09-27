package ca.csfoy.investmentSaladApi.infra.user;

import java.util.HashSet;
import java.util.Set;

import ca.csfoy.investmentSaladApi.infra.portfolio.PortfolioEntity;
import ca.csfoy.investmentSaladApi.infra.role.RoleEntity;
import ca.csfoy.investmentSaladApi.infra.tag.TagEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class UserEntity {

	@Id
	private String id;
	@Column(length = 50, nullable = false)
	private String username;
	@Column(length = 70, nullable = false)
	private String email;
	@Column(length = 70, nullable = false)
	private String password;
	@ManyToOne
	@JoinColumn(name = "role_id")
	private RoleEntity role;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private Set<PortfolioEntity> portfolios = new HashSet<>();
	@OneToMany(mappedBy = "userEntity", cascade = CascadeType.ALL)
	private Set<TagEntity> tags = new HashSet<>();

	UserEntity() {
	}

	public UserEntity(String id, String username, String emailAddress, String password, RoleEntity role) {
		this.id = id;
		this.username = username;
		this.email = emailAddress;
		this.password = password;
		this.role = role;
	}

	public String getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}

	public RoleEntity getRole() {
		return role;
	}

	public Set<PortfolioEntity> getPortfolios() {
		return portfolios;
	}

	public Set<TagEntity> getTags() {
		return tags;
	}

	@Override
	public boolean equals(Object object) {
		if (object == null || getClass() != object.getClass())
			return false;

		UserEntity receivedEntity = (UserEntity) object;
		return (receivedEntity.id.equals(this.id) && receivedEntity.username.equals(this.username)
				&& receivedEntity.email.equals(this.email) && receivedEntity.password.equals(this.password));
	}
}
