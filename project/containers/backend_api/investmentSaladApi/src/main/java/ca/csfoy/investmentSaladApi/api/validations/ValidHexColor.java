package ca.csfoy.investmentSaladApi.api.validations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Constraint(validatedBy = {})
@Retention(RetentionPolicy.RUNTIME)
@NotBlank(message = "Hexcolor can't be null or blank")
@Pattern(regexp = ValidHexColor.REGEX_PATTERN, message = "Invalid hex color format")
public @interface ValidHexColor {
   
	final String REGEX_PATTERN = "^([A-Fa-f0-9]{6})$";
    String message() default "Invalid hex color format";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}