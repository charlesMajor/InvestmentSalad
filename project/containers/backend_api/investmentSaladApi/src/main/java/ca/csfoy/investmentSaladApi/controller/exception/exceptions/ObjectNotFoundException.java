package ca.csfoy.investmentSaladApi.controller.exception.exceptions;

public class ObjectNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ObjectNotFoundException(String message) {
		super(message);
	}

	public ObjectNotFoundException(String message, Throwable t) {
		super(message, t);
	}
}
