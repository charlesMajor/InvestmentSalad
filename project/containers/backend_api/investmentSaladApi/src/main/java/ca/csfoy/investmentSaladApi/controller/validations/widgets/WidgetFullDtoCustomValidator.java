package ca.csfoy.investmentSaladApi.controller.validations.widgets;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import ca.csfoy.investmentSaladApi.api.validations.ValidUUID;
import ca.csfoy.investmentSaladApi.api.widget.WidgetFullDto;
import ca.csfoy.investmentSaladApi.controller.exception.ErrorMessageLabel;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.InputValidationException;
import ca.csfoy.investmentSaladApi.controller.validations.CustomValidator;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import jakarta.validation.groups.Default;

public class WidgetFullDtoCustomValidator implements CustomValidator<WidgetFullDto, String> {
	private final Validator defaultHibernateValidator;
	private List<String> errorMessages;

	public WidgetFullDtoCustomValidator(Validator validator) {
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
	public void validate(WidgetFullDto dto) {
		Set<ConstraintViolation<WidgetFullDto>> violations = defaultHibernateValidator.validate(dto, Default.class);

		if (!violations.isEmpty()) {
			violations.forEach(v -> this.errorMessages.add(v.getMessage()));
		}

	}

	@Override
	public void validate(String id, WidgetFullDto dto) {
		if (id != null) {
			if (!id.equals(dto.getId())) {
				this.errorMessages.add(ErrorMessageLabel.MSG_VAL_BOTH_ID_EQUALS);
			}
		}
		validateId(id);
		validate(dto);
	}

	private List<String> getListWithoutDuplicatedErrors(List<String> errorMessages) {
		Set<String> cleanList = new HashSet<>(errorMessages);
		return new ArrayList<String>(cleanList);
	}
}
