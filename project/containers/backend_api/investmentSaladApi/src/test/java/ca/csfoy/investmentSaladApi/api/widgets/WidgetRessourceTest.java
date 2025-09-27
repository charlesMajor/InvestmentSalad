package ca.csfoy.investmentSaladApi.api.widgets;

import java.util.Arrays;
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

import ca.csfoy.investmentSaladApi.api.widget.WidgetRessource;
import ca.csfoy.investmentSaladApi.api.widget.distibution.DistributionWidgetFullDto;
import ca.csfoy.investmentSaladApi.api.widget.net_worth.NetWorthWidgetFullDto;
import ca.csfoy.investmentSaladApi.api.widget.watch_list.WatchListWidgetFullDto;
import ca.csfoy.investmentSaladApi.controller.widget.WidgetController;
import ca.csfoy.investmentSaladApi.controller.widget.WidgetConverter;
import ca.csfoy.investmentSaladApi.domain.widget.WidgetTypes;

@SpringBootTest
@AutoConfigureMockMvc
@WithUserDetails("test.admin@hotmail.com")
public class WidgetRessourceTest {
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
	private final String ANY_SYMBOL = "AAPL";

	private final WatchListWidgetFullDto ANY_WATCH_LIST_WIDGET_FULL_DTO = new WatchListWidgetFullDto(ANY_ID,
			ANY_DASHBOARD_ID, "Any name", 0, 0, 0, 0, WidgetTypes.NET_WORTH, List.of(ANY_TAG_ID), List.of(ANY_SYMBOL));

	private final NetWorthWidgetFullDto ANY_NET_WORTH_WIDGET_FULL_DTO = new NetWorthWidgetFullDto(ANY_ID,
			ANY_DASHBOARD_ID, "Any name", 0, 0, 0, 0, WidgetTypes.NET_WORTH, List.of(ANY_TAG_ID), false, "any period");

	private final DistributionWidgetFullDto ANY_DISTRIBUTION_WIDGET_FULL_DTO = new DistributionWidgetFullDto(ANY_ID,
			ANY_DASHBOARD_ID, "Any name", 0, 0, 0, 0, WidgetTypes.DISTRIBUTION, List.of(ANY_TAG_ID));

	// GET ALL ///////////////////////////////////////////////
	@Test
	void canGetAllAndReturn200OK() throws Exception {
		// Arrange
		Mockito.when(controller.getAll()).thenReturn(List.of(ANY_WATCH_LIST_WIDGET_FULL_DTO,
				ANY_NET_WORTH_WIDGET_FULL_DTO, ANY_DISTRIBUTION_WIDGET_FULL_DTO));
		// Act
		MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get(PATH_TO_TEST).contentType(CONTENT_TYPE))
				.andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
		// Assert
		String responseAsString = result.getResponse().getContentAsString();
		String expectedBody = objectMapper.writeValueAsString(Arrays.asList(ANY_WATCH_LIST_WIDGET_FULL_DTO,
				ANY_NET_WORTH_WIDGET_FULL_DTO, ANY_DISTRIBUTION_WIDGET_FULL_DTO));
		Assertions.assertEquals(expectedBody, responseAsString);
	}

}
