<?php
/* ---------------------------------------
  メニューの設定
--------------------------------------- */
function menu_setup()
{
  register_nav_menus(array(
    'header' => 'ヘッダーメニュー',
    'footer' => 'フッターメニュー',
  ));
}

add_action('after_setup_theme', 'menu_setup');

class Custom_Walker_Header_Menu extends Walker_Nav_Menu
{
  // 開始タグのカスタマイズ
  function start_lvl(&$output, $depth = 0, $args = array())
  {
    $output .= "\n<ul class=\"LayoutHeaderMenuGlobal__items\">\n";
  }

  // 各メニュー項目のカスタマイズ
  function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0)
  {
    // target と rel の属性を設定
    $target = !empty($item->target) && $item->target === '_blank' ? ' target="_blank"' : '';
    $rel = !empty($item->target) && $item->target === '_blank' ? ' rel="noopener noreferrer"' : '';

    // クラス属性を設定
    $classes = empty($item->classes) ? array() : (array) $item->classes;
    $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args));
    $class_names = ' class="LayoutHeaderMenuGlobalLink' . ($class_names ? ' ' . esc_attr($class_names) : '') . '"';

    $output .= "<li class=\"LayoutHeaderMenuGlobal__item\">\n";
    $title = apply_filters('the_title', $item->title, $item->ID);

    // target、rel、および class 属性を追加
    $output .= '<a href="' . esc_attr($item->url) . '"' . $target . $rel . $class_names . ">\n";
    $output .= "<span class=\"LayoutHeaderMenuGlobalLink__contents\">\n";
    $output .= "<span class=\"LayoutHeaderMenuGlobalLink__text\">\n";
    $output .= esc_html($title) . "\n";
    $output .= "</span>\n";
    $output .= "</span>\n";
    $output .= "</a>\n";
  }

  // メニュー項目の終了タグのカスタマイズ
  function end_el(&$output, $item, $depth = 0, $args = array())
  {
    $output .= "</li>\n";
  }

  // 終了タグのカスタマイズ
  function end_lvl(&$output, $depth = 0, $args = array())
  {
    $output .= "</ul>\n";
  }
}

class Custom_Walker_Footer_Menu_Global extends Walker_Nav_Menu
{
  // 開始タグのカスタマイズ
  function start_lvl(&$output, $depth = 0, $args = array())
  {
    $output .= "\n<ul class=\"LayoutFooterMenuGlobal__items\">\n";
  }

  // 各メニュー項目のカスタマイズ
  function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0)
  {
    // target と rel の属性を設定
    $target = !empty($item->target) && $item->target === '_blank' ? ' target="_blank"' : '';
    $rel = !empty($item->target) && $item->target === '_blank' ? ' rel="noopener noreferrer"' : '';

    // クラス属性を設定
    $classes = empty($item->classes) ? array() : (array) $item->classes;
    $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args));
    $class_names = ' class="LayoutFooterMenuGlobalLink' . ($class_names ? ' ' . esc_attr($class_names) : '') . '"';

    $output .= "<li class=\"LayoutFooterMenuGlobal__item\">\n";
    $title = apply_filters('the_title', $item->title, $item->ID);

    // target、rel、および class 属性を追加
    $output .= '<a href="' . esc_attr($item->url) . '"' . $target . $rel . $class_names . ">\n";
    $output .= "<span class=\"LayoutFooterMenuGlobalLink__contents\">\n";
    $output .= "<span class=\"LayoutFooterMenuGlobalLink__text\">\n";
    $output .= esc_html($title) . "\n";
    $output .= "</span>\n";
    $output .= "</span>\n";
    $output .= "</a>\n";
  }

  // メニュー項目の終了タグのカスタマイズ
  function end_el(&$output, $item, $depth = 0, $args = array())
  {
    $output .= "</li>\n";
  }

  // 終了タグのカスタマイズ
  function end_lvl(&$output, $depth = 0, $args = array())
  {
    $output .= "</ul>\n";
  }
}
