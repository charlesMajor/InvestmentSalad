package ca.csfoy.investmentSaladApi.api.widgets.net_worth;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;

import ca.csfoy.investmentSaladApi.api.widget.WidgetRessource;
import ca.csfoy.investmentSaladApi.api.widget.net_worth.NetWorthWidgetFullDto;
import ca.csfoy.investmentSaladApi.api.widget.net_worth.NetWorthWidgetDto;
import ca.csfoy.investmentSaladApi.controller.widget.WidgetController;
import ca.csfoy.investmentSaladApi.controller.widget.WidgetConverter;
import ca.csfoy.investmentSaladApi.domain.widget.WidgetTypes;

@SpringBootTest
@AutoConfigureMockMvc
@WithUserDetails("test.admin@hotmail.com")
public class NetWorthWidgetRessourceTest {
	@Autowired
	private MockMvc mockMvc;
	@Autowired
	private ObjectMapper objectMapper;

	@MockBean
	private WidgetController controller;

	@MockBean
	private WidgetConverter converter;

	private final String PATH_TO_TEST = WidgetRessource.RESOURCE_PATH;
	private final String CONTENT_TYPE = "application/json";
	private final String ANY_TAG_ID = "1fb4668d-6d76-4331-9dc6-ab24eca6d720";
	private final String ANY_DASHBOARD_ID = "63479dd8-890b-4812-9b53-18e2ca149039";
	private final String ANY_ID = "13222dd8-890b-4812-9b53-18e2ca149039";

	private final NetWorthWidgetDto ANY_NET_WORTH_WIDGET_DTO = new NetWorthWidgetDto("Any name", 0, 0, 0, 0,
			WidgetTypes.NET_WORTH, List.of(ANY_TAG_ID), false, "any period");

	private final NetWorthWidgetFullDto ANY_NET_WORTH_WIDGET_FULL_DTO = new NetWorthWidgetFullDto(ANY_ID, ANY_DASHBOARD_ID,
			"Any name", 0, 0, 0, 0, WidgetTypes.NET_WORTH, List.of(ANY_TAG_ID), false, "any period");

	// CREATE ///////////////////////////////////////////////
	@Test
	void canCreateNetWorthWidgetAndReturn201Created() throws Exception {
		// Arrange
		Mockito.when(controller.createNetWorthWidget(ANY_NET_WORTH_WIDGET_DTO, ANY_DASHBOARD_ID)).thenReturn(ANY_NET_WORTH_WIDGET_FULL_DTO);
		// Act
		mockMvc.perform(MockMvcRequestBuilders.post(PATH_TO_TEST + "/" + ANY_DASHBOARD_ID + "/netWorth")
				.contentType(CONTENT_TYPE).content(objectMapper.writeValueAsString(ANY_NET_WORTH_WIDGET_DTO)))
				.andExpect(MockMvcResultMatchers.status().isCreated());
		// Assert
		Mockito.verify(controller).createNetWorthWidget(ANY_NET_WORTH_WIDGET_DTO, ANY_DASHBOARD_ID);
		Mockito.verifyNoInteractions(converter);
	}

	// UPDATE ///////////////////////////////////////////////
	@Test
	void canUpdateNetWorthWidgetAndReturn204NoContent() throws Exception {
		// Arrange
		Mockito.doNothing().when(controller).updateNetWorthWidget(ANY_NET_WORTH_WIDGET_FULL_DTO, ANY_DASHBOARD_ID,
				ANY_ID);
		// Act
		mockMvc.perform(MockMvcRequestBuilders.put(PATH_TO_TEST + "/" + ANY_DASHBOARD_ID + "/netWorth/" + ANY_ID)
				.contentType(CONTENT_TYPE).content(objectMapper.writeValueAsString(ANY_NET_WORTH_WIDGET_FULL_DTO)))
				.andExpect(MockMvcResultMatchers.status().isNoContent());
		// Assert
		Mockito.verify(controller).updateNetWorthWidget(ANY_NET_WORTH_WIDGET_FULL_DTO, ANY_DASHBOARD_ID, ANY_ID);
		Mockito.verifyNoInteractions(converter);
	}

	// DELETE ///////////////////////////////////////////////
	@Test
	void canDeleteWidgetAndReturn204NoContent() throws Exception {
		// Arrange
		Mockito.doNothing().when(controller).deleteWidget(ANY_ID);
		// Act
		mockMvc.perform(MockMvcRequestBuilders.delete(PATH_TO_TEST + "/" + ANY_ID).contentType(CONTENT_TYPE))
				.andExpect(MockMvcResultMatchers.status().isNoContent());
		// Assert
		Mockito.verify(controller).deleteWidget(ANY_ID);
		Mockito.verifyNoInteractions(converter);
	}
}
