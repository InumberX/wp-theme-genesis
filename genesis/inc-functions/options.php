<?php
/* ---------------------------------------
  設定の追加
--------------------------------------- */
function add_custom_option_field()
{
  add_settings_field('setting_ga_id', 'Googleアナリティクス ID', 'display_custom_option_setting_ga_id', 'general');
  register_setting('general', 'setting_ga_id', 'sanitize_callback_function');
}

add_action('admin_init', 'add_custom_option_field');

// 表示用コールバック関数
function display_custom_option_setting_ga_id()
{
  $setting_ga_id = get_option('setting_ga_id');
  echo "<input type='text' name='setting_ga_id' value='" . esc_attr($setting_ga_id) . "' placeholder='例：G-CPK1C23C4C' />";
}

// データのサニタイズ用コールバック関数
function sanitize_callback_function($input)
{
  // ここで入力値の検証とサニタイズを行う
  return sanitize_text_field($input);
}
