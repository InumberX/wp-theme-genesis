<?php
/*------------------------------------------
  基本設定
--------------------------------------------*/
function custom_setup()
{
  // 管理バーを非表示にする
  add_filter('show_admin_bar', '__return_false');

  // アイキャッチ画像のサポートを追加
  add_theme_support('post-thumbnails');
}

add_action('after_setup_theme', 'custom_setup');

function custom_init()
{
  // 不要設定の削除
  remove_action('wp_head', 'print_emoji_detection_script', 7);
  remove_action('admin_print_scripts', 'print_emoji_detection_script');
  remove_action('wp_print_styles', 'print_emoji_styles');
  remove_action('admin_print_styles', 'print_emoji_styles');
  remove_filter('the_content_feed', 'wp_staticize_emoji');
  remove_filter('comment_text_rss', 'wp_staticize_emoji');
  remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
  remove_action('wp_head', 'wp_generator');
  remove_action('wp_head', 'rsd_link');
  remove_action('wp_head', 'wlwmanifest_link');
  remove_action('wp_head', 'index_rel_link');
  remove_action('wp_head', 'parent_post_rel_link', 10, 0);
  remove_action('wp_head', 'start_post_rel_link', 10, 0);
  remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
  remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');
  remove_action('wp_enqueue_scripts', 'wp_common_block_scripts_and_styles');
  remove_action('wp_head', 'feed_links', 2);
  remove_action('wp_head', 'feed_links_extra', 3);
  remove_action('wp_head', 'rest_output_link_wp_head', 10);
  remove_action('wp_head', 'wp_oembed_add_discovery_links', 10);
  remove_action('wp_head', 'wp_shortlink_wp_head', 10);
  remove_action('wp_head', 'wp_oembed_add_discovery_links', 10);
  remove_action('wp_head', 'wp_oembed_add_host_js');
}

add_action('init', 'custom_init');

function custom_late_init()
{
  remove_action('wp_head', '_block_template_viewport_meta_tag', 0);
}

add_action('pre_get_posts', 'custom_late_init');


/* ---------------------------------------
  管理画面カスタマイズ
--------------------------------------- */
function remove_dashboard_widgets()
{
  global $wp_meta_boxes;
  // 現在の状況
  unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_right_now']);
  // アクティビティ
  unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_activity']);
  // 最近のコメント
  unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_comments']);
  // 被リンク
  unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_incoming_links']);
  // プラグイン
  unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_plugins']);
  // サイトヘルス
  // unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_site_health']);
  // クイック投稿
  unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press']);
  // 最近の下書き
  unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_recent_drafts']);
  // WordPressブログ
  unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_primary']);
  // WordPressフォーラム
  unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_secondary']);
}

add_action('wp_dashboard_setup', 'remove_dashboard_widgets');

remove_action('welcome_panel', 'wp_welcome_panel');

function remove_menus()
{
  // ダッシュボード
  // remove_menu_page('index.php');
  // 投稿
  // remove_menu_page('edit.php');
  // メディア
  // remove_menu_page('upload.php');
  // 固定
  // remove_menu_page('edit.php?post_type=page');
  // コメント
  remove_menu_page('edit-comments.php');

  if (!current_user_can('administrator')) {
    // 外観
    remove_menu_page('themes.php');
    // プラグイン
    remove_menu_page('plugins.php');
    // ユーザー
    remove_menu_page('users.php');
    // ツール
    remove_menu_page('tools.php');
    // 設定
    remove_menu_page('options-general.php');
  }
}

add_action('admin_menu', 'remove_menus');

function custom_setup_post_support()
{
  // タイトル
  // remove_post_type_support('post', 'title');
  // 本文
  // remove_post_type_support('post', 'editor');
  // 作成者
  // remove_post_type_support('post', 'author');
  // アイキャッチ画像
  // remove_post_type_support('post', 'thumbnail');
  // 抜粋
  // remove_post_type_support('post', 'excerpt');
  // トラックバック
  remove_post_type_support('post', 'trackbacks');
  // カスタムフィールド
  // remove_post_type_support('post', 'custom-fields');
  // コメント
  remove_post_type_support('post', 'comments');
  // リビジョン
  // remove_post_type_support('post', 'revisions');
  // 表示順
  // remove_post_type_support('post', 'page-attributes');
  // 投稿フォーマット
  // remove_post_type_support('post', 'post-formats');

  // タイトル
  // remove_post_type_support('page', 'title');
  // 本文
  // remove_post_type_support('page', 'editor');
  // 作成者
  // remove_post_type_support('page', 'author');
  // アイキャッチ画像
  add_post_type_support('page', 'thumbnail');
  // 抜粋
  add_post_type_support('page', 'excerpt');
  // トラックバック
  remove_post_type_support('page', 'trackbacks');
  // カスタムフィールド
  // remove_post_type_support('page', 'custom-fields');
  // コメント
  remove_post_type_support('page', 'comments');
  // リビジョン
  // remove_post_type_support('page', 'revisions');
  // 表示順
  // remove_post_type_support('page', 'page-attributes');
  // 投稿フォーマット
  // remove_post_type_support('page', 'post-formats');
}

add_action('init', 'custom_setup_post_support');

function custom_search_rewrite_rules($rules)
{
  $new_rules = array(
    'search/?$' => 'index.php?s=',
  );

  return $new_rules + $rules;
}

add_filter('rewrite_rules_array', 'custom_search_rewrite_rules');

function add_custom_query_vars_filter($vars)
{
  foreach ($_GET as $key => $value) {
    $vars[] = $key;
  }

  return $vars;
}

add_filter('query_vars', 'add_custom_query_vars_filter');
