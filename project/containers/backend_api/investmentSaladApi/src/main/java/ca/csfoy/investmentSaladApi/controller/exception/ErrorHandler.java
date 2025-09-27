package ca.csfoy.investmentSaladApi.controller.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import ca.csfoy.investmentSaladApi.api.ErrorMessageDto;
import ca.csfoy.investmentSaladApi.api.MultipleErrorMessageDto;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.DuplicateException;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.InputValidationException;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.ObjectNotFoundException;
import jakarta.validation.ConstraintViolationException;

@ControllerAdvice
@ResponseBody
public class ErrorHandler {
	private final ErrorMessageFactory factory;
	private Logger logger = LoggerFactory.getLogger(ErrorHandler.class);

	public ErrorHandler(ErrorMessageFactory errorMessageFactory) {
		this.factory = errorMessageFactory;
	}

	@ExceptionHandler(value = ConstraintViolationException.class) // Translate "ConstraintViolationException" into 400
																	// error dto.
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorMessageDto handleValidationExceptions(ConstraintViolationException ex) {
		ErrorMessageDto dto = factory.simpleErrorMessageDto(HttpStatus.BAD_REQUEST, ex);
		LoggerUtils.logError(logger, ex, dto);
		return dto;
	}

	@ExceptionHandler(ObjectNotFoundException.class) // Translate "ObjectNotFoundException" into 404 error dto.
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public ErrorMessageDto resourceNotFoundException(ObjectNotFoundException ex) {
		ErrorMessageDto dto = factory.simpleErrorMessageDto(HttpStatus.NOT_FOUND,
				ErrorMessageLabel.CODE_OBJECT_NOT_FOUND, ex);
		LoggerUtils.logError(logger, ex, dto);
		return dto;
	}

	@ExceptionHandler(InputValidationException.class) // Translate "InputValidationException" into 422 error dto.
	@ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
	public MultipleErrorMessageDto invalidInputException(InputValidationException ex) {
		MultipleErrorMessageDto dto = factory.multipleErrorMessageDto(HttpStatus.UNPROCESSABLE_ENTITY,
				ex.getErrorCode(), ex);
		LoggerUtils.logError(logger, ex, dto);
		return dto;
	}

	@ExceptionHandler(DuplicateException.class) // Translate "DuplicateException" into 422 error dto.
	@ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
	public ErrorMessageDto invalidInputException(DuplicateException ex) {
		ErrorMessageDto dto = factory.simpleErrorMessageDto(HttpStatus.UNPROCESSABLE_ENTITY, ex.getErrorCode(), ex);
		LoggerUtils.logError(logger, ex, dto);
		return dto;
	}

	@ExceptionHandler(HttpMessageNotReadableException.class)
	@ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
	public ErrorMessageDto invalidInputException(HttpMessageNotReadableException ex) {
		ErrorMessageDto dto = factory.simpleErrorMessageDto(HttpStatus.UNPROCESSABLE_ENTITY, null, ex);
		LoggerUtils.logError(logger, ex, dto);
		return dto;
	}

	@ExceptionHandler(InternalAuthenticationServiceException.class) // Translate "AuthenticationException" into 401
																	// error dto.
	@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
	public ErrorMessageDto authenticationException(InternalAuthenticationServiceException ex) {
		ErrorMessageDto dto = factory.simpleErrorMessageDto(HttpStatus.UNAUTHORIZED,
				ErrorMessageLabel.CODE_LOGIN_INVALID_CREDENTIALS, ex);
		LoggerUtils.logError(logger, ex, dto);
		return dto;
	}

	@ExceptionHandler(BadCredentialsException.class) // Translate "AuthenticationException" into 401 error dto.
	@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
	public ErrorMessageDto authenticationException(BadCredentialsException ex) {
		ErrorMessageDto dto = factory.simpleErrorMessageDto(HttpStatus.UNAUTHORIZED,
				ErrorMessageLabel.CODE_LOGIN_INVALID_CREDENTIALS, ex);
		LoggerUtils.logError(logger, ex, dto);
		return dto;
	}

	@ExceptionHandler(NoResourceFoundException.class) // Translate "AuthenticationException" into 401 error dto.
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public ErrorMessageDto notFoundException(NoResourceFoundException ex) {
		ErrorMessageDto dto = factory.simpleErrorMessageDto(HttpStatus.NOT_FOUND,
				ErrorMessageLabel.CODE_ROUTE_NOT_FOUND, ex);
		LoggerUtils.logError(logger, ex, dto);
		return dto;
	}

	@ExceptionHandler(DuplicateKeyException.class) // Translate "DuplicateKeyException" into 401 error dto.
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public ErrorMessageDto notFoundException(DuplicateKeyException ex) {
		// TODO change return code and message.
		ErrorMessageDto dto = factory.simpleErrorMessageDto(HttpStatus.NOT_FOUND,
				ErrorMessageLabel.CODE_ROUTE_NOT_FOUND, ex);
		LoggerUtils.logError(logger, ex, dto);
		return dto;
	}

	@ExceptionHandler(Exception.class) // Translate unhandled exceptions into 500 error dto.
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public ErrorMessageDto handleAllExceptions(Exception ex) {
		ErrorMessageDto dto = factory.simpleErrorMessageDto(HttpStatus.INTERNAL_SERVER_ERROR, ex);
		LoggerUtils.logError(logger, ex, dto);
		return dto;
	}
}
