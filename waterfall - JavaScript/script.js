window.onload = function () {
  waterfall('main', 'box');
  let dataInt = {
    data: [
      {src: '1.jpeg'},
      {src: '2.jpeg'},
      {src: '3.jpeg'}
    ]
  }
  window.onscroll = () => {
    if (checkScrollSlide()) {
      // 将数据块渲染到当前页面的尾部
      for (let i = 0; i < dataInt.data.length; i++) {
        let oParent = document.getElementById('main');
        let oBox = document.createElement('div');
        oBox.className = 'box';
        oParent.appendChild(oBox);
        let oPic = document.createElement('div');
        oPic.className = 'pic';
        oBox.appendChild(oPic);
        let oImg = document.createElement('img');
        oImg.src = `images/${dataInt.data[i].src}`;
        oPic.appendChild(oImg);
      }
      waterfall('main', 'box');
    }
  };
};

const waterfall = (parent, box) => {
  // 将main下的所有class为box的元素取出来
  let oParent = document.getElementById(parent);
  let oBoxs = getByClass(oParent, box);
  // 计算整个页面显示的列数（页面宽/box的宽）
  let oBoxW = oBoxs[0].offsetWidth;
  let cols = Math.floor(document.documentElement.clientWidth / oBoxW);
  // 设置main的宽
  oParent.style.cssText = 'width:' + oBoxW * cols + 'px; margin: 0 auto;';
  let hArr = []; // 存放每一列高度的数组
  for (let i = 0; i < oBoxs.length; i++) {
    if (i < cols) {
      hArr.push(oBoxs[i].offsetHeight);
    } else {
      let minH = Math.min.apply(null, hArr);
      let index = getMinHIndex(hArr, minH);
      oBoxs[i].style.position = 'absolute';
      oBoxs[i].style.top = minH + 'px';
      // oBoxs[i].style.left = oBoxW * index + 'px';
      oBoxs[i].style.left = oBoxs[index].offsetLeft + 'px';
      hArr[index] += oBoxs[i].offsetHeight;
    }
  }
};

// 根据class获取元素
const getByClass = (parent, className) => {
  let boxArr = []; // 用来存储获取到的所有class为box的元素
  let oElements = parent.getElementsByTagName('*');
  for (let i = 0; i < oElements.length; i++) {
    if (oElements[i].className === className) {
      boxArr.push(oElements[i]);
    }
  }
  return boxArr;
};

const getMinHIndex = (arr, val) => {
  let min = arr.findIndex(i => i === val);
  return min;
};

//  检测是否具备了滚动条加载数据块的条件
const checkScrollSlide = () => {
  let oParent = document.getElementById('main');
  let oBoxs = getByClass(oParent, 'box');
  let lastBoxH = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length - 1].offsetHeight / 2);
  let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.body.clientHeight || document.documentElement.clientHeight;
  return lastBoxH < scrollTop + height;
}
