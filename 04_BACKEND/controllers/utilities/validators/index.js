const { validateFirstName, validateLastName, validateCity, validateEmail, validateMobile, validatePassword, validateConfirmPassword } =
	require("./userModelValidators")

module.exports = {
	validateFirstName,
	validateLastName,
	validateCity,
	validateEmail,
	validateMobile,
	validatePassword,
	validateConfirmPassword
};
