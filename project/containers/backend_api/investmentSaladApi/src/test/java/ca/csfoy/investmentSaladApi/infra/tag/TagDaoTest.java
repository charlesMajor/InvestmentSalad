package ca.csfoy.investmentSaladApi.infra.tag;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import ca.csfoy.investmentSaladApi.infra.role.RoleEntity;
import ca.csfoy.investmentSaladApi.infra.user.UserEntity;

@DataJpaTest
@ExtendWith(SpringExtension.class)
@ExtendWith(MockitoExtension.class)
public class TagDaoTest {
	final TagEntityConverter converter = new TagEntityConverter();

	@Autowired
	TagDao dao;

	private final String ANY_SEEDED_USER_ID = "5eca872a-62ce-3125-90bd-02ec0b6401c3";
	private final String ANY_SEEDED_ADMIN_ID = "5eca874a-62ce-3125-90bd-02ec0b6401c3";

	private final UserEntity ANY_ADMIN_ENTITY = new UserEntity(ANY_SEEDED_ADMIN_ID, "Admin", "test.admin@hotmail.com",
			"$2a$10$60kkWBQaqP9GVUvJTmIbZ.j10hMjPE93NSgLPjqrv6muF1OPKZxXe", new RoleEntity("1", "ADMIN"));
	private final UserEntity ANY_USER_ENTITY = new UserEntity(ANY_SEEDED_USER_ID, "User", "test.user@hotmail.com",
			"$2a$10$60kkWBQaqP9GVUvJTmIbZ.j10hMjPE93NSgLPjqrv6muF1OPKZxXe", new RoleEntity("2", "USER"));

	private final TagEntity ANY_SEED_TAG_ENTITY_USER_1 = new TagEntity("57c31e9d-1b15-4686-8114-38de48ad887e",
			ANY_USER_ENTITY, "Crypto tag", 16711680);
	private final TagEntity ANY_SEED_TAG_ENTITY_USER_2 = new TagEntity("02b8144e-2bb7-4fc2-b132-135c560bbe13",
			ANY_USER_ENTITY, "Celi tag", 65280);

	private final TagEntity ANY_SEED_TAG_ENTITY_USER_3 = new TagEntity("fee429f7-9f49-44ee-bf09-9923aef937fd",
			ANY_USER_ENTITY, "Stock tag", 65880);
	private final TagEntity ANY_SEED_TAG_ENTITY_USER_4 = new TagEntity("14789068-a5b4-4a15-9db5-066619aea0a5",
			ANY_USER_ENTITY, "Ressource tag", 52880);

	private final TagEntity ANY_SEED_TAG_ENTITY_ADMIN_1 = new TagEntity("b3d48527-dd7d-43a3-b7f5-4293d28c7d1c",
			ANY_ADMIN_ENTITY, "Ethereum tag", 16711680);
	private final TagEntity ANY_SEED_TAG_ENTITY_ADMIN_2 = new TagEntity("a4dc3c55-9cb3-4a5a-8e2e-2ced5abb8ec6",
			ANY_ADMIN_ENTITY, "REER tag", 633330);
	private final TagEntity ANY_SEED_TAG_ENTITY_ADMIN_3 = new TagEntity("75073d53-dba5-4bdb-8fcc-802fde7d1d88",
			ANY_ADMIN_ENTITY, "Microsoft tag", 965435);
	private final TagEntity ANY_SEED_TAG_ENTITY_ADMIN_4 = new TagEntity("1ca952af-0c38-4754-abf9-08bbd35e018f",
			ANY_ADMIN_ENTITY, "GOLD tag", 323455);

	@Test
	void canGetAllByAdminId() {
		// Arrange
		// Act
		// Assert
		assertEquals(List.of(ANY_SEED_TAG_ENTITY_ADMIN_1, ANY_SEED_TAG_ENTITY_ADMIN_2, ANY_SEED_TAG_ENTITY_ADMIN_3,
				ANY_SEED_TAG_ENTITY_ADMIN_4), dao.getAllByUserID(ANY_SEEDED_ADMIN_ID));
	}

	@Test
	void canGetAllByUserId() {
		// Arrange
		// Act
		// Assert
		assertEquals(List.of(ANY_SEED_TAG_ENTITY_USER_1, ANY_SEED_TAG_ENTITY_USER_2,ANY_SEED_TAG_ENTITY_USER_3, ANY_SEED_TAG_ENTITY_USER_4),
				dao.getAllByUserID(ANY_SEEDED_USER_ID));
	}

	@Test
	void canGetByNameAndColorForAdmin() {
		// Arrange
		// Act
		// Assert
		assertEquals(List.of(ANY_SEED_TAG_ENTITY_USER_1), dao.getByNameAndColor(ANY_SEED_TAG_ENTITY_USER_1.getName(),
				ANY_SEED_TAG_ENTITY_USER_1.getHexColor(), ANY_SEEDED_USER_ID));
	}

	@Test
	void canGetByNameAndColorForUser() {
		// Arrange
		// Act
		// Assert
		assertEquals(List.of(ANY_SEED_TAG_ENTITY_USER_4), dao.getByNameAndColor(ANY_SEED_TAG_ENTITY_USER_4.getName(),
				ANY_SEED_TAG_ENTITY_USER_4.getHexColor(), ANY_SEEDED_USER_ID));
	}

	@Test
	void canGetByNameAndColorForInvalidUser() {
		// Arrange
		// Act
		// Assert
		assertEquals(List.of(), dao.getByNameAndColor(ANY_SEED_TAG_ENTITY_USER_4.getName(),
				ANY_SEED_TAG_ENTITY_USER_4.getHexColor(), ANY_SEEDED_ADMIN_ID));
	}
}
