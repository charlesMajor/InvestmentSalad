package ca.csfoy.investmentSaladApi.controller.validations.tag;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import ca.csfoy.investmentSaladApi.api.tag.FullTagDto;
import ca.csfoy.investmentSaladApi.api.validations.ValidUUID;
import ca.csfoy.investmentSaladApi.controller.exception.ErrorMessageLabel;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.InputValidationException;
import ca.csfoy.investmentSaladApi.controller.validations.CustomValidator;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import jakarta.validation.groups.Default;

@Component
@Scope("prototype")
public class FullTagDtoCustomValidator implements CustomValidator<FullTagDto, String> {

	private final Validator defaultHibernateValidator;
	private List<String> errorMessages;

	public FullTagDtoCustomValidator(Validator validator) {
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
		if (Objects.isNull(id) || id.equals("")) {
			this.errorMessages.add(ErrorMessageLabel.MSG_VAL_ID_NOT_NULL);
		} else {
			if (!id.matches(ValidUUID.FORMAT_UUID)) {
				this.errorMessages.add(ErrorMessageLabel.MSG_VAL_ID_FORMAT);
			}
		}
	}

	@Override
	public void validate(FullTagDto dto) {
		Set<ConstraintViolation<FullTagDto>> violations = defaultHibernateValidator.validate(dto, Default.class);

		if (!violations.isEmpty()) {
			violations.forEach(v -> this.errorMessages.add(v.getMessage()));
		}
	}

	@Override
	public void validate(String id, FullTagDto dto) {
		validateId(id);
		validate(dto);
		if (id != null) {
			if (!id.equals(dto.getTagId())) {
				this.errorMessages.add(ErrorMessageLabel.MSG_VAL_BOTH_ID_EQUALS);
			}
		}

	}

	private List<String> getListWithoutDuplicatedErrors(List<String> errorMessages) {
		Set<String> cleanList = new HashSet<>(errorMessages);
		return new ArrayList<String>(cleanList);
	}

}