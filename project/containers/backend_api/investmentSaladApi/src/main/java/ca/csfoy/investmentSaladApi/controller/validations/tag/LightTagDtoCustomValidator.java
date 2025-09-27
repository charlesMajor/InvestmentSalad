package ca.csfoy.investmentSaladApi.controller.validations.tag;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import ca.csfoy.investmentSaladApi.api.tag.LightTagDto;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.InputValidationException;
import ca.csfoy.investmentSaladApi.controller.validations.CustomValidator;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import jakarta.validation.groups.Default;

public class LightTagDtoCustomValidator implements CustomValidator<LightTagDto, String> {
	private final Validator defaultHibernateValidator;
	private List<String> errorMessages;

	public LightTagDtoCustomValidator(Validator validator) {
		this.defaultHibernateValidator = validator;
		this.errorMessages = new ArrayList<>();
	}

	@Override
	public void verify(String genericMessage) {
		if (!errorMessages.isEmpty()) {
			throw new InputValidationException(genericMessage, getListWithoutDuplicatedErrors(this.errorMessages));
		}
	}

	@Override
	public void validateId(String id) {
	}

	@Override
	public void validate(LightTagDto dto) {
		Set<ConstraintViolation<LightTagDto>> violations = defaultHibernateValidator.validate(dto, Default.class);

		if (!violations.isEmpty()) {
			violations.forEach(v -> this.errorMessages.add(v.getMessage()));
		}

	}

	@Override
	public void validate(String id, LightTagDto dto) {
		validate(dto);
	}

	private List<String> getListWithoutDuplicatedErrors(List<String> errorMessages) {
		Set<String> cleanList = new HashSet<>(errorMessages);
		return new ArrayList<String>(cleanList);
	}
}
