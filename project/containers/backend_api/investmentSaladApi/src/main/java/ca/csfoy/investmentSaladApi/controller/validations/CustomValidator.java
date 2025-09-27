package ca.csfoy.investmentSaladApi.controller.validations;

public interface CustomValidator<T, U> {
    
    void verify(String genericMessage);
    
    void validateId(U id);

    void validate(T object);

    void validate(U id, T object);
}
