package ca.csfoy.investmentSaladApi.api.validations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import ca.csfoy.investmentSaladApi.controller.exception.ErrorMessageLabel;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {})
@NotBlank(message = ErrorMessageLabel.MSG_VAL_ID_NOT_NULL)
@Pattern(regexp = ValidUUID.FORMAT_UUID, message = ErrorMessageLabel.MSG_VAL_ID_FORMAT)
public @interface ValidUUID {

    String FORMAT_UUID = "^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$";
    String message() default ErrorMessageLabel.MSG_VAL_ID_FORMAT;

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
