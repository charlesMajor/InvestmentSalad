package ca.csfoy.investmentSaladApi.controller.exception;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import ca.csfoy.investmentSaladApi.api.ErrorMessageDto;
import ca.csfoy.investmentSaladApi.api.MultipleErrorMessageDto;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.InputValidationException;

@Component
public class ErrorMessageFactory {

	public ErrorMessageDto simpleErrorMessageDto(HttpStatus status, Throwable ex) {
		String errorIdentifier = ex.hashCode() + "";
		return new ErrorMessageDto(LocalDate.now(), LocalTime.now(), status.toString(), errorIdentifier,
				ex.getMessage());
	}

	public ErrorMessageDto simpleErrorMessageDto(HttpStatus status, String errorCode, Throwable ex) {
		String errorIdentifier = ex.hashCode() + "";
		return new ErrorMessageDto(LocalDate.now(), LocalTime.now(), status.toString(), errorIdentifier,
				ex.getMessage(), errorCode);
	}

	public MultipleErrorMessageDto multipleErrorMessageDto(HttpStatus status, InputValidationException ex) {
		String errorIdentifier = ex.hashCode() + "";
		return new MultipleErrorMessageDto(LocalDate.now(), LocalTime.now(), status.toString(), errorIdentifier,
				ex.getMessage(), ex.getMessages());
	}

	public MultipleErrorMessageDto multipleErrorMessageDto(HttpStatus status, String errorCode,
			InputValidationException ex) {
		String errorIdentifier = ex.hashCode() + "";
		return new MultipleErrorMessageDto(LocalDate.now(), LocalTime.now(), status.toString(), errorIdentifier,
				ex.getMessage(), errorCode, ex.getMessages());
	}
}
