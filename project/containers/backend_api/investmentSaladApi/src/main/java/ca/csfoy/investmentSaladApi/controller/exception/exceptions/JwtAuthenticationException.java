package ca.csfoy.investmentSaladApi.controller.exception.exceptions;

public class JwtAuthenticationException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public JwtAuthenticationException(String message) {
		super(message);
	}

	public JwtAuthenticationException(String message, Throwable t) {
		super(message, t);
	}
}
