package ca.csfoy.investmentSaladApi.api.validations;

import java.util.Objects;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import com.nulabinc.zxcvbn.Strength;
import com.nulabinc.zxcvbn.Zxcvbn;

public class PasswordValidator implements ConstraintValidator<ValidPassword, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (Objects.isNull(value)) {
            return true;
        }

        Zxcvbn stregthValidator = new Zxcvbn();
        Strength strength = stregthValidator.measure(value);
        if (strength.getScore() >= 2) {
            return true;
        }

        return false;
    }
}
