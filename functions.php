<?php

// Actions
add_action('init', 'ghs_defaults');
add_action('admin_init', 'ghs_admin_redirects');
add_action('wp_enqueue_scripts', 'ghs_scripts');
add_action('after_setup_theme', 'ghs_theme_setup');
add_action('wp_head', 'ghs_head');
add_action('wp_footer', 'ghs_footer');
add_action('admin_menu', 'ghs_admin_options');
add_action('wp_ajax_ghs_set_social', 'ghs_set_social');
add_action('wp_ajax_ghs_get_social', 'ghs_get_social');
add_action('wp_ajax_ghs_set_hero_settings', 'ghs_set_hero_settings');
add_action('wp_ajax_ghs_get_hero_settings', 'ghs_get_hero_settings');
add_action('admin_enqueue_scripts', 'ghs_admin_scripts');

// Filters
add_filter('acf/settings/url', 'ghs_acf_settings_url');
add_filter('acf/settings/show_admin', 'ghs_acf_settings_show_admin');

// Defines
define('ghs_acf_path', get_stylesheet_directory() . '/includes/plugins/advanced-custom-fields/');
define('ghs_acf_url', get_stylesheet_directory_uri() . '/includes/plugins/advanced-custom-fields/');


// Includes
include_once(ghs_acf_path . 'acf.php');

// Requires

// Functions
function ghs_defaults(){

    ghs_check_if_db_exist('ghs_settings');
}

function ghs_head(){
    ?>
    <title><?php if(!is_front_page()): echo get_the_title() . ' | '; endif; echo bloginfo('Name'); ?></title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="<?php if(is_front_page()): bloginfo('description'); else: echo get_the_excerpt(); endif;?>" />
    <meta name="" content="" />
    <meta name="p:domain_verify" content="e341cb4b482b32ffd88698442a7c6c71"/>
    <script type="text/javascript"> var ajaxurl = "<?php echo admin_url('admin-ajax.php', is_ssl()) ?>"; </script>

<?php

    if(is_singular('post')):?>
        <meta property="og:locale" content="<?php echo get_locale(); ?>" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="<?php the_title(); ?>" />

        <?php if ( get_the_excerpt() ) : ?>
            <meta property="og:description" content="<?php the_excerpt(); ?>" />
            <meta name="twitter:description" content="<?php the_excerpt(); ?>" />
        <?php endif; ?>

        <meta property="og:url" content="<?php echo ( isset( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http' ) . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"; ?>" />
        <meta property="og:site_name" content="<?php bloginfo( 'name' ); ?>" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="<?php the_title(); ?>" />

        <?php if ( get_the_post_thumbnail() ) :
            $image_data_wh = wp_get_attachment_image_src( get_post_thumbnail_id( get_the_ID() ), 'large' );
            ?>
            <meta name="twitter:image" content="<?php echo get_the_post_thumbnail_url( get_the_ID(), 'large' ); ?>" />
            <meta property="og:image:width" content="<?php echo $image_data_wh[1]; ?>" />
            <meta property="og:image:height" content="<?php echo $image_data_wh[2]; ?>" />
            <meta property="og:image" content="<?php echo get_the_post_thumbnail_url( get_the_ID(), 'large' ); ?>" />
            <meta property="og:image:secure_url" content="<?php echo str_replace( 'http://', 'https://', get_the_post_thumbnail_url( get_the_ID(), 'large' ) ); ?>" />
        <?php endif; ?>

    <?php endif;
}

function ghs_footer(){ ?>

    <?php if(strpos(site_url(), 'localhost') !== false): ?>

    <script id="__bs_script__">//<![CDATA[
        document.write("<script async src='<?php echo get_site_url()?>///browser-sync/browser-sync-client.js?v=2.26.7'><\/script>");
        //]]></script>

    <?php endif; ?>

<? }

function ghs_scripts(){

    // all scripts
    wp_enqueue_script('jquery');
    wp_enqueue_script('bundleJS', get_template_directory_uri() . '/assets/js/bundle-min.js', array('jquery'), '', true);

    // all style files
    wp_enqueue_style('bundleCSS', get_stylesheet_directory_uri() . '/assets/css/bundle.css');

    // all localize scripts
}

function ghs_admin_scripts(){

    // all styles
    wp_enqueue_style('mainStyle', get_stylesheet_directory_uri() . '/style.css');

    // all scripts
    wp_enqueue_script('mainJS', get_template_directory_uri() . '/assets/js/main.js', array('jquery'), '', true);

    // all localize scripts
}

function ghs_admin_redirects(){

    if( !defined("DOING_AJAX") && !current_user_can("administrator")):
        wp_redirect(site_url()); exit;
        endif;

}

function ghs_theme_setup(){

    register_nav_menu('navBar', __( 'Nav Bar', 'theme-slug' ) );
    add_theme_support('post-thumbnails');

}

function ghs_get_navigation($name = ''){
    $menuItems = wp_get_nav_menu_items($name);
    $data = [];
    $key = 0;
    $subKey = 0;

    foreach ($menuItems as $mi):

        if($mi->menu_item_parent == 0):
            $data[$key]['ID'] = $mi->ID;
            $data[$key]['url'] = $mi->url;
            $data[$key]['target'] = $mi->target;
            $data[$key]['title'] = $mi->title;
            $key++;
            $subKey = 0;
        else:
            $parentKey = array_search($mi->menu_item_parent, $data);
            $data[$parentKey]['submenu'][$subKey]['ID'] = $mi->ID;
            $data[$parentKey]['submenu'][$subKey]['url'] = $mi->url;
            $data[$parentKey]['submenu'][$subKey]['target'] = $mi->target;
            $data[$parentKey]['submenu'][$subKey]['title'] = $mi->title;
            $subKey++;
        endif;


    endforeach;

    return $data;
}

function ghs_get_current_url(){
    global $wp;
    $current_url = home_url(add_query_arg(array(), $wp->request));
    return $current_url.'/';
}

function ghs_acf_settings_url($url){
    return ghs_acf_url;
}

function ghs_acf_settings_show_admin($show_admin){
    return true;
}

function ghs_check_if_db_exist($name){
    $data['success'] = false;

    global $wpdb;

    $check = $wpdb->query($wpdb->prepare("SHOW TABLES LIKE '%s'", $name));

    if($check){
        $data['success'] = true;
    } else {

        switch($name):

            case 'ghs_settings':
                $create = $wpdb->query("CREATE TABLE " . $name . " ( ID int NOT NULL AUTO_INCREMENT, FaceBookName varchar(255), TwitterName varchar(255), TumblrName varchar(255), InstagramName varchar(255), YoutubeName varchar(255), SnapChatName varchar(255), PRIMARY KEY(ID) ); ");
                break;
        endswitch;

        if($create):
            $data['success'] = true;
        else:
            $data['success'] = false;
        endif;

    }

    return $data;
}

function ghs_admin_options(){

    add_menu_page('Theme Settings', 'Theme Settings', 'manage_options', 'ghs-theme-settings', 'ghs_theme_settings', 'dashicons-admin-settings', 90);
    add_submenu_page('ghs-theme-settings', 'Home Page Settings', 'Home Page Settings', 'manage_options', 'ghs_theme_settings_hps', 'ghs_theme_settings_hps');

}

function ghs_theme_settings(){

    include_once(get_stylesheet_directory() . '/partials/ghs-theme-settings.php');

}

function ghs_theme_settings_hps(){
    include_once(get_stylesheet_directory() . '/partials/ghs-theme-settings-hps.php');
}

function ghs_get_social(){

    $data['success'] = false;
    global $wpdb;

    $check = $wpdb->get_results('SELECT * FROM `ghs_settings`');

    if($check):
        $data['success'] = true;
        $data['social'] = $check;
    endif;

    $wpdb->flush();
    echo json_encode($data);
    wp_die();

}

function ghs_set_social(){

    $data['success'] = false;
    global $wpdb;

    $collect = [
        'FaceBookName' => $_REQUEST['facebook'],
        'TwitterName' => $_REQUEST['twitter'],
        'TumblrName' => $_REQUEST['tumblr'],
        'InstagramName' => $_REQUEST['instagram'],
        'YoutubeName' => $_REQUEST['youtube'],
        'SnapChatName' => $_REQUEST['snapchat']
    ];

    if(!$collect):
        // if collection is null
        $data['error_message'] = "No data was entered!";
    else:
        // if collection as data
        $data['success'] = true;

        $check = $wpdb->query('SELECT * FROM `ghs_settings`');
        $results=$wpdb->get_results($check);

        if($results <= 0):
            $data['success'] = false;
            $insert = $wpdb->insert('ghs_settings', $collect);

            if($insert):
                $data['success'] = true;
                $data['success_msg'] = "Your social links have been updated";
                endif;
        else:
            $update = $wpdb->update('ghs_settings', $collect, ['ID' => 1]);

            if($update):
                $data['success'] = true;
                $data['success_msg'] = "Your social links have been updated";
            endif;
        endif;
    endif;

    $wpdb->flush();
    echo json_encode($data);
    wp_die();

}

function ghs_set_hero_settings(){
    $data['success'] = false;

    $file = $_REQUEST['hero-banner-img'];
    $check = decode_base64($file, 'hero-banner');
    $data['success'] = $check['success'];

    echo json_encode($data);
    wp_die();
}

function ghs_get_hero_settings(){
    $data['success'] = false;
    $path = wp_get_upload_dir();

    if(is_dir($path['basedir'] . '/theme_media/') === false):
        mkdir($path['basedir'] . '/theme_media/');
    endif;

    $check = array_diff(scandir($path['basedir'] . '/theme_media/'), array('..', '.'));
    $has_banner = in_array('hero-banner.jpeg', $check);

    if($has_banner):
        $data['success'] = true;
        $data['hero_banner_img'] = $path['baseurl'] . '/theme_media/hero-banner.jpeg';
    endif;

    echo json_encode($data);
    wp_die();
}

function decode_base64($base64File, $nameToSave){

    $data['success'] = false;
    $path = wp_get_upload_dir();

    if(is_dir($path['basedir'] . '/theme_media/') === false):
        mkdir($path['basedir'] . '/theme_media/');
    endif;

    $image_parts = explode(";base64,", $base64File);
    $image_type_aux = explode("image/", $image_parts[0]);
    $image_type = $image_type_aux[1];
    $image_base64 = base64_decode($image_parts[1]);
    $file = $path['basedir'] . '/theme_media/' . $nameToSave . '.' . $image_type;

    file_put_contents($file, $image_base64);

    $check = array_diff(scandir($path['basedir'] . '/theme_media/'), array('..', '.'));
    $data['success'] = in_array($nameToSave . '.' . $image_type, $check);

    return $data;
}