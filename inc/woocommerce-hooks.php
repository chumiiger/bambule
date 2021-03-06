<?php
    /*   
        Custom Post Types
    
        @package bambuletheme
    */
?>

<?php

/*
============================================================
WooCommerce Plugin Hooks
============================================================
*/


remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10);
remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10);

add_action('woocommerce_before_main_content', 'my_theme_wrapper_start', 10);
add_action('woocommerce_after_main_content', 'my_theme_wrapper_end', 10);

function my_theme_wrapper_start() {
  echo '<div id="primary" class="content-area"  >
        <main id="main" class="site-main" role="main">
            <div class="container">';
}

function my_theme_wrapper_end() {
  echo '</div>
        </main>
    </div>';
}