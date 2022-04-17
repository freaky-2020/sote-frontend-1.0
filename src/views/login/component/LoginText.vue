<template>
  <div>
    <nav class="menu menu--adsila">
      <a class="menu__item" href="#">
        <span class="menu__item-name">在线考试系统</span>
        <span class="menu__item-label">完备、高效、稳定</span>
      </a>
      <a class="menu__item" href="#">
        <span class="menu__item-name">教考分离</span>
        <span class="menu__item-label">基于创新性教学机制</span>
      </a>
      <a class="menu__item" href="#">
        <span class="menu__item-name">高并发</span>
        <span class="menu__item-label">高可用的分布式架构</span>
      </a>
      <a class="menu__item" href="#">
        <span class="menu__item-name">智能易用</span>
        <span class="menu__item-label">一键导出题目和试卷</span>
      </a>
<!--      <a class="menu__item" href="#">-->
<!--        <span class="menu__item-name">成绩分析</span>-->
<!--        <span class="menu__item-label">可视化分析</span>-->
<!--      </a>-->
      <a class="menu__item" href="#">
        <span class="menu__item-name">防作弊机制</span>
        <span class="menu__item-label">人脸识别、防切屏</span>
      </a>

    </nav>
  </div>
</template>
<script>
export default {
  created() {
    test()
  },
  methods:{
    test(){
      {
        setTimeout(() => document.body.classList.add('render'), 60);
        const navdemos = Array.from(document.querySelectorAll('nav.demos > .demo'));
        const total = navdemos.length;
        const current = navdemos.findIndex(el => el.classList.contains('demo--current'));
        const navigate = (linkEl) => {
          document.body.classList.remove('render');
          document.body.addEventListener('transitionend', () => window.location = linkEl.href);
        };
        navdemos.forEach(link => link.addEventListener('click', (ev) => {
          ev.preventDefault();
          navigate(ev.target);
        }));
        document.addEventListener('keydown', (ev) => {
          const keyCode = ev.keyCode || ev.which;
          let linkEl;
          if ( keyCode === 37 ) {
            linkEl = current > 0 ? navdemos[current-1] : navdemos[total-1];
          }
          else if ( keyCode === 39 ) {
            linkEl = current < total-1 ? navdemos[current+1] : navdemos[0];
          }
          else {
            return false;
          }
          navigate(linkEl);
        });
      }
    }
  }
}

</script>
<style lang="scss"scoped>
*,
*::after,
*::before {
  box-sizing: border-box;
}

html {
  background: #fff;
}

body {
  font-family: 'SimSun', sans-serif;
  min-height: 100vh;
  color: #57585c;
  color: var(--color-text);
  background-color: #fff;
  background-color: var(--color-background);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Color schemes */
.demo-adsila {
  --color-text: #57585c;
  --color-background: #fff;
  --color-link: #5d93d8;
  --color-link-hover: #423c2b;
}

.demo-tsula {
  --color-text: #fafae5;
  --color-background: #222328;
  --color-link: #4f515a;
  --color-link-hover: #fafae5;
}

.demo-inola {
  --color-text: #8c8c8c;
  --color-background: #1f1e1e;
  --color-link: #e5d338;
  --color-link-hover: #8c8c8c;
}

.demo-ama {
  --color-text: #9a9da7;
  --color-background: #fff;
  --color-link: #32343c;
  --color-link-hover: #9a9da7;
}

.demo-yona {
  --color-text: #000;
  --color-background: #4520f3;
  --color-link: #fff;
  --color-link-hover: #000;
}

.demo-salal {
  --color-text: #b5b5b5;
  --color-background: #222325;
  --color-link: #515152;
  --color-link-hover: #fff;
}

.demo-dustu {
  --color-text: #fff;
  --color-background: #161616;
  --color-link: #565656;
  --color-link-hover: #fff;
}

.demo-mohe {
  --color-text: #171754;
  --color-background: #2b34f5;
  --color-link: #9ad6fc;
  --color-link-hover: #171754;
}

/* Fade effect */
.js body {
  opacity: 0;
  transition: opacity 0.3s;
}

.js body.render {
  opacity: 1;
}

a {
  text-decoration: none;
  color: #5d93d8;
  color: var(--color-link);
  outline: none;
}

a:hover{

}
a:focus {
  color: #423c2b;
  color: var(--color-link-hover);
  outline: none;
}

.hidden {
  position: absolute;
  overflow: hidden;
  width: 0;
  height: 0;
  pointer-events: none;
}

/* Icons */
.icon {
  display: block;
  width: 1.5em;
  height: 1.5em;
  margin: 0 auto;
  fill: currentColor;
}

.icon--keyboard {
  display: none;
}

main {
  position: relative;
  width: 100%;
}

.content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0 auto;
  padding: 3em 2em;
}

.content--fixed {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  display: grid;
  align-content: space-between;
  width: 100%;
  max-width: none;
  height: 100vh;
  padding: 1.5em;
  pointer-events: none;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto auto 4em;
  grid-template-areas: 'header ...'
	'... ...'
	'github demos';
}

.content--fixed a {
  pointer-events: auto;
}

/* Header */
.codrops-header {
  position: relative;
  z-index: 100;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  align-items: center;
  align-self: start;
  grid-area: header;
  justify-self: start;
}

.codrops-header__title {
  font-size: 1em;
  font-weight: normal;
  margin: 0;
  padding: 0.75em 0;
}

.info {
  margin: 0 0 0 1.25em;
  color: var(--color-link-hover);
}

.github {
  display: block;
  align-self: end;
  grid-area: github;
  justify-self: start;
}

.demos {
  position: relative;
  display: block;
  align-self: end;
  text-align: center;
  grid-area: demos;
}

.demo {
  margin: 0 0.15em;
}

.demo span {
  white-space: nowrap;
  letter-spacing: 0.1em;
  text-transform: lowercase;
  pointer-events: none;
}

.demo span::before {
  content: '#';
}

a.demo--current {
  pointer-events: none;
  border: 1px solid;
}

/* Top Navigation Style */
.codrops-links {
  position: relative;
  display: flex;
  justify-content: center;
  margin: 0 1em 0 0;
  text-align: center;
  white-space: nowrap;
}

.codrops-icon {
  display: inline-block;
  margin: 0.15em;
  padding: 0.25em;
}

/* Common styles for the menus */
.menu {
  position: relative;
  z-index: 10;
}

.menu__item {
  line-height: 1;
  position: relative;
  display: block;
  margin: 2em 0;
  outline: none;

}

.menu__item-name,
.menu__item-label {
  position: relative;
  display: inline-block;
}

.menu__item-name {
  font-size: 1.25em;
}

.menu__item-label {
  margin: 0 0 0 0.5em;
}

@media screen and (min-width: 50em) {
  .icon--keyboard {
    position: absolute;
    right: 0.55em;
    bottom: -30%;
    display: block;
    width: 54px;
    height: 46px;
    fill: var(--color-link);
  }
  .demos {
    display: flex;
    padding-right: 80px;

    justify-self: end;
  }
  .demo {
    display: block;
    width: 17px;
    height: 17px;
    margin: 0 5px 0 0;
    border: 2px solid;
    border-radius: 2px;
  }
  a.demo--current {
    background: currentColor;
  }
  .demo span {
    position: absolute;
    top: -0.2em;
    right: 100%;
    display: none;
    margin: 0 1em 0 0;
  }
  .demo--current span {
    display: block;
  }
}

@media screen and (max-width: 50em) {
  html,
  body {
    overflow-x: hidden;
    width: 100vw;
    height: 100%;
  }
  .content {
    height: auto;
    min-height: 0;
    padding-bottom: 10em;
  }
  .content--fixed {
    position: relative;
    z-index: 1000;
    display: block;
    padding: 0.85em;
  }
  .codrops-header {
    flex-direction: column;
    align-items: center;
  }
  .codrops-header__title {
    font-weight: bold;
    padding-bottom: 0.25em;
    text-align: center;
  }
  .codrops-links {
    margin: 0;
  }
}
article,aside,details,figcaption,figure,footer,header,hgroup,main,nav,section,summary{display:block;}
audio,canvas,video{display:inline-block;}
audio:not([controls]){display:none;height:0;}
[hidden]{display:none;}
html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;}
body{margin:0;}
a:focus{outline:thin dotted;}
a:active,a:hover{outline:0;}h1{font-size:2em;margin:0.67em 0;}
abbr[title]{border-bottom:1px dotted;}
b,strong{font-weight:bold;}
dfn{font-style:italic;}
hr{-moz-box-sizing:content-box;box-sizing:content-box;height:0;}
mark{background:#ff0;color:#000;}
code,kbd,pre,samp{font-family:monospace,serif;font-size:1em;}
pre{white-space:pre-wrap;}q{quotes:"\201C" "\201D" "\2018" "\2019";}
small{font-size:80%;}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline;}sup{top:-0.5em;}sub{bottom:-0.25em;}img{border:0;}svg:not(:root){overflow:hidden;}figure{margin:0;}fieldset{border:1px solid #c0c0c0;margin:0 2px;padding:0.35em 0.625em 0.75em;}legend{border:0;padding:0;}button,input,select,textarea{font-family:inherit;font-size:100%;margin:0;}button,input{line-height:normal;}button,select{text-transform:none;}button,html input[type="button"],input[type="reset"],input[type="submit"]{-webkit-appearance:button;cursor:pointer;}button[disabled],html input[disabled]{cursor:default;}input[type="checkbox"],input[type="radio"]{box-sizing:border-box;padding:0;}input[type="search"]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}input[type="search"]::-webkit-search-cancel-button,input[type="search"]::-webkit-search-decoration{-webkit-appearance:none;}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0;}textarea{overflow:auto;vertical-align:top;}table{border-collapse:collapse;border-spacing:0;}



.menu--adsila {
  font-family: 'Nunito', sans-serif;
  font-size: 1.15em;
}

.menu--adsila a {
  color: #272727;
  opacity:0.9;
}
.menu--adsila a :hover{
  color: #272727;
  opacity:1!important;
}

.menu--adsila .menu__item-name {
  //font-weight: bold;
  line-height: 1.4;
  padding: 0 0.35em;
  transition: color 0.5s;
  transition-timing-function: cubic-bezier(0.2,1,0.3,1);
}

.menu--adsila .menu__item-name::before {
  content: '';
  position: absolute;
  z-index: -1;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  opacity: 0.3;
  transform: scale3d(0,1,1);
  transform-origin: 0% 50%;
  transition: transform 0.5s;
  transition-timing-function: cubic-bezier(0.2,1,0.3,1);
}

.menu--adsila .menu__item-label {
  font-size: 1em;
  letter-spacing: 0.05em;
  transform: translate3d(-0.5em,0,0);
  transition: transform 0.5s, color 0.5s;
  transition-timing-function: cubic-bezier(0.2,1,0.3,1);
}

.menu--adsila .menu__item-label::before {
  content: '';
  position: absolute;
  z-index: -1;
  top: 1.25em;
  left: 0.05em;
  width: 25%;
  height: 1px;
  opacity: 0.3;
  transform: scale3d(0,1,1);
  transform-origin: 100% 50%;
  transition: transform 0.5s;
  transition-timing-function: cubic-bezier(0.2,1,0.3,1);
}

.menu--adsila .menu__item:nth-child(odd) .menu__item-name::before,
.menu--adsila .menu__item:nth-child(odd) .menu__item-label::before {
  background: #fd9e02;

}

.menu--adsila .menu__item:nth-child(even) .menu__item-name::before,
.menu--adsila .menu__item:nth-child(even) .menu__item-label::before {
  background: #00509d;

}

/* Hover */

.menu--adsila .menu__item:nth-child(odd):hover,
.menu--adsila .menu__item:nth-child(odd):focus {
  color: #fd9e02;
}

.menu--adsila .menu__item:nth-child(even):hover,
.menu--adsila .menu__item:nth-child(even):focus {
  color: #00509d;
}

.menu--adsila .menu__item:hover .menu__item-name::before,
.menu--adsila .menu__item:focus .menu__item-name::before,
.menu--adsila .menu__item:hover .menu__item-label::before,
.menu--adsila .menu__item:focus .menu__item-label::before {
  transform: scale3d(1,1,1);
}

.menu--adsila .menu__item:hover .menu__item-label,
.menu--adsila .menu__item:focus .menu__item-label {
  transform: translate3d(0,0,0);
}

.menu--adsila .menu__item:hover .menu__item-label::before,
.menu--adsila .menu__item:focus .menu__item-label::before {
  transform-origin: 0% 50%;
  transition-timing-function: ease;
}

@media screen and (max-width: 50em) {
  .menu--adsila .menu__item {
    margin: 0 0 2em;
  }
  .menu--adsila .menu__item-label {
    display: block;
    margin: 0.5em 0 0 1em;
  }
}



</style>
