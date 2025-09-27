package ca.csfoy.investmentSaladApi.api.tag;


import java.util.List;

import org.junit.jupiter.api.Assertions;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;

import ca.csfoy.investmentSaladApi.controller.tag.TagController;
import ca.csfoy.investmentSaladApi.controller.tag.TagConverter;

@SpringBootTest
@AutoConfigureMockMvc
@WithUserDetails("test.admin@hotmail.com")
public class TagResourceTest {

	@Autowired
	private MockMvc mockMvc;
	@Autowired
	private ObjectMapper objectMapper;

	@MockBean
	private TagController controller;

	@MockBean
	private TagConverter converter;
	
	private final String PATH_TO_TEST = TagRessource.RESOURCE_PATH;
	private final String CONTENT_TYPE = "application/json";

	private final String ANY_ID = "5eca872a-62ce-3125-90bd-02ec0b6401c3";
	private final String ANY_NAME = "Test";
	private final String ANY_COLOR = "f0f0f0";
	private final String PATH_WITH_ID = "/" + ANY_ID;

	private final FullTagDto ANY_FULL_TAG_DTO = new FullTagDto(ANY_ID, ANY_NAME, ANY_COLOR);
	private final LightTagDto ANY_LIGHT_TAG_DTO = new LightTagDto(ANY_NAME, ANY_COLOR);

	// CREATE ///////////////////////////////////////////////
	@Test
	void canCreateTagAndReturn201Created() throws Exception {
		// Arrange
		Mockito.when(controller.createTag(ANY_LIGHT_TAG_DTO)).thenReturn(ANY_FULL_TAG_DTO);
		// Act
		mockMvc.perform(MockMvcRequestBuilders.post(PATH_TO_TEST).contentType(CONTENT_TYPE)
				.content(objectMapper.writeValueAsString(ANY_LIGHT_TAG_DTO)))
				.andExpect(MockMvcResultMatchers.status().isCreated());
		// Assert
		Mockito.verify(controller).createTag(ANY_LIGHT_TAG_DTO);
		Mockito.verifyNoInteractions(converter);
	}

	// GET ///////////////////////////////////////////////
	@Test
	void canGetByIdAndReturn200OK() throws Exception {
		// Arrange
		Mockito.when(controller.getTagById(ANY_ID)).thenReturn(ANY_FULL_TAG_DTO);
		// Act
		MvcResult result = mockMvc
				.perform(MockMvcRequestBuilders.get(PATH_TO_TEST + PATH_WITH_ID).contentType(CONTENT_TYPE))
				.andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
		// Assert
		String responseAsString = result.getResponse().getContentAsString();
		String expectedBody = objectMapper.writeValueAsString(ANY_FULL_TAG_DTO);
		Assertions.assertEquals(expectedBody, responseAsString);
		Mockito.verify(controller).getTagById(ANY_ID);
		Mockito.verifyNoInteractions(converter);
	}
	@Test
	void canGetAllAndReturn200OK() throws Exception {
		// Arrange
		Mockito.when(controller.getUserTags()).thenReturn(List.of(ANY_FULL_TAG_DTO));
		// Act
		MvcResult result = mockMvc
				.perform(MockMvcRequestBuilders.get(PATH_TO_TEST).contentType(CONTENT_TYPE))
				.andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
		// Assert
		String responseAsString = result.getResponse().getContentAsString();
		String expectedBody = objectMapper.writeValueAsString(List.of(ANY_FULL_TAG_DTO));
		Assertions.assertEquals(expectedBody, responseAsString);
		Mockito.verify(controller).getUserTags();
		Mockito.verifyNoInteractions(converter);
	}
	// UPDATE ///////////////////////////////////////////////
	@Test
	void canUpdateColorAndNameAndReturn204NoContent() throws Exception {
		// Arrange
		Mockito.doNothing().when(controller).updateTag(ANY_ID, ANY_FULL_TAG_DTO);
		// Act
		mockMvc.perform(MockMvcRequestBuilders.put(PATH_TO_TEST + PATH_WITH_ID).contentType(CONTENT_TYPE)
				.content(objectMapper.writeValueAsString(ANY_FULL_TAG_DTO)))
				.andExpect(MockMvcResultMatchers.status().isNoContent());
		// Assert
		Mockito.verify(controller).updateTag(ANY_ID, ANY_FULL_TAG_DTO);
		Mockito.verifyNoInteractions(converter);
	}

	// DELETE ///////////////////////////////////////////////
	@Test
	void canDeleteTagAndReturn204NoContent() throws Exception {
		// Arrange
		Mockito.doNothing().when(controller).deleteTag(ANY_ID);
		// Act
		mockMvc.perform(MockMvcRequestBuilders.delete(PATH_TO_TEST + PATH_WITH_ID).contentType(CONTENT_TYPE)
				.content(objectMapper.writeValueAsString(ANY_FULL_TAG_DTO)))
				.andExpect(MockMvcResultMatchers.status().isNoContent());
		// Assert
		Mockito.verify(controller).deleteTag(ANY_ID);
		Mockito.verifyNoInteractions(converter);
	}

}