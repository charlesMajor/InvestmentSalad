package ca.csfoy.investmentSaladApi.infra.tag;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;

import ca.csfoy.investmentSaladApi.domain.Roles;
import ca.csfoy.investmentSaladApi.domain.tag.Tag;
import ca.csfoy.investmentSaladApi.infra.role.RoleEntity;
import ca.csfoy.investmentSaladApi.infra.user.UserEntity;

public class TagEntityConverterTest {

	final TagEntityConverter converter = new TagEntityConverter();
	private final String ANY_ID = "5eca872a-62ce-3125-90bd-02ec0b6401c3";
	private final String ANY_NAME = "Test";
	private final String ANY_COLOR = "f0f0f0";
	private final int ANY_CONVERTED_HEX_COLOR = 15790320;

	final String ANY_USER_ID = "35553A53-6ce1-425d-96ab-c854631d04f8";

	final UserEntity ANY_USER_ENTITY = new UserEntity(ANY_USER_ID, "account", "anye-mail@mail.com",
			"$2a$10$60kkWBQaqP9GVUvJTmIbZ.j10hMjPE93NSgLPjqrv6muF1OPKZxXe", new RoleEntity("1", Roles.ADMIN.name()));

	private final Tag ANY_TAG = new Tag(ANY_ID, ANY_NAME, Integer.parseInt(ANY_COLOR, 16));
	private final TagEntity ANY_TAG_ENTITY = new TagEntity(ANY_ID, ANY_USER_ENTITY, ANY_NAME, ANY_CONVERTED_HEX_COLOR);

	@Test
	void canConvertFromTagToEntity() {
		// Arrange
		// Act
		// Assert
		assertEquals(ANY_TAG_ENTITY, converter.fromTagToEntity(ANY_TAG, ANY_USER_ENTITY));
	}
	@Test
	void canConvertFromEntityToTag() {
		// Arrange
		// Act
		// Assert
		assertEquals(ANY_TAG, converter.fromEntityToTag(ANY_TAG_ENTITY));
	}
	@Test
	void canConvertFromEntityListToTagList() {
		// Arrange
		// Act
		// Assert
		assertEquals(List.of(ANY_TAG), converter.fromEntityListToTagList(List.of(ANY_TAG_ENTITY)));
	}
}
