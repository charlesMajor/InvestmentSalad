package ca.csfoy.investmentSaladApi.api.validations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import ca.csfoy.investmentSaladApi.controller.exception.ErrorMessageLabel;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.constraints.NotBlank;


@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Constraint(validatedBy = { LengthValidator.class })
@Retention(RetentionPolicy.RUNTIME)
@NotBlank(message =  ErrorMessageLabel.MSG_VAL_NAME_NOT_NULL)
public @interface ValidName {

    int min() default 1;

    int max() default 30;

   
    String message() default ErrorMessageLabel.MSG_MIN_MAX_NAME_LENGTH_VALIDATION;

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
