package ca.csfoy.investmentSaladApi.controller.exception.exceptions;

import java.util.ArrayList;
import java.util.List;

import ca.csfoy.investmentSaladApi.controller.exception.ErrorMessageLabel;

public class InputValidationException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	private final List<String> messages;
	private final String errorCode;

	public InputValidationException(String message) {
		super(message);
		this.messages = new ArrayList<>();
		this.errorCode = ErrorMessageLabel.CODE_INPUT_VALIDATION_GENERIC_ERROR;
	}

	public InputValidationException(String message, List<String> messages) {
		super(message);
		this.messages = messages;
		this.errorCode = ErrorMessageLabel.CODE_INPUT_VALIDATION_GENERIC_ERROR;
	}

	public InputValidationException(String message, String errorCode) {
		super(message);
		this.messages = new ArrayList<>();
		this.errorCode = errorCode;
	}

	public InputValidationException(String message, List<String> messages, String errorCode) {
		super(message);
		this.errorCode = errorCode;
		this.messages = messages;
	}

	public List<String> getMessages() {
		return new ArrayList<>(this.messages);
	}

	public String getErrorCode() {
		return this.errorCode;
	}
}
