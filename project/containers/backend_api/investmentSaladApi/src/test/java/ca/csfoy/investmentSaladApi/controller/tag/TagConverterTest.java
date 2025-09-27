package ca.csfoy.investmentSaladApi.controller.tag;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;

import ca.csfoy.investmentSaladApi.api.tag.FullTagDto;
import ca.csfoy.investmentSaladApi.api.tag.LightTagDto;
import ca.csfoy.investmentSaladApi.domain.tag.Tag;

public class TagConverterTest {

	private final TagConverter converter = new TagConverter();

	private final String ANY_ID = "5eca872a-62ce-3125-90bd-02ec0b6401c3";
	private final String ANY_NAME = "Test";
	private final String ANY_COLOR = "f0f0f0";
	private final int ANY_CONVERTED_HEX_COLOR = 15790320;

	private final FullTagDto ANY_FULL_TAG_DTO = new FullTagDto(ANY_ID, ANY_NAME, ANY_COLOR);
	private final Tag ANY_TAG = new Tag(ANY_ID, ANY_NAME, ANY_CONVERTED_HEX_COLOR);
	private final LightTagDto ANY_LIGHT_TAG_DTO = new LightTagDto(ANY_NAME, ANY_COLOR);

	@Test
	void canConvertFromLightDtoToTag() {
		// Arrange
		final Tag CONVERTED_TAG = converter.fromLightDtoToTag(ANY_LIGHT_TAG_DTO);
		final Tag EXPECTED_TAG = new Tag(CONVERTED_TAG.getTagId(), ANY_LIGHT_TAG_DTO.getName(),
				ANY_CONVERTED_HEX_COLOR);
		// Act
		// Assert
		assertEquals(EXPECTED_TAG, CONVERTED_TAG);
	}

	@Test
	void canConvertFromFullTagDtoToTag() {
		// Arrange
		// Act
		// Assert
		assertEquals(ANY_TAG, converter.fromFullDtoToTag(ANY_FULL_TAG_DTO));
	}

	@Test
	void canConvertFromTagToFullDto() {
		// Arrange
		// Act
		// Assert
		assertEquals(ANY_FULL_TAG_DTO, converter.fromTagToDto(ANY_TAG));
	}

	@Test
	void canConvertFromTagListToDtoList() {
		// Arrange
		// Act
		// Assert
		assertEquals(List.of(ANY_FULL_TAG_DTO), converter.fromTagListToDtoList(List.of(ANY_TAG)));
	}
}
