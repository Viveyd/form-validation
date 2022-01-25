/* Valid input sample

sampleEmail@yahoo.com
America
41326
abcDEF123!@

*/



const form = document.querySelector('form');
const email = document.querySelector('#input-email');
const country = document.querySelector('#input-country');
const zip = document.querySelector('#input-zip');
const password = document.querySelector('#input-pw1');
const confirmpw = document.querySelector('#input-pw2');
const btn = document.querySelector('button');

const inputEls = [email, country, zip, password, confirmpw];

const validityMessages = {
  email: {
    valueMissing: 'This field is required',
    tooShort: 'Your email is too short.',
    tooLong: 'Your email is too long.',
    typeMismatch: 'Your email is not valid.',
  },
  country: {
    valueMissing: 'This field is required',
    tooShort: 'Invalid country name',
    tooLong: 'Invalid country name',
    typeMismatch: 'Invalid country name',
    patternMismatch: 'Invalid country name',
  },
  zip: {
    valueMissing: 'This field is required',
    tooShort: 'Zip code must have at least 4 numbers',
    tooLong: 'Zip code must have maximum 5 characters(numbers).',
    typeMismatch: 'Invalid zip code.',
    patternMismatch: 'Zip code is using invalid format.',
  },
  pw1: {
    valueMissing: 'Password cannot be empty',
    tooShort: 'Password must be at least 10 characters.',
    tooLong: 'Password cannot be more than 20 characters.',
    typeMismatch: 'Password must have lowercase, uppercase, numbers, and special characters.',
    patternMismatch: 'Password must have lowercase, uppercase, numbers, and special characters.',
  },
  pw2: {
    noMatch: 'Please check if your passwords match.',
    valueMissing: 'Password cannot be empty',
    tooShort: 'Password must be at least 10 characters.',
    tooLong: 'Password cannot be more than 20 characters.',
    typeMismatch: 'Invalid password format.',
    patternMismatch: 'Password must have lowercase, uppercase, numbers, and special characters.',
  },

}

email.addEventListener('input', checkValidity)
country.addEventListener('input', checkValidity)
zip.addEventListener('input', checkValidity)
password.addEventListener('input', checkValidity)
confirmpw.addEventListener('input', checkValidity)
btn.addEventListener('click', submitForm)

function checkValidity(e, el){
  const element = el || this;
  // console.log('is valid? '+element.validity.customError);
  if(element.validity.valid == false || passwordsDontMatch(element)){
    element.classList.add('invalid');
    reportError(element);
  }
  else{
    element.classList.remove('invalid');
    removeErrorOf(element);
}
}

function passwordsDontMatch(element){
  if((element === confirmpw && confirmpw.value !== password.value ) || (element === password && confirmpw.value !== password.value )){
    return true;
  } else return false;
}

function submitForm(e){
  e.preventDefault();
  inputEls.forEach( (input) => checkValidity(e, input));
  if([... form.querySelectorAll('span')].filter(span => span.textContent !== '').length === 0){
    console.log('Form submitted successfully.');
    alert('Form submitted successfully');
  } else{
    console.log('Form could not be submitted.');
    alert('Form could not be submitted');
  }
}


function reportError(element){
  const key = element.id.split('-')[1];
  if(element == confirmpw && confirmpw.value !== password.value){
    element.setCustomValidity(validityMessages[key].noMatch);
  } else if(element.validity.valueMissing){
    element.setCustomValidity(validityMessages[key].valueMissing);
  } else if(element.validity.tooShort){
    element.setCustomValidity(validityMessages[key].tooShort);
  } else if(element.validity.tooLong){
    element.setCustomValidity(validityMessages[key].tooLong);
  } else if(element.validity.typeMismatch){
    element.setCustomValidity(validityMessages[key].typeMismatch);
  } else if(element.validity.patternMismatch){
    element.setCustomValidity(validityMessages[key].patternMismatch);
  } else{
    element.setCustomValidity('');
    element.classList.remove('invalid');
  }
  if (element == password){
    const confirmKey = confirmpw.id.split('-')[1];
    if(password.value !== confirmpw.value){
      confirmpw.setCustomValidity(validityMessages[confirmKey].noMatch);
      showErrorOf(confirmpw); 
    }
    else{
      removeErrorOf(confirmpw);
    }
  }
  showErrorOf(element);
}

function showErrorOf(element){
  element.nextElementSibling.textContent = element.validationMessage;
}

function removeErrorOf(element){
  element.nextElementSibling.textContent = '';
}
