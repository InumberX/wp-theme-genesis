<?php
/*------------------------------------------
  CSS・JS設定
--------------------------------------------*/
function add_scripts()
{
  $name = 'genesis-';
  $style_name = $name . 'style';
  $script_name = $name . 'script';

  wp_enqueue_style(
    $style_name,
    get_stylesheet_directory_uri() . '/style.css',
    array(),
    date('YmdHis', filemtime(get_theme_file_path('style.css')))
  );

  wp_enqueue_style(
    $style_name . '-common',
    get_stylesheet_directory_uri() . '/assets/css/common.css',
    array($style_name),
    date('YmdHis', filemtime(get_theme_file_path('assets/css/common.css')))
  );

  wp_enqueue_script(
    $script_name . '-jquery',
    get_stylesheet_directory_uri() . '/assets/js/lib/jquery.min.js',
    array(),
    date('YmdHis', filemtime(get_theme_file_path('assets/js/lib/jquery.min.js')))
  );

  wp_enqueue_script(
    $script_name . '-common',
    get_stylesheet_directory_uri() . '/assets/js/common.js',
    array($script_name . '-jquery'),
    date('YmdHis', filemtime(get_theme_file_path('assets/js/common.js')))
  );
}

add_action('wp_enqueue_scripts', 'add_scripts');

// デフォルトのjQueryを削除する処理
function delete_scripts()
{
  wp_deregister_script('jquery');
}

add_action('wp_enqueue_scripts', 'delete_scripts');

// 管理画面用のCSSを追加
function add_admin_styles()
{
  wp_enqueue_style(
    'admin-style',
    get_stylesheet_directory_uri() . '/assets/css/admin.css',
    array(),
    date('YmdHis', filemtime(get_theme_file_path('assets/css/admin.css')))
  );
}

add_action('admin_enqueue_scripts', 'add_admin_styles');
