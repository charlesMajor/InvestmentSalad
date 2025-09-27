package ca.csfoy.investmentSaladApi.api.user;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;

import ca.csfoy.investmentSaladApi.controller.user.UserConverter;

import ca.csfoy.investmentSaladApi.domain.user.UserRepository;


@Tag("Api")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
@AutoConfigureMockMvc
@WithUserDetails("test.admin@hotmail.com")
public class UserResourceTest {

	@Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @Mock
    private UserRepository repo;
    @Mock
    private UserConverter converter;
    
    private final String PATH_TO_TEST = UserResource.RESOURCE_PATH;
    private final String CONTENT_TYPE = "application/json";
    
    private final String ANY_ID = "5eca872a-62ce-3125-90bd-02ec0b6401c3";
    private final String ANY_USERNAME = "Test";
    private final String ANY_EMAIL = "test.any@hotmail.com";
    private final String ANY_PASSWORD = "$2a$10$cC7KDFOWPAJ0pyHaRkLvVu6lVYR2dVTGkfKC/2GvD4SlQLo7spBiS";
    
    private final String PATH_WITH_ID = "/" + ANY_ID;

    private final FullUserDto ANY_FULL_USER_DTO_1 = new FullUserDto(ANY_ID, ANY_USERNAME, ANY_EMAIL, ANY_PASSWORD);
    private final UserDto ANY_USER_DTO_1 = new UserDto(ANY_USERNAME, ANY_EMAIL, ANY_PASSWORD);

    // CREATE ///////////////////////////////////////////////
    @Test
    @Order(1)
    void canCreateUserAndReturn201Created() throws Exception 
    {
    	//Arrange
        //Act //Assert
        mockMvc.perform(MockMvcRequestBuilders.post(PATH_TO_TEST)
                .contentType(CONTENT_TYPE)
                .content(objectMapper.writeValueAsString(ANY_USER_DTO_1))).andExpect(MockMvcResultMatchers.status().isCreated());

    }
 
    // GET ///////////////////////////////////////////////
    @Test
    @Order(2)
    void canGetByIdAndReturn200OK() throws Exception 
    {
    	//Arrange
    	LightUserDto expectedDto = new LightUserDto("5eca872a-62ce-3125-90bd-02ec0b6401c3", "User");
        //Act
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get(PATH_TO_TEST + PATH_WITH_ID).contentType(CONTENT_TYPE))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        //Assert
        String responseAsString = result.getResponse().getContentAsString();
        String expectedBody = objectMapper.writeValueAsString(expectedDto);
        Assertions.assertEquals(expectedBody, responseAsString);
    }
    
    // UPDATE ///////////////////////////////////////////////
    @Test
    @Order(3)
    void canUpdateUserPasswordAndReturn204NoContent() throws Exception 
    {
    	//Arrange
    	//Act
        mockMvc.perform(MockMvcRequestBuilders.put(PATH_TO_TEST +"/password"+ PATH_WITH_ID)
                .contentType(CONTENT_TYPE)
                .content(objectMapper.writeValueAsString(ANY_FULL_USER_DTO_1))).andExpect(MockMvcResultMatchers.status().isNoContent());
    	//Assert
    }
    
    @Test
    @Order(4)
    void canUpdateUserInfosAndReturn204NoContent() throws Exception 
    {
    	//Arrange
    	//Act
        mockMvc.perform(MockMvcRequestBuilders.put(PATH_TO_TEST +"/password"+ PATH_WITH_ID)
                .contentType(CONTENT_TYPE)
                .content(objectMapper.writeValueAsString(ANY_FULL_USER_DTO_1))).andExpect(MockMvcResultMatchers.status().isNoContent());
    	//Assert
    }
    
    // SIGNUP ///////////////////////////////////////////////
    
    
    // LOGIN ///////////////////////////////////////////////


}

