package ca.csfoy.investmentSaladApi.api;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import ca.csfoy.investmentSaladApi.controller.exception.ErrorMessageLabel;

public class MultipleErrorMessageDto {

	private final LocalDate date;
	private final LocalTime time;
	private final String statusCode;
	private final String errorIdentifier;
	private final String errorCode;
	private final String errorMessage;
	private final List<String> validationMessages;

	public MultipleErrorMessageDto(LocalDate date, LocalTime time, String statusCode, String errorIdentifier,
			String errorMessage, String errorCode, List<String> validationMessages) {
		this.date = date;
		this.time = time;
		this.statusCode = statusCode;
		this.errorIdentifier = errorIdentifier;
		this.errorCode = errorCode;
		this.errorMessage = errorMessage;
		this.validationMessages = validationMessages;
	}

	public MultipleErrorMessageDto(LocalDate date, LocalTime time, String statusCode, String errorIdentifier,
			String errorMessage, List<String> validationMessages) {
		this.date = date;
		this.time = time;
		this.statusCode = statusCode;
		this.errorIdentifier = errorIdentifier;
		this.errorCode = ErrorMessageLabel.CODE_GENERIC_ERROR;
		this.errorMessage = errorMessage;
		this.validationMessages = validationMessages;
	}

	public LocalDate getDate() {
		return date;
	}

	public LocalTime getTime() {
		return time;
	}

	public String getStatusCode() {
		return statusCode;
	}

	public String getErrorIdentifier() {
		return errorIdentifier;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public List<String> getValidationMessages() {
		return validationMessages;
	}

}
