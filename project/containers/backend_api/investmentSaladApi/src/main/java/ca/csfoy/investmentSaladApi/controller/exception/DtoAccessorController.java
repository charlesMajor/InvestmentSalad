package ca.csfoy.investmentSaladApi.controller.exception;

import org.springframework.validation.DataBinder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.InitBinder;

@ControllerAdvice
public class DtoAccessorController {

	@InitBinder
	private void activateDirectFieldAccess(DataBinder dataBinder) {
		dataBinder.initDirectFieldAccess();
	}
}
