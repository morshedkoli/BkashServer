class FormHelper {
  SetEmail(value) {
    sessionStorage.setItem("email", value);
  }

  GetEmail() {
    return sessionStorage.getItem("email");
  }

  SetOTP(value) {
    sessionStorage.setItem("otp", value);
  }

  GetOTP() {
    return sessionStorage.getItem("otp");
  }

  SetRole(value) {
    sessionStorage.setItem("role", value);
  }

  GetRole() {
    return sessionStorage.getItem("role");
  }
}

export const { SetEmail, GetEmail, SetRole, GetRole, SetOTP, GetOTP } =
  new FormHelper();
