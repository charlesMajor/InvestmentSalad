package ca.csfoy.investmentSaladApi.controller.exception;

public class ErrorMessageLabel {

	public static final String MSG_0001_UNKNOWN_ID_GET = "%s with id (%s) does not exist and cannot be obtained.";
	public static final String MSG_0006_UNKNOWN_USER_ID_GET = "%s with user_id (%s) does not exist and cannot be obtained.";

	public static final String MSG_0002_UNKNOWN_ID_UPDATE = "%s with id (%s) does not exist and cannot be modified.";
	public static final String MSG_0003_UNKNOWN_ID_DELETE = "%s with id (%s) does not exist and cannot be deleted.";
	public static final String MSG_0004_GET_EMAIL_DOES_NOT_EXIST = "User with email (%s) does not exist.";
	public static final String MSG_0005_DUPLICATE_ID_POST = "%s with id (%s) already exist.";

	public static final String MSG_VAL_GENERIC = "The request didn't pass validation(s).";

	public static final String MSG_VAL_ID_NOT_NULL = "ID must not be null, empty, or blank.";
	public static final String MSG_VAL_NAME_NOT_NULL = "Name must not be null, empty, or blank.";
	public static final String MSG_EMAIL_NOT_NULL = "Email  must not be null, empty, or blank.";
	public static final String MSG_VAL_PASSW_NOT_NULL = "Password must not be null, empty or blank.";

	public static final String MSG_VAL_ID_FORMAT = "ID must be a valid UUID format.";
	public static final String MSG_VAL_EMAIL_FORMAT = "Email must be in a valid email format (xx@yy.zz).";
	public static final String MSG_VAL_ASSET_TYPE = "Asset type (%s) is not a valid asset type.";

	public static final String MSG_VAL_BOTH_ID_EQUALS = "Parameter ID and DTO ID must match in order to update.";

	public static final String MSG_VAL_PASSW_NOT_STRON_ENOUGH = "Password is not strong enough.";

	public static final String MSG_MIN_MAX_PASSWORD_LENGTH_VALIDATION = "Password must have between {min} and {max} characters.";
	public static final String MSG_MIN_MAX_NAME_LENGTH_VALIDATION = "Name must have between {min} and {max} characters.";
	public static final String MSG_VAL_QTY_MIN = "Quantity must be higher or equal to 0.";

	public static final String MSG_CREATE_PORTFOLIO_NAME_AREADY_EXIST = "Portfolio: (name: %s) already exists.";
	public static final String MSG_CREATE_TAG_NAME_AREADY_EXIST = "Tag: (name: %s) already exists.";

	public static final String MSG_CREATE_USER_EMAIL_ALREADY_EXISTS = "User with email %s already exists.";

	public static final String MSG_USER_HAS_NO_DASHBOARD = "This user has no dashboard";

	/***************** ERROR CODES *****************/

	// general

	public static final String CODE_GENERIC_ERROR = "UNKNOWN_ERROR";
	public static final String CODE_INPUT_VALIDATION_GENERIC_ERROR = "VALIDATION_ERROR";
	public static final String CODE_ROUTE_NOT_FOUND = "ROUTE_NOT_FOUND";
	public static final String CODE_OBJECT_NOT_FOUND = "OBJECT_NOT_FOUND";

	// create user
	public static final String CODE_CREATE_USER_EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_TAKEN";

	// login user
	public static final String CODE_LOGIN_INVALID_CREDENTIALS = "INVALID_CREDENTIALS";

}
