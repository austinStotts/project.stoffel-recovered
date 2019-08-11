const validateEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
const validateNames = (firstName, lastName) => {
  return firstName.length > 1 && lastName.length > 1;
  //todo
};
const validateURL = fbURL => {
  let split = fbURL.slice(0, 25);
  const first = "https://www.facebook.com/";
  return fbURL.length > 24 && split === first;
  //todo
};
const validateNumber = phone => {
  const re = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
  return re.test(String(phone));
  //todo
};

export const formValidator = ({
  firstName,
  lastName,
  fbEmail,
  fbProfileURL,
  phoneNumber
}) => {
  //todo
  if (validateNames(firstName, lastName)) {
    //continue
    if (validateEmail(fbEmail)) {
      //continue
      if (validateURL(fbProfileURL)) {
        //continue
        if (validateNumber(phoneNumber)) {
          return { result: true };
        } else {
          return { result: false, code: 1 };
        }
      } else {
        return { result: false, code: 2 };
      }
    } else {
      return { result: false, code: 3 };
    }
  } else {
    return { result: false, code: 4 };
  }
};
