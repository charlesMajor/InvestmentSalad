package ca.csfoy.investmentSaladApi.controller.validations.assets.stock;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import ca.csfoy.investmentSaladApi.api.asset.stock.StockAssetFullDto;
import ca.csfoy.investmentSaladApi.api.validations.ValidUUID;
import ca.csfoy.investmentSaladApi.controller.exception.ErrorMessageLabel;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.InputValidationException;
import ca.csfoy.investmentSaladApi.controller.validations.CustomValidator;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import jakarta.validation.groups.Default;

@Component
@Scope("prototype")
public class StockAssetFullDtoCustomValidator implements CustomValidator<StockAssetFullDto, String> {
	private final Validator defaultHibernateValidator;
	private List<String> errorMessages;

	public StockAssetFullDtoCustomValidator(Validator validator) {
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
		if (!id.matches(ValidUUID.FORMAT_UUID)) {
			this.errorMessages.add(ErrorMessageLabel.MSG_VAL_ID_FORMAT);
		}
	}

	@Override
	public void validate(StockAssetFullDto dto) {
		Set<ConstraintViolation<StockAssetFullDto>> violations = defaultHibernateValidator.validate(dto, Default.class);

		if (!violations.isEmpty()) {
			violations.forEach(v -> this.errorMessages.add(v.getMessage()));
		}

	}

	@Override
	public void validate(String id, StockAssetFullDto dto) {
		if (!id.equals(dto.getId())) {
			errorMessages.add(ErrorMessageLabel.MSG_VAL_BOTH_ID_EQUALS);
		}
		validateId(id);
		validate(dto);
	}

	private List<String> getListWithoutDuplicatedErrors(List<String> errorMessages) {
		Set<String> cleanList = new HashSet<>(errorMessages);
		return new ArrayList<String>(cleanList);
	}
}
