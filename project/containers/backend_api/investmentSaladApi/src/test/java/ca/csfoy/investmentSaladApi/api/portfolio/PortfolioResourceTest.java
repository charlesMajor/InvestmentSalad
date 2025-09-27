package ca.csfoy.investmentSaladApi.api.portfolio;


import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Assertions;

import org.junit.jupiter.api.Tag;
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

import ca.csfoy.investmentSaladApi.controller.portfolio.PortfolioConverter;
import ca.csfoy.investmentSaladApi.domain.Currency;
import ca.csfoy.investmentSaladApi.domain.portfolio.Portfolio;
import ca.csfoy.investmentSaladApi.domain.portfolio.PortfolioRepository;

@Tag("Api")
@SpringBootTest
@AutoConfigureMockMvc
@WithUserDetails("test.admin@hotmail.com")
public class PortfolioResourceTest {

	@Autowired
	private MockMvc mockMvc;
	@Autowired
	private ObjectMapper objectMapper;

	@MockBean
	private PortfolioConverter converter;
	@MockBean
	private PortfolioRepository repo;
	
	private final String ANY_SEEDED_ID = "40554b53-6ce1-425d-96ab-c854631d04f8";

	private final String PATH_TO_TEST = PortfolioRessource.RESOURCE_PATH;
	private final String CONTENT_TYPE = "application/json";

	private final PortfolioLightDto ANY_LIGHT_DTO = new PortfolioLightDto("ANY NAME", "AnyDesc", 0, 0, 0,
			LocalDate.of(2020, 05, 1), Currency.CAD, List.of());
	
	private final PortfolioFullDto ANY_FULL_DTO= new PortfolioFullDto("35554b53-6ce1-425d-96ab-c854631d04f8","ANY NAME", "AnyDesc", 0, 0, 0,
			ANY_LIGHT_DTO.getInitialInterestPaymentDate(), Currency.CAD, List.of());
	
	private final Portfolio ANY_PORTFOLIO= new Portfolio("35554b53-6ce1-425d-96ab-c854631d04f8","ANY NAME", "AnyDesc", 0, 0, 0,
			ANY_LIGHT_DTO.getInitialInterestPaymentDate(), Currency.CAD, List.of());
	
	
	private final PortfolioFullDto FULL_SEEDED_DTO = new PortfolioFullDto(ANY_SEEDED_ID,
			"Desjardins", "AnyDesc", 2000, 1, 1, ANY_LIGHT_DTO.getInitialInterestPaymentDate(), Currency.CAD, List.of());

	private final Portfolio SEEDED_PORTFOLIO = new Portfolio(ANY_SEEDED_ID, "Desjardins",
			"AnyDesc", 2000, 1, 1, ANY_LIGHT_DTO.getInitialInterestPaymentDate(), Currency.CAD, List.of());

	
    private final String PATH_WITH_ID = "/" + ANY_SEEDED_ID;

	// CREATE ///////////////////////////////////////////////
	@Test
	void canCreatePortfolioAndReturn201Created() throws Exception 
	{
		// Arrange
		Mockito.when(repo.create(ANY_PORTFOLIO)).thenReturn(ANY_PORTFOLIO);
		Mockito.when(converter.fromLightDtoToPortfolio(ANY_LIGHT_DTO)).thenReturn(ANY_PORTFOLIO);
		Mockito.when(converter.fromPortfolioToDto(ANY_PORTFOLIO)).thenReturn(ANY_FULL_DTO);
		// Act 
		mockMvc.perform(MockMvcRequestBuilders.post(PATH_TO_TEST).contentType(CONTENT_TYPE)
				.content(objectMapper.writeValueAsString(ANY_LIGHT_DTO)))
				.andExpect(MockMvcResultMatchers.status().isCreated());
		//Assert
		Mockito.verify(converter).fromLightDtoToPortfolio(ANY_LIGHT_DTO);
		Mockito.verify(converter).fromPortfolioToDto(ANY_PORTFOLIO);
		Mockito.verify(repo).create(ANY_PORTFOLIO);

	}

	// GET ///////////////////////////////////////////////
	@Test
	void canGetAllAndReturn200Ok() throws Exception {
		// Arrange
		Mockito.when(repo.getAllByUserId()).thenReturn(Arrays.asList(SEEDED_PORTFOLIO));
		Mockito.when(converter.fromPortfolioListToDtoList(Mockito.anyList()))
				.thenReturn(Arrays.asList(FULL_SEEDED_DTO));
		// Act
		MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get(PATH_TO_TEST).contentType(CONTENT_TYPE))
				.andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
		// Assert
		String responseAsString = result.getResponse().getContentAsString();
		String expectedBody = objectMapper.writeValueAsString(Arrays.asList(FULL_SEEDED_DTO));
		Assertions.assertEquals(expectedBody, responseAsString);
	}
    @Test
    void canGetByIdAndReturn200OK() throws Exception 
    {
    	//Arrange
    	Mockito.when(repo.getBy(ANY_SEEDED_ID)).thenReturn(SEEDED_PORTFOLIO);
		Mockito.when(converter.fromPortfolioToDto(SEEDED_PORTFOLIO))
				.thenReturn(FULL_SEEDED_DTO);
    	PortfolioFullDto expectedDto = FULL_SEEDED_DTO;
        //Act
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get(PATH_TO_TEST + PATH_WITH_ID ).contentType(CONTENT_TYPE))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        //Assert
        String responseAsString = result.getResponse().getContentAsString();
        String expectedBody = objectMapper.writeValueAsString(expectedDto);
        Assertions.assertEquals(expectedBody, responseAsString);
        Mockito.verify(repo).getBy(ANY_SEEDED_ID);
        Mockito.verify(converter).fromPortfolioToDto(SEEDED_PORTFOLIO);
    }
	
	// UPDATE ///////////////////////////////////////////////
	@Test
	void canUpdateAndReturn204NoContent() throws Exception 
	{
		// Arrange
		Mockito.doNothing().when(repo).save(ANY_SEEDED_ID, SEEDED_PORTFOLIO);
		Mockito.when(converter.fromFullDtoToPortfolio(FULL_SEEDED_DTO)).thenReturn(SEEDED_PORTFOLIO);
		// Act
		mockMvc.perform(MockMvcRequestBuilders.put(PATH_TO_TEST + PATH_WITH_ID).contentType(CONTENT_TYPE)
				.content(objectMapper.writeValueAsString(FULL_SEEDED_DTO)))
				.andExpect(MockMvcResultMatchers.status().isNoContent());
		// Assert
		Mockito.verify(repo).save(ANY_SEEDED_ID, SEEDED_PORTFOLIO);
		Mockito.verify(converter).fromFullDtoToPortfolio(FULL_SEEDED_DTO);
	}
	
	// DELETE ///////////////////////////////////////////////
	@Test
	void canDeleteAndReturn204NoContent() throws Exception 
	{
		// Arrange
		Mockito.doNothing().when(repo).delete(ANY_SEEDED_ID);
		// Act
		mockMvc.perform(MockMvcRequestBuilders.delete(PATH_TO_TEST + PATH_WITH_ID).contentType(CONTENT_TYPE))
				.andExpect(MockMvcResultMatchers.status().isNoContent());
		// Assert
		Mockito.verify(repo).delete(ANY_SEEDED_ID);
	}
	
}
