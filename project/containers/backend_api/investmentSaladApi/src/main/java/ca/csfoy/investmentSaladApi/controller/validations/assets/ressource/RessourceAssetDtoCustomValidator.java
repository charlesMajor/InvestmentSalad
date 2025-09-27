package ca.csfoy.investmentSaladApi.controller.validations.assets.ressource;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import ca.csfoy.investmentSaladApi.api.asset.ressource.RessourceAssetDto;
import ca.csfoy.investmentSaladApi.api.validations.ValidUUID;
import ca.csfoy.investmentSaladApi.controller.exception.ErrorMessageLabel;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.InputValidationException;
import ca.csfoy.investmentSaladApi.controller.validations.CustomValidator;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import jakarta.validation.groups.Default;

public class RessourceAssetDtoCustomValidator implements CustomValidator<RessourceAssetDto, String>{
	private final Validator defaultHibernateValidator;
    private List<String> errorMessages;
    
    public RessourceAssetDtoCustomValidator(Validator validator) 
    {
    	this.defaultHibernateValidator = validator;
        this.errorMessages = new ArrayList<>();
    }
    
    
	@Override
	public void verify(String genericMessage) {
		 if (!errorMessages.isEmpty()) 
		 {
	        throw new InputValidationException(genericMessage, getListWithoutDuplicatedErrors(this.errorMessages));
	     }
	}

	@Override
	public void validateId(String id) 
	{
		if(!id.matches(ValidUUID.FORMAT_UUID)) 
		{
			this.errorMessages.add(ErrorMessageLabel.MSG_VAL_ID_FORMAT);
		}
	}

	@Override
	public void validate(RessourceAssetDto dto)
	{
		  Set<ConstraintViolation<RessourceAssetDto>> violations = defaultHibernateValidator.validate(dto, Default.class);

	        if (!violations.isEmpty()) {
	            violations.forEach(v -> this.errorMessages.add(v.getMessage()));
	        }
		
	}

	@Override
	public void validate(String id, RessourceAssetDto dto) {
		validateId(id);
		validate(dto);
	}
	
	 private List<String> getListWithoutDuplicatedErrors(List<String> errorMessages) {
			Set<String> cleanList = new HashSet<>(errorMessages); 
			return new ArrayList<String>(cleanList);
		}
}
