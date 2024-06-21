<?php
/*------------------------------------------
  meta設定
--------------------------------------------*/
// タイトルを取得する関数
function get_title_text()
{
  $title = '';

  if (is_single() && !is_home() || is_page() && !is_front_page()) {
    // 単一投稿または固定ページのタイトルを取得
    $title = get_the_title();
  } else {
    if (is_category()) {
      // カテゴリーページのタイトル
      $title = single_cat_title('', false) . 'の記事一覧';
    } elseif (is_tag()) {
      // タグページのタイトル
      $title = single_tag_title('', false) . 'の記事一覧';
    } elseif (is_year()) {
      // 年別アーカイブのタイトル
      $title = get_the_time('Y年') . 'の記事一覧';
    } elseif (is_month()) {
      // 月別アーカイブのタイトル
      $title = get_the_time('Y年m月') . 'の記事一覧';
    } elseif (is_day()) {
      // 日別アーカイブのタイトル
      $title = get_the_time('Y年m月d日') . 'の記事一覧';
    } elseif (is_author()) {
      $author = get_queried_object();
      // 著者ページのタイトル
      $title = $author->display_name . 'が投稿した記事一覧';
    } elseif (is_search()) {
      // 検索結果ページのタイトル
      $title =  '検索結果';
    }
  }

  if (is_home()) {
    $page_id = get_option('page_for_posts');
    // 投稿ページのタイトルを取得
    $title = get_the_title($page_id);
  }

  if (is_404()) {
    // 404ページのタイトル
    $title = 'ページが見つかりませんでした';
  }

  if (!empty($title)) {
    // サイト名を含むタイトルを返す
    return $title . ' | ' . get_bloginfo('name');
  }

  // タイトルが空の場合はサイト名だけを返す
  return get_bloginfo('name');
}

// descriptionを取得する関数
function get_description_text()
{
  global $post;
  $description = '';

  if (is_single() && !is_home() || is_page() && !is_front_page()) {
    if (!empty($post->post_excerpt)) {
      $description = str_replace(array("\r\n", "\r", "\n", '&nbsp;'), '', strip_tags($post->post_excerpt));
    } elseif (!empty($post->post_content)) {
      $description = str_replace(array("\r\n", "\r", "\n", '&nbsp;'), '', strip_tags($post->post_content));
      $description = trim($description);
      $description = preg_replace('/\s+/', ' ', $description);
      if (mb_strlen($description, 'utf8') > 120) {
        $description = mb_substr($description, 0, 120, 'utf8') . '…';
      }
    }
  }

  if (is_category()) {
    $description = !empty(category_description()) ? strip_tags(category_description()) : 'カテゴリー「' . single_cat_title('', false) . '」の記事一覧ページです。';
  }

  if (is_tag()) {
    $description = !empty(tag_description()) ? strip_tags(tag_description()) : 'タグ「' . single_tag_title('', false) . '」の記事一覧ページです。';
  }

  if (is_year()) {
    $description = '「' . get_the_time('Y年') . '」に投稿された記事の一覧ページです。';
  }

  if (is_month()) {
    $description = '「' . get_the_time('Y年m月') . '」に投稿された記事の一覧ページです。';
  }

  if (is_day()) {
    $description = '「' . get_the_time('Y年m月d日') . '」に投稿された記事の一覧ページです。';
  }

  if (is_author()) {
    $description = '「' . get_the_author() . '」が書いた記事の一覧ページです。';
  }

  if (is_front_page() && !empty($post->post_excerpt)) {
    $description = str_replace(array("\r\n", "\r", "\n", '&nbsp;'), '', strip_tags($post->post_excerpt));
  }

  if (is_home()) {
    $page_for_posts = get_option('page_for_posts');
    if (!empty($page_for_posts) && !empty(get_post_field('post_excerpt', $page_for_posts))) {
      $description = str_replace(array("\r\n", "\r", "\n", '&nbsp;'), '', strip_tags(get_post_field('post_excerpt', $page_for_posts)));
    }
  }

  if (is_404()) {
    $description = 'お探しのページは削除されたか、一時的にご利用できない可能性があります。お探しのページのURLが正しいかどうかご確認ください。';
  }

  if (empty($description)) {
    return get_bloginfo('description');
  }

  return $description;
}

add_filter('pre_get_document_title', 'get_title_text', 10, 2);

// OGP用画像を取得する関数
function get_ogp_image()
{
  if (has_post_thumbnail()) {
    $ogp_img_data = wp_get_attachment_image_src(get_post_thumbnail_id(), 'full');
    return $ogp_img_data[0];
  } else {
    return get_template_directory_uri() . '/assets/img/img-ogp.png'; // デフォルトのOGP画像
  }
}

// ヘッド部分に追加するメタタグとリンク
function add_custom_meta_tags()
{
  // ページ情報の取得
  $title = get_title_text();
  $description = get_description_text();
  $page_url = is_singular() ? get_permalink() : home_url();
  $page_url = is_search() ? home_url('/search') : $page_url;
  $ogp_img = get_ogp_image();
  $page_type = is_single() ? 'article' : 'website';

  // 基本的なメタタグ
  echo '<meta name="format-detection" content="telephone=no">' . "\n";
  echo '<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, shrink-to-fit=no, viewport-fit=cover">' . "\n";
  echo '<meta name="description" content="' . $description . '">' . "\n";
  // echo '<meta name="author" content="">' . "\n";
  // echo '<meta name="reply-to" content="">' . "\n";

  // OGP タグ
  echo '<meta property="og:type" content="' . $page_type . '">' . "\n";
  echo '<meta property="og:locale" content="ja_JP">' . "\n";
  echo '<meta property="og:title" content="' . $title . '">' . "\n";
  echo '<meta property="og:url" content="' . $page_url . '">' . "\n";
  echo '<meta property="og:description" content="' . $description . '">' . "\n";
  echo '<meta property="og:image" content="' . $ogp_img . '">' . "\n";
  echo '<meta property="og:site_name" content="' . get_bloginfo('name') . '">' . "\n";

  // Twitter カード
  // echo '<meta name="twitter:site" content="">' . "\n";
  echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
  echo '<meta name="twitter:description" content="' . $description . '">' . "\n";
  echo '<meta name="twitter:image:src" content="' . $ogp_img . '">' . "\n";

  // アイコン
  echo '<link rel="icon" type="image/x-icon" size="16x16" href="' . get_template_directory_uri() . '/assets/img/favicon.ico">' . "\n";
  echo '<link rel="apple-touch-icon" href="' . get_template_directory_uri() . '/assets/img/img-apple-icon.png">' . "\n";

  if (is_tag() || is_date() || is_search() || is_404()) {
    echo '<meta name="robots" content="noindex">' . "\n";
  }

  // Googleアナリティクス
  $ga_id = get_option('setting_ga_id');

  if ($ga_id) {
    echo '<!-- Google tag (gtag.js) -->' . "\n";
    echo '<script async src="https://www.googletagmanager.com/gtag/js?id=' . sanitize_text_field($ga_id) . '"></script>' . "\n";
    echo '<script>' . "\n";
    echo 'window.dataLayer = window.dataLayer || [];' . "\n";
    echo 'function gtag(){dataLayer.push(arguments);}' . "\n";
    echo 'gtag("js", new Date());' . "\n";
    echo 'gtag("config", "' . sanitize_text_field($ga_id) . '");' . "\n";
    echo '</script>' . "\n";
  }
}

add_action('wp_head', 'add_custom_meta_tags');
