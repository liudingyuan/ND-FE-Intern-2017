(function () {
  const containers = document.querySelectorAll('.container');
  const positionArr = [];
  let dropObj = null;
  let initX = 0;
  let initY = 0;
  let difX = 0;
  let difY = 0;

  // 存储每个容器及其对应的中心坐标
  containers.forEach(function (el) {
    positionArr.push({
      el,
      x: getPosition(el).x + el.clientWidth / 2,
      y: getPosition(el).y + el.clientHeight / 2
    });
  });

  // 监听拖动目标与每个容器的位置关系
  function listenDistance (target, compareArr) {
    const centerX = target.clientWidth / 2;
    const centerY = target.clientHeight / 2;
    const targetX = getPosition(target).x + centerX;
    const targetY = getPosition(target).y + centerY;

    compareArr.forEach(function (item) {
      if (Math.abs(item.x - targetX) === centerX) {
        console.log('过半');
      }
    });
  }

  document.onmousedown = function (e) {
    const target = e.target;
    if (target.classList.contains('box')) {
      dropObj = e.target;
      initX = getPosition(target).x;
      initY = getPosition(target).y;
      difX = e.offsetX;
      difY = e.offsetY;
    }
  };
  document.onmousemove = function (e) {
    if (dropObj) {
      dropObj.classList.add('drop');
      dropObj.style.left = e.clientX - difX + 'px';
      dropObj.style.top = e.clientY - difY + 'px';

      listenDistance(dropObj, positionArr);
    }
  };
  document.onmouseup = function () {
    if (dropObj) {
      dropObj.style.left = initX + 'px';
      dropObj.style.top = initY + 'px';
      dropObj.classList.remove('drop');
    }
    dropObj = null;
  };
})();
