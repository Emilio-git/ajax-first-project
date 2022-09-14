'use sctict';

document.addEventListener('DOMContentLoaded', () => {
   const inputRub = document.querySelector('#rub'),
         inputUsd = document.querySelector('#usd');

   inputRub.addEventListener('input', (e) => {
      const currencyRub = e.target.id;
      requestForCurrency(currencyRub);
   });

   inputUsd.addEventListener('input', (e) => {
      const currencyUsd = e.target.id;
      requestForCurrency(currencyUsd);
   });

   function requestForCurrency(currency) {
      const request = new XMLHttpRequest();

      request.open('GET', 'js/currency.json');
      request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      request.send();

      if (currency === 'rub') {
         request.addEventListener('load', () => {
            if(request.status === 200) {
               const data = JSON.parse(request.response);
               inputUsd.value = (+inputRub.value / data.currency.usd).toFixed(2);
            } else {
               inputUsd.value = 'Что-то пошло не так';
            }
         });
      } else if (currency === 'usd') {
         request.addEventListener('load', () => {
            if(request.status === 200) {
               const data = JSON.parse(request.response);
               inputRub.value = (+inputUsd.value * data.currency.usd).toFixed(2);
            } else {
               inputRub.value = 'Что-то пошло не так';
            }
         });
      } else {
         console.log('Error');
      }
   }
});