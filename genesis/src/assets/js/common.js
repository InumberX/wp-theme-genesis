import { breakpoints } from '~/assets/ts/breakpoints';
import { viewport } from '~/assets/ts/viewport';
import { smoothScroll } from '~/assets/ts/smoothScroll';
import { accordion } from '~/assets/ts/accordion';
import { tab } from '~/assets/ts/tab';
/* ------------------------------------------
  初期表示時の処理
-------------------------------------------- */
window.addEventListener('DOMContentLoaded', () => {
    /* ------------------------------------------
      画面サイズを確認
    -------------------------------------------- */
    breakpoints.init();
    /* ------------------------------------------
      ビューポート
    -------------------------------------------- */
    viewport.init();
    /* ------------------------------------------
      スムーススクロール
    -------------------------------------------- */
    smoothScroll.init();
    /* ------------------------------------------
      アコーディオン
    -------------------------------------------- */
    accordion.init();
    /* ------------------------------------------
      タブ
    -------------------------------------------- */
    tab.init();
});