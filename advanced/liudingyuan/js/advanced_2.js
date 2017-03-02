(function () {
  const inputText = $('.input-time');
  const btn = $('button');
  const tip = $('.tips');
  const countdown = $('.countdown');

  function check (date) {
    let arr = date.split('-');
    arr = arr.map(function (value) {
      if (value[0] === '0') {
        return value.substring(1, value.length);
      } else {
        return value;
      }
    });
    return arr;
  }

  function setCountdown (date) {
    const dateArr = check(date);
    const currentTime = new Date().getTime();
    const targetTime = new Date(dateArr.join('-')).getTime();
    const difTime = targetTime - currentTime;

    if (difTime > 0) {
      const day = parseInt(difTime / (24 * 3600 * 1000));
      const hours = parseInt((difTime / (3600 * 1000)) % 24);
      const min = parseInt((difTime / (60 * 1000)) % 60);
      const sec = parseInt((difTime / 1000) % 60);

      countdown.innerHTML = `${day}天${hours}小时${min}分${sec}秒`;
      const timer = setTimeout(setCountdown, 1000, date);
      console.log(timer);
    } else {
      countdown.innerHTML = 'time up';
    }
  }

  addEvent(btn, 'click', function () {
    const date = inputText.value;
    const dateArr = check(date);
    tip.innerHTML = `距离${dateArr[0]}年${dateArr[1]}月${dateArr[2]}日还有`;
    setCountdown(date);
  });
})();
