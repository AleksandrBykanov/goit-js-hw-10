import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const timer = {
  date: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]')
}

let userSelectedDate;
timer.startBtn.disabled = true;
timer.stopBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      iziToast.show({
        position: 'topCenter',
        message: 'Please choose a date in the future'
      });
      timer.startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      console.log(userSelectedDate);
      timer.startBtn.disabled = false;
      timer.stopBtn.disabled = false;
      }
  },
};

flatpickr('input', options);


timer.startBtn.addEventListener('click', ()=>{
const initTime = new Date(timer.date.value);

  userSelectedDate = setInterval(()=>{
    const currentTime = Date.now();
    const diff = initTime - currentTime;
    const { days, hours, minutes, seconds } = convertMs(diff);
    timer.days.textContent = addLeadingZero(days);
    timer.hours.textContent = addLeadingZero(hours);
    timer.minutes.textContent = addLeadingZero(minutes);
    timer.seconds.textContent = addLeadingZero(seconds);
  }, 1000);

  setTimeout(()=>{
    clearInterval(userSelectedDate);
  }, initTime - Date.now());

  timer.startBtn.disabled = true;
  timer.stopBtn.disabled = false;
});

timer.stopBtn.addEventListener('click', ()=>{
  clearInterval(userSelectedDate)
  timer.startBtn.disabled = false;
  timer.stopBtn.disabled = true;
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}