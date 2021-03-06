import { characterLimit } from "../constants/constant";
import { showErrorAlert } from "./info";
let passwordErr = `Password should be atleast ${characterLimit.password} characters`
let matchErr = `Password and confirm password not matched`
let emailErr = `Please enter valid email`
let LengtErr = 'Please enter '
let selectErr = 'Please enter '
export function isValidEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!reg.test(email)) {
    showErrorAlert(emailErr, "Error")
  }
  else {
    return true
  }
}


export function isValidPassword(pass) {
  if (pass.length < characterLimit.password) {
    showErrorAlert(passwordErr, "Error")
  }
  else {
    return true
  }
}

export function isPasswordMatched(pass, repass) {
  if (pass !== repass) {
    showErrorAlert(matchErr, "Error")
  }
  else {
    return true
  }
}


export function isEmptyFeild(val, data) {
  if (val.trim() == "") {
    showErrorAlert(selectErr + data, "Error")
  }
  else {
    return true
  }
}

export function validLogin(email, password) {
  if (isValidEmail(email) && isValidPassword(password)) {
    return true
  }
}