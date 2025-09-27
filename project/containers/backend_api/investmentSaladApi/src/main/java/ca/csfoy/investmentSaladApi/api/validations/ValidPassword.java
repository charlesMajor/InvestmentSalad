package ca.csfoy.investmentSaladApi.api.validations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import ca.csfoy.investmentSaladApi.controller.exception.ErrorMessageLabel;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Constraint(validatedBy = { PasswordValidator.class })
@Retention(RetentionPolicy.RUNTIME)
@NotBlank(message = ErrorMessageLabel.MSG_VAL_PASSW_NOT_NULL)
@Size(min = 8, max = 64, message = ErrorMessageLabel.MSG_MIN_MAX_PASSWORD_LENGTH_VALIDATION)
public @interface ValidPassword {


    String message() default ErrorMessageLabel.MSG_VAL_PASSW_NOT_STRON_ENOUGH;

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
