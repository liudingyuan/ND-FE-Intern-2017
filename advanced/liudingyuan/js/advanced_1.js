(function () {
  const inputBox = $('textarea');
  const btn = $('button');
  const err = $('.error-text');
  const outputBox = $('.output-content');

  function formatInput (text) {
    const newArr = [];
    const arr = uniqArray(text.split(/\n|\s|,|，|\.|;|；/g));
    for (const x of arr) {
      if (x !== '') { newArr.push(x); }
    }
    return newArr;
  }

  btn.onclick = function () {
    const inputText = inputBox.value;
    const inputArr = formatInput(inputText);
    let outputHtml = '';
    for (const value of inputArr) {
      outputHtml += `<input type="checkbox" checked>
                     <label>${value}</label>`;
    }
    outputBox.innerHTML = outputHtml;
  };
  addEvent(inputBox, 'input', function () {
    if (inputBox.value === '') {
      err.innerHTML = '请输入';
    } else if (formatInput(inputBox.value).length > 10) {
      err.innerHTML = '只能输入10个爱好!';
      btn.disabled = true;
    } else {
      err.innerHTML = '';
      btn.disabled = false;
    }
  });

})();
