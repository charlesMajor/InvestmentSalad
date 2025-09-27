package ca.csfoy.investmentSaladApi.controller.tag;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import ca.csfoy.investmentSaladApi.api.tag.FullTagDto;
import ca.csfoy.investmentSaladApi.api.tag.LightTagDto;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.InputValidationException;
import ca.csfoy.investmentSaladApi.controller.validations.ValidatorFactory;
import ca.csfoy.investmentSaladApi.controller.validations.tag.FullTagDtoCustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.tag.LightTagDtoCustomValidator;
import ca.csfoy.investmentSaladApi.domain.tag.Tag;
import ca.csfoy.investmentSaladApi.domain.tag.TagRepository;
import jakarta.validation.Validation;

@ExtendWith(MockitoExtension.class)

public class TagControllerTest {

	@Mock
	private ValidatorFactory validatorFactory;

	@Mock
	private TagRepository repo;

	@Mock
	private TagConverter converter;

	@InjectMocks
	private TagController controller;

	private final String ANY_ID = "5eca872a-62ce-3125-90bd-02ec0b6401c3";
	private final String ANY_NAME = "Test";
	private final String ANY_COLOR = "f0f0f0";
	private final String ANY_WRONG_ID = "1234";

	private final FullTagDto ANY_FULL_TAG_DTO = new FullTagDto(ANY_ID, ANY_NAME, ANY_COLOR);
	private final Tag ANY_TAG = new Tag(ANY_ID, ANY_NAME, Integer.parseInt(ANY_COLOR, 16));
	private final LightTagDto ANY_LIGHT_TAG_DTO = new LightTagDto(ANY_NAME, ANY_COLOR);

	// CREATE ///////////////////////////////////////////////
	@Test
	void canCreateTag() {
		// Arrange
		Mockito.when(validatorFactory.getLightTagDtoValidator())
				.thenReturn(new LightTagDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		Mockito.when(repo.create(ANY_TAG)).thenReturn(ANY_TAG);
		Mockito.when(converter.fromLightDtoToTag(ANY_LIGHT_TAG_DTO)).thenReturn(ANY_TAG);
		Mockito.when(converter.fromTagToDto(ANY_TAG)).thenReturn(ANY_FULL_TAG_DTO);
		// Act
		// Assert
		assertDoesNotThrow(() -> controller.createTag(ANY_LIGHT_TAG_DTO));
		Mockito.verify(validatorFactory).getLightTagDtoValidator();
		Mockito.verify(converter).fromLightDtoToTag(ANY_LIGHT_TAG_DTO);
		Mockito.verify(converter).fromTagToDto(ANY_TAG);
		Mockito.verify(repo).create(ANY_TAG);
	}

	@Test
	void canCreateTagWithInvalidName() {
		// Arrange
		Mockito.when(validatorFactory.getLightTagDtoValidator())
				.thenReturn(new LightTagDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		final LightTagDto ANY_WRONG_TAG_DTO = new LightTagDto("111111111111111111111111111111111111", ANY_COLOR);

		// Act
		// Assert
		assertThrows(InputValidationException.class, () -> controller.createTag(ANY_WRONG_TAG_DTO));
		Mockito.verifyNoInteractions(repo);
		Mockito.verifyNoInteractions(converter);
		Mockito.verify(validatorFactory).getLightTagDtoValidator();
	}

	@Test
	void canCreateTagWithBlankName() {
		// Arrange
		Mockito.when(validatorFactory.getLightTagDtoValidator())
				.thenReturn(new LightTagDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		final LightTagDto ANY_WRONG_TAG_DTO = new LightTagDto(" ", ANY_COLOR);

		// Act
		// Assert
		assertThrows(InputValidationException.class, () -> controller.createTag(ANY_WRONG_TAG_DTO));
		Mockito.verifyNoInteractions(repo);
		Mockito.verifyNoInteractions(converter);
		Mockito.verify(validatorFactory).getLightTagDtoValidator();
	}

	@Test
	void canCreateTagWithInvalidHexColor() {
		// Arrange
		Mockito.when(validatorFactory.getLightTagDtoValidator())
				.thenReturn(new LightTagDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		final LightTagDto ANY_WRONG_TAG_DTO = new LightTagDto(ANY_NAME, "AAAAAAA");

		// Act
		// Assert
		assertThrows(InputValidationException.class, () -> controller.createTag(ANY_WRONG_TAG_DTO));
		Mockito.verifyNoInteractions(repo);
		Mockito.verifyNoInteractions(converter);
		Mockito.verify(validatorFactory).getLightTagDtoValidator();
	}

	@Test
	void canCreateTagWithBlankHexColor() {
		// Arrange
		Mockito.when(validatorFactory.getLightTagDtoValidator())
				.thenReturn(new LightTagDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		final LightTagDto ANY_WRONG_TAG_DTO = new LightTagDto(ANY_NAME, " ");

		// Act
		// Assert
		assertThrows(InputValidationException.class, () -> controller.createTag(ANY_WRONG_TAG_DTO));
		Mockito.verifyNoInteractions(repo);
		Mockito.verifyNoInteractions(converter);
		Mockito.verify(validatorFactory).getLightTagDtoValidator();
	}

	// GET ///////////////////////////////////////////////
	@Test
	void canGetById() {
		// Arrange
		Mockito.when(validatorFactory.getFullTagDtoValidator())
				.thenReturn(new FullTagDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		Mockito.when(repo.getByTagId(ANY_ID)).thenReturn(ANY_TAG);
		Mockito.when(converter.fromTagToDto(ANY_TAG)).thenReturn(ANY_FULL_TAG_DTO);
		// Act
		// Assert
		assertEquals(ANY_FULL_TAG_DTO, controller.getTagById(ANY_ID));
		Mockito.verify(converter).fromTagToDto(ANY_TAG);
		Mockito.verify(repo).getByTagId(ANY_ID);
		Mockito.verify(validatorFactory).getFullTagDtoValidator();
	}

	@Test
	void canGetByIdWithInvalidIdFormat() {
		// Arrange
		Mockito.when(validatorFactory.getFullTagDtoValidator())
				.thenReturn(new FullTagDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		assertThrows(InputValidationException.class, () -> controller.getTagById(ANY_WRONG_ID));
		Mockito.verifyNoInteractions(repo);
		Mockito.verifyNoInteractions(converter);
		Mockito.verify(validatorFactory).getFullTagDtoValidator();
	}

	@Test
	void canGetByIdWithBlankId() {
		// Arrange
		Mockito.when(validatorFactory.getFullTagDtoValidator())
				.thenReturn(new FullTagDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		assertThrows(InputValidationException.class, () -> controller.getTagById(" "));
		Mockito.verifyNoInteractions(repo);
		Mockito.verifyNoInteractions(converter);
		Mockito.verify(validatorFactory).getFullTagDtoValidator();
	}

	@Test
	void canGetAllTags() {
		// Arrange
		Mockito.when(repo.getAllByUserId()).thenReturn(List.of(ANY_TAG));
		Mockito.when(converter.fromTagListToDtoList(List.of(ANY_TAG))).thenReturn(List.of(ANY_FULL_TAG_DTO));
		// Act
		// Assert
		assertEquals(List.of(ANY_FULL_TAG_DTO), controller.getUserTags());
		Mockito.verify(repo).getAllByUserId();
		Mockito.verify(converter).fromTagListToDtoList(List.of(ANY_TAG));
	}

	// UPDATE ///////////////////////////////////////////////
	@Test
	void canUpdatePortfolio() {
		// Arrange
		Mockito.when(converter.fromFullDtoToTag(ANY_FULL_TAG_DTO)).thenReturn(ANY_TAG);
		Mockito.when(validatorFactory.getFullTagDtoValidator())
				.thenReturn(new FullTagDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		Mockito.doNothing().when(repo).saveByTagId(ANY_ID, ANY_TAG);
		// Act
		// Assert
		assertDoesNotThrow(() -> controller.updateTag(ANY_ID, ANY_FULL_TAG_DTO));
		Mockito.verify(converter).fromFullDtoToTag(ANY_FULL_TAG_DTO);
		Mockito.verify(validatorFactory).getFullTagDtoValidator();
		Mockito.verify(repo).saveByTagId(ANY_ID, ANY_TAG);
	}

	@Test
	void canManageUpdateAttemptWithMatchingInvalidUUID() {
		// Arrange
		final String INVALID_UUID = "aaaa";
		final FullTagDto ANY_WRONG_TAG_DTO = new FullTagDto(INVALID_UUID, ANY_NAME, ANY_COLOR);
		Mockito.when(validatorFactory.getFullTagDtoValidator())
				.thenReturn(new FullTagDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		assertThrows(InputValidationException.class, () -> controller.updateTag(INVALID_UUID, ANY_WRONG_TAG_DTO));
		Mockito.verify(validatorFactory).getFullTagDtoValidator();
		Mockito.verifyNoInteractions(converter);
		Mockito.verifyNoInteractions(repo);
	}
	@Test
	void canManageUpdateAttemptWithMatchingNullId() {
		// Arrange
		final String INVALID_UUID = null;
		final FullTagDto ANY_WRONG_TAG_DTO = new FullTagDto(INVALID_UUID, ANY_NAME, ANY_COLOR);
		Mockito.when(validatorFactory.getFullTagDtoValidator())
				.thenReturn(new FullTagDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		assertThrows(InputValidationException.class, () -> controller.updateTag(INVALID_UUID, ANY_WRONG_TAG_DTO));
		Mockito.verify(validatorFactory).getFullTagDtoValidator();
		Mockito.verifyNoInteractions(converter);
		Mockito.verifyNoInteractions(repo);
	}

	@Test
	void canManageUpdateAttemptWithUnmatichinValidUUID() {
		// Arrange
		final String ANY_UUID = "5eca111a-62ce-3125-90bd-02ec0b6401c3";
		final FullTagDto ANY_WRONG_TAG_DTO = new FullTagDto(ANY_UUID, ANY_NAME, ANY_COLOR);
		Mockito.when(validatorFactory.getFullTagDtoValidator())
				.thenReturn(new FullTagDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));
		// Act
		// Assert
		assertThrows(InputValidationException.class, () -> controller.updateTag(ANY_ID, ANY_WRONG_TAG_DTO));
		Mockito.verify(validatorFactory).getFullTagDtoValidator();
		Mockito.verifyNoInteractions(converter);
		Mockito.verifyNoInteractions(repo);
	}

	// DELETE ///////////////////////////////////////////////
	@Test
	void canDeletePortfolio() {
		// Arrange
		Mockito.when(validatorFactory.getFullTagDtoValidator())
		.thenReturn(new FullTagDtoCustomValidator(Validation.buildDefaultValidatorFactory().getValidator()));		
		Mockito.doNothing().when(repo).deleteByTagId(ANY_ID);
		// Act
		// Assert
		assertDoesNotThrow(()->controller.deleteTag(ANY_ID));
		Mockito.verify(validatorFactory).getFullTagDtoValidator();
		Mockito.verifyNoInteractions(converter);
	}

}
