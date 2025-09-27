package ca.csfoy.investmentSaladApi.controller.exception.exceptions;

import ca.csfoy.investmentSaladApi.controller.exception.ErrorMessageLabel;

public class DuplicateException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	private String errorCode;

	public DuplicateException(String message, String errorCode) {
		super(message);
		this.errorCode = errorCode;
	}

	public DuplicateException(String message) {
		super(message);
		this.errorCode = ErrorMessageLabel.CODE_GENERIC_ERROR;
	}

	public DuplicateException(String message, Throwable t) {
		super(message, t);
		this.errorCode = ErrorMessageLabel.CODE_GENERIC_ERROR;
	}

	public String getErrorCode() {
		return errorCode;
	}
}
