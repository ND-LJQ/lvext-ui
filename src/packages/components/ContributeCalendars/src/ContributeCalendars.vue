<!--
 * @Author: ND_LJQ
 * @Date: 2022-11-23 21:27:20
 * @LastEditors: ND_LJQ
 * @LastEditTime: 2022-12-02 21:02:54
 * @Description: 
 * @Email: ndliujunqi@outlook.com
-->
<template>
  <div class="contribution-count" style="width: 100%; height: 100%" @click="getThisDay">
    <div class="contribute-box" style="width: 90%; height: 90%">
      <div class="contribute-container" style="width: 100%; height: 100%"></div>
    </div>
  </div>
</template>

<script lang="ts" setup name="ContributeCalendars">
import { onMounted, defineProps, watch, computed, ref, defineEmits } from 'vue';
import type { PropType } from 'vue';
import type { contributionStyle, SimpleKeyValueObject } from '../../type';

const allInfo: SimpleKeyValueObject = {
  svgWidth: 900,
  svgHeight: 300,
  rectWidth: 11,
  rectHeight: 11,
  colDistance: 16,
  rowDistance: 15,
  rectRoundX: 2,
  rectRoundY: 2,
  tooltipWidth: 200,
  tooltipHeight: 40,
  tooltipRx: 3,
  tooltipRy: 3,
  polygonWidth: 10,
  polygonHeight: 5,
};

let weekList: any = [];

const props = defineProps({
  contribStyle: {
    type: Object as PropType<contributionStyle>,
    default: function () {
      return {};
    },
    required: false,
  },
  contribData: {
    type: Object,
    default: function () {
      return {};
    },
    required: false,
  },
});

const pData = computed(() => {
  return props.contribData;
});

/* eslint-disable */
// eslint-disable-next-line vue/no-setup-props-destructure
// 循环传入contribStyle的参数,并设置值
for (let key in props.contribStyle) {
  allInfo[key] = props.contribStyle[key];
}

const rectAttrInfo = {
  height: allInfo.rectHeight,
  width: allInfo.rectWidth,
  rx: allInfo.rectRoundX,
  ry: allInfo.rectRoundY,
  class: 'ContributionCalendar-day',
  x: 0,
  y: 0,
  'data-count': 0,
  'data-date': '',
  'data-level': 0,
};

// const getGroupNum = () => {
//     const date = new Date();
//     const year = date.getFullYear();
//     let group = 52;
//     let remainder = 0;
//     (year / 4 == 0 && year / 100 != 0) || year / 400 == 0 ? (remainder = 2) : (remainder = 1);
//     return {
//       group,
//       remainder,
//     };
//   };

/**
 * @description: 创建svg标签
 * @param {*} tagName
 * @param {*} attrs
 * @return {*}
 */
const createSvgTag = (tagName: string, attrs?: any) => {
  const ns = 'http://www.w3.org/2000/svg';
  const linkNs = 'http://www.w3.org/1999/xlink';

  let el = document.createElementNS(ns, tagName);
  if (tagName == 'svg') {
    el.setAttribute('xmlns', ns);
  }

  for (const key in attrs) {
    if (key === 'xlink:href') {
      el.setAttributeNS(linkNs, key, attrs[key]);
    } else {
      el.setAttribute(key, attrs[key]);
    }
  }
  return el;
};

let svg = createSvgTag('svg', {
  viewBox: `0,0,${allInfo.svgWidth},${allInfo.svgHeight}`,
});
let mainGroup = createSvgTag('g');
mainGroup.setAttribute('transform', `translate(40,100)`);

const emit = defineEmits(['getThisDay']);

const thisDay = ref('');
let targetE: HTMLElement;
let lastTarget: HTMLElement;
// 获取鼠标位置的元素的属性
const getThisDay = (e: any) => {
  targetE = e.target;
  targetE.setAttribute('select', 'selected');
  let data = targetE.getAttribute('data-date');
  data != null ? (thisDay.value = data) : (thisDay.value = '');
  if (targetE != lastTarget && lastTarget != undefined) {
    lastTarget.removeAttribute('select');
  }
  lastTarget = targetE;
  if (thisDay.value != '') {
    emit('getThisDay', thisDay.value);
  }
};

// 上一个Tooltips
let lastTooltip: SVGElement;
let lastText: SVGElement;
let lastTooltipContent: SVGElement;

/**
 * @description: 移除Tooltips
 * @return {*}
 */
const removeTooltip = () => {
  if (lastTooltip != null) {
    lastTooltip.parentNode!.removeChild(lastTooltip);
  }
  return;
};

/**
 * @description: 使Tooltips展示
 * @param {*} e
 * @return {*}
 */
const showToolTips = (e: any) => {
  const el = e.target;
  const elP = el.parentElement;
  const Date = el.getAttribute('data-date');
  const count = el.getAttribute('data-count');

  const label = count === 0 ? 'No' : new Intl.NumberFormat('en-US').format(count);

  const currentTooltip = createSvgTag('g');

  const currentTooltipFooter = createSvgTag('polygon', {});
  const text = createSvgTag('text', {
    'dominant-baseline': 'middle',
    'text-anchor': 'middle',
    class: 'tips-text',
  });
  currentTooltip.classList.add('svg-tip', 'svg-tip-one-line');
  currentTooltip.style.pointerEvents = 'none';
  let isHidden = true;
  let lastHoverTarget: HTMLElement;
  const currentTooltipContent = createSvgTag('rect', {
    width: allInfo.tooltipWidth,
    height: allInfo.tooltipHeight,
    class: 'tooltip-content',
    rx: allInfo.tooltipRx,
    ry: allInfo.tooltipRy,
  });

  //获得当前元素所在区域的信息
  const elX = Number(elP.getAttribute('moveX'));
  const elY = Number(el.getAttribute('y'));
  const elW = el.getAttribute('width');
  const elH = el.getAttribute('height');
  // console.log(elW,elH,elX,elY);

  //为后续增加tips显示位置位于上下左右做准备,暂时统一在上方
  const tipTopX = elX + elW / 2 - allInfo.tooltipWidth / 2;
  // console.log(elX,elW/2,allInfo.tooltipWidth/2);

  const tipTopY = elY - allInfo.tooltipHeight - allInfo.polygonHeight;
  // console.log(tipTopX,tipTopY);

  const pointY = allInfo.tooltipHeight;
  const tipTriangularX = allInfo.tooltipWidth / 2 - allInfo.polygonWidth / 2;
  const tipTriangularY = allInfo.tooltipWidth / 2 + allInfo.polygonWidth / 2;
  const tipTriangularZ = allInfo.tooltipWidth / 2;

  currentTooltipFooter.setAttribute('class', 'tipTriangular');
  currentTooltipFooter.setAttribute(
    'points',
    `${tipTriangularX},${pointY} ${tipTriangularY},${pointY} ${tipTriangularZ},${
      pointY + allInfo.polygonHeight
    }`
  );

  const tipLeftCenterPointY = elY + elH / 2;
  const tipRightCenterPointX = elX + elW;
  const tipRightCenterPointY = elY + elH / 2;
  const tipBottomCenterPointX = elX + elW / 2;
  const tipBottomCenterPointY = elY + elH;

  // console.log(text.getBoundingClientRect());
  // console.log(currentTooltipContent.getBoundingClientRect());
  // console.log(currentTooltip.getBoundingClientRect());

  // 画tips的主体

  text.innerHTML = `${label} ${count === 1 ? 'contribution' : 'contributions'} on ${Date}`;
  let rightMoreLen = allInfo.svgWidth - (tipTopX + allInfo.tooltipWidth + 30);

  mainGroup.appendChild(currentTooltip);
  currentTooltip.appendChild(currentTooltipContent);
  currentTooltip.appendChild(currentTooltipFooter);
  currentTooltip.appendChild(text);

  if (tipTopX < 0) {
    // console.log("触发1");
    currentTooltipContent.setAttribute('transform', `translate(${-tipTopX},0)`);
    text.setAttribute('x', `${-tipTopX}`);
  } else if (rightMoreLen < 0) {
    currentTooltipContent.setAttribute('transform', `translate(${rightMoreLen - 10},0)`);
    text.setAttribute('x', `${rightMoreLen - 10}`);
  }
  text.setAttribute(
    'transform',
    `translate(${allInfo.tooltipWidth / 2},${allInfo.tooltipHeight / 2})`
  );
  currentTooltip.setAttribute('transform', `translate(${tipTopX},${tipTopY})`);
  currentTooltip.setAttribute('visibility', 'visible');

  lastTooltip = currentTooltip;
};

onMounted(() => {
  // 在js中svg标签不能简单的通过createElement来创建, 必须使用createElementNs来创建, 即需要指定命名空间(NameSpace)
  // 封装一个创建svg标签的函数

  const containerBox = document.querySelector('.contribute-container');

  containerBox?.appendChild(svg);

  // const info = getGroupNum();

  watch(
    pData,
    (newV, oldV) => {
      weekList = newV.weeks;

      for (let i = 0; i < weekList.length; i++) {
        let weakGroup = createSvgTag('g');
        let thisWeek = weekList[i];

        weakGroup.setAttribute('transform', `translate(${allInfo.colDistance * i},0)`);
        weakGroup.setAttribute('moveX', `${allInfo.colDistance * i}`);
        for (let j = 0; j < thisWeek.days.length; j++) {
          let thisDay = thisWeek.days[j];
          let rectItem = createSvgTag('rect', rectAttrInfo);
          const rd = allInfo.rowDistance! * j;
          rectItem.setAttribute('y', rd.toString());
          rectItem.setAttribute('data-level', thisDay.level);
          rectItem.setAttribute('data-date', thisDay.date);
          rectItem.setAttribute('data-count', thisDay.count);
          rectItem.addEventListener('mouseover', showToolTips);
          rectItem.addEventListener('mouseout', removeTooltip);
          weakGroup.appendChild(rectItem);
        }
        mainGroup.appendChild(weakGroup);
      }

      let months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

      // 月份

      for (let i = 0; i < 12; i++) {
        const label = createSvgTag('text');
        label.setAttribute('class', 'ContributionCalendar-label');
        label.innerHTML = months[i];
        label.setAttribute('x', `${((allInfo.svgWidth - 192) / 9) * i}`);
        label.setAttribute('y', '-8');
        mainGroup.appendChild(label);
      }

      // 周

      for (let i = 0; i < 7; i++) {
        if (i % 2 == 0) {
          const label = createSvgTag('text');
          label.setAttribute('class', 'ContributionCalendar-label');
          label.innerHTML = days[i];
          label.setAttribute('x', '-30');
          label.setAttribute('y', `${5 + (allInfo.svgHeight / 20) * i}`);
          mainGroup.appendChild(label);
        }
      }

      svg.appendChild(mainGroup);

      // svg.addEventListener('click',getNowEl)
    },
    {
      deep: true,
    }
  );
});
</script>

<style>
.ContributionCalendar-day:hover {
  stroke: black;
  stroke-width: 1;
}

.ContributionCalendar-day[select='selected'] {
  stroke: black;
  stroke-width: 1;
}

.ContributionCalendar-day[data-level='0'] {
  fill: #ebedf0;
  /* 以平滑的曲线渲染 */
  shape-rendering: geometricPrecision;
  outline: 1px solid rgba(27, 31, 35, 0.06);
  outline-offset: -1px;
}

.ContributionCalendar-day[data-level='1'] {
  fill: #9be9a8;
  outline: 1px solid rgba(27, 31, 35, 0.06);
}

.ContributionCalendar-day[data-level='2'] {
  fill: #40c463;
  outline: 1px solid rgba(27, 31, 35, 0.06);
}

.ContributionCalendar-day[data-level='3'] {
  fill: #30a14e;
  outline: 1px solid rgba(27, 31, 35, 0.06);
}

.ContributionCalendar-day[data-level='4'] {
  fill: #216e39;
  /* 以平滑的曲线渲染 */
  outline: 1px solid rgba(27, 31, 35, 0.06);
}

.ContributionCalendar-label {
  font-size: 12px;
  fill: #24292f;
}

.tips {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 100;
  width: 100px;
  height: 35px;
  border-radius: 5px;
  background-color: black;
}

.tipTriangular {
  fill: black;
}

.tooltip-content {
  /* fill:#24292f; */
  width: 200;
  height: 100;
}

.tips-text {
  font-size: 12px;
  fill: #fff;
}
</style>
