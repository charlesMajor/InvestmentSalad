package ca.csfoy.investmentSaladApi.api;

import java.time.LocalDate;
import java.time.LocalTime;

import ca.csfoy.investmentSaladApi.controller.exception.ErrorMessageLabel;

public class ErrorMessageDto {

	private final LocalDate date;
	private final LocalTime time;
	private final String statusCode;
	private final String errorIdentifier;
	private final String errorCode;
	private final String errorMessage;

	public ErrorMessageDto(LocalDate date, LocalTime time, String statusCode, String errorIdentifier,
			String errorMessage) {
		this.errorCode = ErrorMessageLabel.CODE_GENERIC_ERROR;
		this.date = date;
		this.time = time;
		this.statusCode = statusCode;
		this.errorIdentifier = errorIdentifier;
		this.errorMessage = errorMessage;
	}

	public ErrorMessageDto(LocalDate date, LocalTime time, String statusCode, String errorIdentifier,
			String errorMessage, String errorCode) {
		this.date = date;
		this.time = time;
		this.statusCode = statusCode;
		this.errorCode = errorCode;
		this.errorIdentifier = errorIdentifier;
		this.errorMessage = errorMessage;
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
	
	
}
