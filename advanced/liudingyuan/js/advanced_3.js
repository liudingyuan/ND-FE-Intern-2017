function getPosition (element) {
  const elPosition = element.getBoundingClientRect();
  return {
    x: elPosition.left,
    y: elPosition.top
  };
}

(function () {
  const containers = document.querySelectorAll('.container');
  const containerArr = [];
  let dropObj = null;
  let initX = 0;
  let initY = 0;
  let difX = 0;
  let difY = 0;

  // 存储每个容器及其对应的中心坐标
  containers.forEach(function (el) {
    containerArr.push({
      el,
      x: getPosition(el).x + el.clientWidth / 2,
      y: getPosition(el).y + el.clientHeight / 2
    });
  });

  // 监听拖动目标与每个容器和每个box的位置关系
  function listenDistance (target, compareArr) {
    const centerX = target.clientWidth / 2;
    const centerY = target.clientHeight / 2;
    const targetX = getPosition(target).x + centerX;
    const targetY = getPosition(target).y + centerY;

    compareArr.forEach(function (item) {
      const spacingX = Math.abs(item.x - targetX);
      const spacingY = Math.abs(item.y - targetY);
      // 拖动目标进入容器超过本身一半面积
      if (spacingX <= centerX && spacingY <= (item.el.clientHeight / 2)) {
        console.log('过半');
        item.isHalf = true;
        item.el.classList.add('active');

        const boxes = item.el.querySelectorAll('.box');
        boxes.forEach(function (box) {
          if (box !== target) {
            const boxX = getPosition(box).x + centerX;
            const boxY = getPosition(box).y + centerY;
            if (Math.abs(targetX - boxX) <= centerX && Math.abs(targetY - boxY) <= centerY) {
              box.classList.add('active-box');
            } else {
              box.classList.remove('active-box');
            }
          }
        });
      } else {
        item.isHalf = false;
        item.el.classList.remove('active');
        const box = item.el.querySelector('.active-box');
        if (box) { box.classList.remove('active-box'); }
      }
    });
  }

  // 将拖放目标放置在指定位置
  function toggleContainer (target, referenceEl, selector) {
    selector.insertBefore(target, referenceEl);
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

      listenDistance(dropObj, containerArr);
    }
  };
  document.onmouseup = function () {
    if (dropObj) {
      let container = null;
      let box = null;
      for (const item of containerArr) {
        if (item.isHalf) {
          container = item.el;
          box = item.el.querySelector('.active-box');
          break;
        }
      }

      if (container) {
        dropObj.style.left = 'auto';
        dropObj.style.top = 'auto';
        toggleContainer(dropObj, box, container);
        if (box) { box.classList.remove('active-box'); }
      } else {
        dropObj.style.left = initX + 'px';
        dropObj.style.top = initY + 'px';
      }

      dropObj.classList.remove('drop');
      dropObj.classList.add('flash');
      dropObj.addEventListener('animationend', function () { this.classList.remove('flash'); }, false);
      dropObj = null;
      for (const item of containers) {
        item.classList.remove('active');
      }
    }
  };
})();
