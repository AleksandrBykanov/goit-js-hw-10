import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('form')

form.addEventListener('submit', createPromise);

function createPromise (e) {
  e.preventDefault();
  const delay = e.target.delay.value;
  const state = e.target.state.value;
  const promise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay)
  });

  promise.then(delay=>{
    iziToast.show({
      message: `✅ Fulfilled promise in ${delay}ms`,
      position: 'topRight',
      color: 'rgb(45, 255, 3)',
      messageColor: 'black',
  });
  }).catch(delay=>{
    iziToast.show({
      message: `❌ Rejected promise in ${delay}ms`,
      position: 'topRight',
      color: '#ff0000',
      messageColor: 'black',
  });
  })
};

