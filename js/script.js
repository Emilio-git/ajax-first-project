document.addEventListener('DOMContentLoaded', () => {
   const inputRub = document.querySelector('#rub'),
         inputUsd = document.querySelector('#usd');

   inputRub.addEventListener('input', () => {
      // console.log('Hie');
      const request = new XMLHttpRequest();

      request.open('GET', 'js/currency.json');
      request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      request.send();

      request.addEventListener('load', () => {
         if(request.status === 200) {
            const data = JSON.parse(request.response);

            inputUsd.value = (+inputRub.value / data.currency.usd).toFixed(2);
         } else {
            inputUsd.value = 'Что-то пошло не так';
         }
      });
   });
});