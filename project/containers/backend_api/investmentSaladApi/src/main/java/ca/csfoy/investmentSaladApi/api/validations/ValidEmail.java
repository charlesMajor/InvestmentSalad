package ca.csfoy.investmentSaladApi.api.validations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import ca.csfoy.investmentSaladApi.controller.exception.ErrorMessageLabel;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Constraint(validatedBy = {})
@Retention(RetentionPolicy.RUNTIME)
@NotBlank(message = ErrorMessageLabel.MSG_EMAIL_NOT_NULL)
@Email(message = ErrorMessageLabel.MSG_VAL_EMAIL_FORMAT)
public @interface ValidEmail {

    String message() default ErrorMessageLabel.MSG_VAL_EMAIL_FORMAT;

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
