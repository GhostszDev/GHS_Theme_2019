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
add_action('wp_ajax_nopriv_ghs_get_social', 'ghs_get_social');
add_action('wp_ajax_nopriv_ghs_add_to_mailing_list', 'ghs_add_to_mailing_list');
add_action('wp_ajax_ghs_set_hero_settings', 'ghs_set_hero_settings');
add_action('wp_ajax_nopriv_ghs_get_hero_settings', 'ghs_get_hero_settings');
add_action('admin_enqueue_scripts', 'ghs_admin_scripts');
add_action ('edit_category_form_fields', 'ghs_extra_category_fields');
add_action ('edited_category', 'save_extra_category_fileds');

// Filters
add_filter('acf/settings/url', 'ghs_acf_settings_url');
add_filter('acf/settings/show_admin', 'ghs_acf_settings_show_admin');
add_filter('excerpt_more', 'ghs_excerpt');
add_filter('comment_form_default_fields', 'ghs_comment_fields');
add_filter('comment_form_fields', 'ghs_comment_fields_fix');
//add_filter('login_url', 'ghs_login_url', 10, 3);
//add_filter('rest_endpoints', 'ghs_remove_default_endpoints');

// Defines
define('ghs_acf_path', get_stylesheet_directory() . '/includes/plugins/advanced-custom-fields/');
define('ghs_acf_url', get_stylesheet_directory_uri() . '/includes/plugins/advanced-custom-fields/');
define('ghs_api_path', get_stylesheet_directory() . '/includes/plugins/ghs_api/');
define('jwt_path', get_stylesheet_directory() . '/includes/plugins/jwt-authentication-for-wp-rest-api/');


// Includes
include_once(ghs_acf_path . 'acf.php');
include_once(ghs_api_path . 'ghs_api.php');
include_once(jwt_path . 'jwt-auth.php');

// Requires

// Functions
function ghs_defaults(){

    ghs_check_if_db_exist('ghs_settings');
    ghs_check_if_db_exist('ghs_hero_banner_settings');
    ghs_check_if_db_exist('ghs_mailing_list');
}

function ghs_head(){
    ?>

    <?php
    if(is_single()):
        echo '<title>' . ucwords(get_the_title()) . ' | ' . ucwords(get_bloginfo('Name')) . '</title>';
    elseif (is_category()):
        echo '<title>' . ucwords(get_the_category()[0]->name) . ' | ' . ucwords(get_bloginfo('Name')) . '</title>';
    elseif (is_404()):
	    echo '<title>' . 'Page Not Found  | ' . ucwords(get_bloginfo('Name')) . '</title>';
    elseif (is_front_page()):
	    echo '<title>' . ucwords(get_bloginfo('Name')) . '</title>';
    elseif (is_page()):
	    echo '<title>' . ucwords(get_the_title()) . ' | ' . ucwords(get_bloginfo('Name')) . '</title>';
        endif;
    ?>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="<?php if(is_front_page()): bloginfo('description'); else: echo get_the_excerpt(); endif;?>" />
    <meta name="" content="" />
    <meta name="p:domain_verify" content="e341cb4b482b32ffd88698442a7c6c71"/>

<?php if(is_single()):?>

        <meta property="og:locale" content="<?php echo get_locale(); ?>" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="<?php echo ucwords(get_the_title(get_the_ID())); ?>" />

        <?php if ( get_the_excerpt() ) : ?>
            <meta property="og:description" content="<?php the_excerpt(get_the_ID()); ?>" />
            <meta name="twitter:description" content="<?php the_excerpt(get_the_ID()); ?>" />
        <?php endif; ?>

        <meta property="og:url" content="<?php echo ( isset( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http' ) . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"; ?>" />
        <meta property="og:site_name" content="<?php bloginfo( 'name' ); ?>" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="<?php echo ucwords(get_the_title(get_the_ID())); ?>" />

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

<?php }

function ghs_scripts(){

    // all style files
    wp_enqueue_style('bundleCSS', get_stylesheet_directory_uri() . '/assets/css/bundle.css');

    // all scripts
    wp_enqueue_script('jquery');
    wp_enqueue_script('bundleJS', get_template_directory_uri() . '/assets/js/bundle-min.js', array('jquery'), '', true);

    // all localize scripts
    wp_localize_script('bundleJS', 'ghs_obj', array(
            'ajaxurl' => admin_url( 'admin-ajax.php'),
            'ghs_site' => site_url('/'),
            'ghs_api_uri' => site_url('/api/ghs_api/v1/'),
    ));
}

function ghs_admin_scripts(){

    // all styles
    wp_enqueue_style('mainStyle', get_stylesheet_directory_uri() . '/style.css');

    // all scripts
    wp_enqueue_script('jquery');
    wp_enqueue_script('js-cookies', get_template_directory_uri() . '/node_modules/js-cookie/src/js.cookie.js');
    wp_enqueue_script('mainJS', get_template_directory_uri() . '/assets/js/main.js', array('jquery', 'js-cookies'), null, true);

    // all localize scripts
    wp_localize_script('mainJS', 'ghs_obj', array(
        'ajaxurl' => admin_url( 'admin-ajax.php'),
        'ghs_site' => site_url('/'),
        'ghs_api_uri' => site_url('/api/ghs_api/v1/'),
    ));
}

function ghs_clear_wp_cache(){

    global $wp_object_cache;
    $wp_object_cache->flush();

}

function ghs_admin_redirects(){

    if( !defined("DOING_AJAX") && !current_user_can("administrator")):
        wp_redirect(site_url()); exit;
        endif;

}

function ghs_theme_setup(){

    register_nav_menu('navBar', __( 'Nav Bar', 'theme-slug' ) );
	add_theme_support( 'html5', array(
			'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' )
	);

	add_theme_support('post-formats', array(
		'aside',
		'gallery',
		'image',
		'video',
		'audio'
	));

	add_theme_support( 'woocommerce' );
	add_theme_support('post-thumbnails');

}

function ghs_get_navigation($name = ''){
    $menuItems = wp_get_nav_menu_items($name);
    $data = [];
    $key = 0;
    $subKey = 0;

    if($menuItems) {
        foreach ($menuItems as $mi):

            if ($mi->menu_item_parent == 0):
                $data[$key]['ID'] = $mi->ID;
                $data[$key]['url'] = $mi->url;
                $data[$key]['target'] = $mi->target;
                $data[$key]['title'] = $mi->title;
                $data[$key]['submenu'] = array();
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
    }

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

            case 'ghs_hero_banner_settings':
                $create = $wpdb->query("CREATE TABLE " . $name . " ( ID int NOT NULL, Title varchar(255), TitleTag varchar(2), Subtitle varchar(255), SubtitleTag varchar(2), Link text, TextBgColor varchar(255), PRIMARY KEY(ID) ); ");
                break;

            case 'ghs_mailing_list':
                $create = $wpdb->query("CREATE TABLE " . $name . "( ID int NOT NULL AUTO_INCREMENT, Email varchar(255), OptIn int, PRIMARY KEY(ID) ); ");
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

function ghs_extra_category_fields($tag){
    $t_id = $tag->term_id;
    $cat_meta = get_option( "category_$t_id");
    ?>

    <tr class="form-field">
        <th scope="row" valign="top"><label for="cat_Image_url"><?php _e('Category Image Url'); ?></label></th>
        <td>
            <input type="text" name="Cat_meta[img]" id="Cat_meta[img]" size="3" style="width:60%;" value="<?php echo $cat_meta['img'] ? $cat_meta['img'] : ''; ?>"><br />
            <span class="description"><?php _e('Image for category: use full url with '); ?></span>
        </td>
    </tr>

<?php
}

function save_extra_category_fileds( $term_id ) {
    if ( isset( $_POST['Cat_meta'] ) ) {
        $t_id = $term_id;
        $cat_meta = get_option( "category_$t_id");
        $cat_keys = array_keys($_POST['Cat_meta']);
        foreach ($cat_keys as $key){
            if (isset($_POST['Cat_meta'][$key])){
                $cat_meta[$key] = $_POST['Cat_meta'][$key];
            }
        }
        //save the option array
        update_option( "category_$t_id", $cat_meta );
    }
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
        $data['social']['facebook'] = $check[0]->FaceBookName;
        $data['social']['twitter'] = $check[0]->TwitterName;
        $data['social']['tumblr'] = $check[0]->TumblrName;
        $data['social']['youtube'] = $check[0]->YoutubeName;
        $data['social']['instagram'] = $check[0]->InstagramName;
        $data['social']['snapchat'] = $check[0]->SnapChatName;
    endif;

    $wpdb->flush();
    echo json_encode($data);
    exit();

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

        $results=$wpdb->get_results('SELECT * FROM `ghs_settings`');

        if($results <= 0 || empty($results)):
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
    exit();

}

function ghs_set_hero_settings(){
    $data['success'] = false;
    global $wpdb;

    $file = $_REQUEST['hero-banner-img'];
    $hero_data = [
            'Title' => $_REQUEST['hero-banner-title'],
            'TitleTag' => $_REQUEST['hero-banner-title-tag'],
            'Subtitle' => $_REQUEST['hero-banner-subtitle'],
            'SubtitleTag' => $_REQUEST['hero-banner-subtitle-tag'],
            'TextBgColor' => $_REQUEST['hero-banner-theme'],
            'Link' => $_REQUEST['hero-banner-link']
    ];

    if($hero_data){
        $results=$wpdb->get_results('SELECT * FROM `ghs_hero_banner_settings`');

        if($results <= 0):
            $data['success'] = false;
            $insert = $wpdb->insert('ghs_hero_banner_settings', $hero_data);

            if($insert):
                $data['success'] = true;
                $data['success_msg'] = "Your hero banner settings have been updated";
            endif;
        else:
            $update = $wpdb->update('ghs_hero_banner_settings', $hero_data, ['ID' => 0]);

            if($update):
                $data['success'] = true;
                $data['success_msg'] = "Your hero banner settings have been updated";
            endif;
        endif;

        $data['test'] = $wpdb->last_error;
    }

    $check = decode_base64($file, 'hero-banner');
    $data['success'] = $check['success'];

    if($data['success']){
        ghs_clear_wp_cache();
    }

    $wpdb->flush();
    echo json_encode($data);
    exit();
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

        global $wpdb;
        $results=$wpdb->get_results('SELECT * FROM `ghs_hero_banner_settings` LIMIT 1', ARRAY_A);

        $data['hero_banner_data'] = $results;
        $wpdb->flush();
    endif;


    echo json_encode($data);
    exit();
}

function ghs_add_to_mailing_list(){

    $data['success'] = false;
    $insertData = [
            'Email' => $_REQUEST['mailingListEmail'],
            'OptIn' => 1
    ];

    global $wpdb;

    $check = $wpdb->get_row('SELECT * FROM `ghs_mailing_list` WHERE `Email` = \' '. $insertData['Email'] .' \' LIMIT 1', ARRAY_A);

    if(!$check) {
        $insert = $wpdb->insert('ghs_mailing_list', $insertData);

        if ($insert) {
            $data['success'] = true;
        } else {
            $data['error_msg'] = 'Error 419: Email couldn\'t be added to the mailing list!';
        }
    } else {
        $data['error_msg'] = 'Email already has been signed up for the email list!';
    }

    $wpdb->flush();
    echo json_encode($data);
    exit();
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

function ghs_remove_default_endpoints($endpoints){
	$prefix = 'ghs_api';
	$jwtPreix = 'jwt-auth';

	foreach($endpoints as $endpoint => $details) {
		switch ($endpoint):
			case fnmatch('/' . $prefix . '/*', $endpoint, FNM_CASEFOLD):
			case fnmatch('/' . $jwtPreix . '/*', $endpoint, FNM_CASEFOLD):
				break;

			default:
				unset($endpoints[$endpoint]);
				break;

		endswitch;
	}

	return $endpoints;
}

function ghs_add_post_types(){

}

function ghs_get_latest_post(){

    global $wpdb;

    $query = "SELECT ID FROM $wpdb->posts WHERE `post_status` = 'publish' AND `post_type` = 'post' ORDER BY ID DESC LIMIT 0,1";

    $result = $wpdb->get_results($query);
    $row = $result[0];
    $id = $row->ID;

    return $id;

}

function ghs_get_featured_cat(){
    $cat_data =  get_categories();
    $data = [];
    $key = 0;

    foreach ($cat_data as $cat){
        if($cat->cat_ID != 1 && $key < 3) {
            $data[$key]['ID'] = $cat->cat_ID;
            $data[$key]['title'] = $cat->cat_name;
            $options = get_option( "category_$cat->cat_ID");
            if($options['img']){
                $data[$key]['thumbnail'] = $options['img'];
            }
            $key++;
        }
    }

    return $data;
}

function get_recent_post(){

    $recentPost = [];
    $data = query_posts(['offset'=>1,'post_per_page'=>get_option('posts_per_page')]);
    $key = 0;

    foreach ($data as $post){
        $recentPost[$key] = $post->ID;
        $key++;
    }

    return $recentPost;
}

function ghs_excerpt($more){
    return '...';
}

function ghs_comment_fields($field){

    $field = array(
        'author' => '<div class="form-row align-items-center"><div class="form-group col-md-6"><label class="sr-only" for="inlineFormInputName">Name</label><input type="text" class="form-control" id="inlineFormInputName" placeholder="Name*"></div>',
        'email' => '<div class="form-group col-md-6"><label class="sr-only" for="inlineFormInputName">Email</label><input type="email" class="form-control" id="inputEmail4" placeholder="Email*"></div>',
        'url' => '</div>',
    );

    return $field;
}

function ghs_comment_fields_fix($fields){
    $comment_field = $fields['comment'];
    unset( $fields['comment'] );
    $fields['comment'] = $comment_field;
    return $fields;
}

function get_recent_cat_post($name){

    $recentPost = [];
    $data = query_posts(['post_per_page'=>get_option('posts_per_page')]);
    $key = 0;

    foreach ($data as $post){
        $recentPost[$key] = $post->ID;
        $key++;
    }

    return $recentPost;

}

function ghs_login_url($login_url, $redirect, $force_reauth){
	return site_url('/login');
}
