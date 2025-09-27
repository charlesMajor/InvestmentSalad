package ca.csfoy.investmentSaladApi.api.validations;

import java.util.Objects;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class LengthValidator implements ConstraintValidator<ValidName, String> {

    private int min;
    private int max;

    public void initialize(ValidName annotation) {
        this.min = annotation.min();
        this.max = annotation.max();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (Objects.isNull(value)) {
            return true;
        }
        int length = value.length();

        if (length >= min && length <= max) {
            return true;
        }

        return false;
    }
}
