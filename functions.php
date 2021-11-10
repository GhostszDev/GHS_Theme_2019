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
add_action('add_meta_boxes', 'ghs_add_metaboxes');
add_action( 'save_post', 'ghs_save_metadata' );

// Filters
add_filter('acf/settings/url', 'ghs_acf_settings_url');
add_filter('acf/settings/show_admin', 'ghs_acf_settings_show_admin');
add_filter('excerpt_more', 'ghs_excerpt');
add_filter('comment_form_default_fields', 'ghs_comment_fields');
add_filter('comment_form_fields', 'ghs_comment_fields_fix');
//add_filter('login_url', 'ghs_login_url', 10, 3);
//add_filter('rest_endpoints', 'ghs_remove_default_endpoints');
add_filter( 'mod_rewrite_rules', 'ghs_rewrite_conditions', 10, 1 );

// Defines
define('JWT_AUTH_SECRET_KEY', AUTH_KEY);
define('JWT_AUTH_CORS_ENABLE', true);
define('ghs_acf_path', get_stylesheet_directory() . '/includes/plugins/advanced-custom-fields/');
define('ghs_acf_url', get_stylesheet_directory_uri() . '/includes/plugins/advanced-custom-fields/');
define('ghs_api_path', get_stylesheet_directory() . '/includes/plugins/ghs_api/');
define('jwt_path', get_stylesheet_directory() . '/includes/plugins/jwt-authentication-for-wp-rest-api/');
define('unity_path_dir', get_stylesheet_directory() . '/assets/unity/');
define('unity_path', get_stylesheet_directory_uri() . '/assets/unity/');
define('svg_defs', get_stylesheet_directory_uri() . '/assets/imgs/icon.svg');


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
    ghs_check_if_db_exist('ghs_cat_selection');

//	register_post_type('ghs_youtube',
//		array(
//			'labels'      => array(
//				'name'          => __('Youtube', 'textdomain'),
//				'singular_name' => __('Youtube', 'textdomain'),
//			),
//			'public'      => true,
//			'has_archive' => true,
//			'rewrite'     => array( 'slug' => 'youtube' ),
//			'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' )
//		)
//	);

    register_post_type('ghs_games',
        array(
            'labels'      => array(
                'name'          => __('Games', 'textdomain'),
                'singular_name' => __('Game', 'textdomain'),
            ),
            'public'      => true,
            'has_archive' => true,
            'rewrite'     => array( 'slug' => 'Game' ),
            'supports' => array( 'title', 'editor', 'thumbnail', 'excerpt', 'comments' )
        )
    );
}

function ghs_head(){
    ?>

	<?php if(strpos(site_url(), 'localhost') == false): ?>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-63287923-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-63287923-1');
    </script>
    <script data-ad-client="ca-pub-3479977104944029" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <?php endif; ?>


    <?php
    if(is_single()):
        echo '<title>' . ucwords(get_the_title()) . ' | ' . ucwords(get_bloginfo('Name')) . '</title>';
    elseif (is_category()):
        echo '<title>' . ucwords(get_cat_name(get_query_var('cat'))) . ' | ' . ucwords(get_bloginfo('Name')) . '</title>';
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

    <?php if(strpos(site_url(), 'localhost') != false): ?>

    <script id="__bs_script__">//<![CDATA[
        document.write("<script async src='<?php echo get_site_url()?>///browser-sync/browser-sync-client.js?v=2.26.7'><\/script>");
        //]]></script>

    <?php endif; ?>

	<?php if(is_singular('ghs_games')): ?>
        <script>
            <?php if(!empty(get_post_meta(get_the_ID(), 'ghs_game_meta')[0])): ?>
            var unityInstance = UnityLoader.instantiate("unityContainer", "<?php echo unity_path . get_post_meta(get_the_ID(), 'ghs_game_meta')[0]?>", {onProgress: UnityProgress});
            <?php endif; ?>
        </script>
	<?php endif; ?>

<?php }

function ghs_scripts(){

    // all style files
	wp_enqueue_style('bundleCSS', get_stylesheet_directory_uri() . '/assets/css/bundle.css');

    // all scripts
    wp_enqueue_script('jquery');
    wp_enqueue_script('unityJS', get_template_directory_uri() . '/assets/js/unity-min.js', array('jquery'), '', true);
    wp_enqueue_script('bundleJS', get_template_directory_uri() . '/assets/js/bundle-min.js', array('jquery', 'unityJS'), '', false);

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
    wp_enqueue_script('adminJS', get_template_directory_uri() . '/assets/js/admin-min.js', array('jquery'), null, true);

    // all localize scripts
    wp_localize_script('adminJS', 'ghs_obj', array(
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

    global $wp_rewrite;

    //$wp_rewrite->add_rewrite_tag("RewriteCond","%{HTTP:Authorization} ^(.*)",null); //this fails
    $wp_rewrite->add_rule("(.*) - [E=HTTP_AUTHORIZATION:%1]",null);

    $wp_rewrite->wp_rewrite_rules();
    $wp_rewrite->flush_rules();

    flush_rewrite_rules();

}

function ghs_rewrite_conditions($rules){
    $new_rules = <<<EOD
    RewriteCond %{HTTP:Authorization} ^(.*)
    RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
    SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
EOD;
    return $rules . $new_rules;
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

            case 'ghs_cat_selection':
                $create = $wpdb->query("CREATE TABLE " . $name . "( cat_1 int, cat_2 int, cat_3 int, ); ");
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

	$args = array( 'numberposts' => '5', 'post_status' => 'publish' );
	$recent_posts = wp_get_recent_posts( $args );
	$id = $recent_posts[0]['ID'];
    return $id;

}

function ghs_get_featured_cat(){
    $data = [];
    global $wpdb;
    $key = 0;

    $check = $wpdb->get_results('SELECT * FROM `ghs_cat_selection`');

    if($check) {
        $data[0]['ID'] = $check[0]->cat_1;
        $data[0]['title'] = get_cat_name($check[0]->cat_1);
        $options1 = get_option("category_".$check[0]->cat_1);
        if ($options1['img']) {
            $data[0]['thumbnail'] = $options1['img'];
        }

        $data[1]['ID'] = $check[0]->cat_2;
        $data[1]['title'] = get_cat_name($check[0]->cat_2);
        $options2 = get_option("category_".$check[0]->cat_2);
        if ($options2['img']) {
            $data[1]['thumbnail'] = $options2['img'];
        }


        $data[2]['ID'] = $check[0]->cat_3;
        $data[2]['title'] = get_cat_name($check[0]->cat_3);
        $options3 = get_option("category_".$check[0]->cat_3);
        if ($options3['img']) {
            $data[2]['thumbnail'] = $options3['img'];
        }

    } else {
        $cat_data = get_categories();

        foreach ($cat_data as $cat) {
            if ($cat->cat_ID != 1 && $key < 3) {
                $data[$key]['ID'] = $cat->cat_ID;
                $data[$key]['title'] = $cat->cat_name;
                $options = get_option("category_$cat->cat_ID");
                if ($options['img']) {
                    $data[$key]['thumbnail'] = $options['img'];
                }
                $key++;
            }
        }
    }

//    var_dump($data);
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

function ghs_grab_selected_cats(){
    global $wpdb;

    $selected = $wpdb->get_results('SELECT * FROM `ghs_cat_selection`');

    $data['selected'] = $selected;

    return $data;
}

function ghs_add_metaboxes(){
    add_meta_box('ghs_youtube_meta', 'Youtube Link', 'ghs_youtube_metaboxes', "post", "side", "low", null);
    add_meta_box('ghs_postcast_meta', 'Podcast Link', 'ghs_podcast_metaboxes', "post", "side", "low", null);
    add_meta_box('ghs_ad_msg_meta', 'Affiliate or Sponsored Content', 'ghs_ad_msg_metabox', "post", "side", "low", null);
    add_meta_box('ghs_game_meta', 'Game Link', 'ghs_game_metaboxes', "ghs_games", "side", "low", null);
    add_meta_box('ghs_games_availability_meta', 'Game Availability', 'ghs_games_availability_metaboxes', "ghs_games", "side", "low", null);
    add_meta_box('ghs_games_slide_meta', 'Game Slide', 'ghs_games_slide_metaboxes', "ghs_games", "side", "low", null);
    add_meta_box('ghs_games_choice_cat_meta', 'Featured Category', 'ghs_games_choice_cat_metaboxes', "ghs_games", "side", "low", null);
}

function ghs_get_YT_thumbnail($url){
    $id = explode('.be/', $url);

    $yt_link_url = 'http://img.youtube.com/vi/'.
        $id[1].
        '/maxresdefault.jpg';

    return $yt_link_url;
}

function ghs_upload_img($image_url, $post_id){
    $upload_dir = wp_upload_dir();
    $image_data = file_get_contents($image_url);
    $filename = basename($image_url);
    if(wp_mkdir_p($upload_dir['path']))
        $file = $upload_dir['path'] . '/' . $filename;
    else
        $file = $upload_dir['basedir'] . '/' . $filename;
    file_put_contents($file, $image_data);

    $wp_filetype = wp_check_filetype($filename, null );
    $attachment = array(
        'post_mime_type' => $wp_filetype['type'],
        'post_title' => sanitize_file_name($filename),
        'post_content' => '',
        'post_status' => 'inherit'
    );
    $attach_id = wp_insert_attachment( $attachment, $file, $post_id );
    require_once(ABSPATH . 'wp-admin/includes/image.php');
    $attach_data = wp_generate_attachment_metadata( $attach_id, $file );
    $res1= wp_update_attachment_metadata( $attach_id, $attach_data );
    $res2= set_post_thumbnail( $post_id, $attach_id );
}

function ghs_save_metadata($post_id){
    global $post;
    switch (get_post_type($post_id)){
        case 'post':
            if($_POST['ghs_youtube_meta']) {
	            update_post_meta( $post_id,
		            'ghs_youtube_meta',
		            $_POST['ghs_youtube_meta'] );
	            ghs_upload_img( ghs_get_YT_thumbnail( $_POST['ghs_youtube_meta'] ), $post_id );
            }

	        if($_POST['ghs_podcast_meta']) {
		        $updatedStr = explode('/', $_POST['ghs_podcast_meta']);
		        update_post_meta( $post_id,
			        'ghs_podcast_meta',
			        $updatedStr[0] . '/' . $updatedStr[1] . '/' . $updatedStr[2] . '/' . $updatedStr[3] . '/embed/' . $updatedStr[4] . '/' . $updatedStr[5]
//			        json_encode($updatedStr)
                );
	        }

            if(isset($_POST['ghs_ad_msg_meta'])):
                update_post_meta( $post_id, 'ghs_ad_msg_meta', true );
            else:
                update_post_meta( $post_id, 'ghs_ad_msg_meta', false );
            endif;
            break;

        case 'ghs_games':

	        if(isset($_POST['ghs_game_meta'])) {
		        update_post_meta( $post_id,
			        'ghs_game_meta',
			        $_POST['ghs_game_meta']
		        );
	        }
	        if(isset($_POST['ghs_game_meta_android'])) {
		        update_post_meta( $post_id,
			        'ghs_game_meta_android',
			        $_POST['ghs_game_meta_android']
		        );
	        }
	        if(isset($_POST['ghs_game_meta_ios'])) {
		        update_post_meta( $post_id,
			        'ghs_game_meta_ios',
			        $_POST['ghs_game_meta_ios']
		        );
	        }
	        if(isset($_POST['ghs_game_meta_ps'])) {
		        update_post_meta( $post_id,
			        'ghs_game_meta_ps',
			        $_POST['ghs_game_meta_ps']
		        );
	        }
	        if(isset($_POST['ghs_game_meta_nintendo'])) {
		        update_post_meta( $post_id,
			        'ghs_game_meta_nintendo',
			        $_POST['ghs_game_meta_nintendo']
		        );
	        }
	        if(isset($_POST['ghs_game_meta_xbox'])) {
		        update_post_meta( $post_id,
			        'ghs_game_meta_xbox',
			        $_POST['ghs_game_meta_xbox']
		        );
	        }
	        if(isset($_POST['ghs_game_meta_steam'])) {
		        update_post_meta( $post_id,
			        'ghs_game_meta_steam',
			        $_POST['ghs_game_meta_steam']
		        );
	        }
	        if(isset($_POST['ghs_game_meta_epic'])) {
		        update_post_meta( $post_id,
			        'ghs_game_meta_epic',
			        $_POST['ghs_game_meta_epic']
		        );
	        }

            if(isset($_POST['ghs_games_slide_1'])) {
	            update_post_meta( $post_id,
		            'ghs_games_slide_1',
		            $_POST['ghs_games_slide_1']
	            );
            }

            if(isset($_POST['ghs_games_slide_2'])) {
	            update_post_meta( $post_id,
		            'ghs_games_slide_2',
		            $_POST['ghs_games_slide_2']
	            );
            }

            if(isset($_POST['ghs_games_slide_3'])) {
	            update_post_meta( $post_id,
		            'ghs_games_slide_3',
		            $_POST['ghs_games_slide_3']
	            );
            }

            if(isset($_POST['ghs_games_slide_4'])) {
	            update_post_meta( $post_id,
		            'ghs_games_slide_4',
		            $_POST['ghs_games_slide_4']
	            );
            }

            if(isset($_POST['ghs_games_choice_cat'])){
                update_post_meta( $post_id,
                'ghs_games_choice_cat',
                $_POST['ghs_games_choice_cat']
                );
            }
            break;
    }
}

function ghs_games_choice_cat_metaboxes($object){
    ?>

    <div>
        <label for="ghs_games_choice_cat">Feature Category</label>
        <div class="ghs_games_choice_cat">
            <select name="ghs_games_choice_cat">

                <option value="">Select Category</option>
	            <?php
	            $args = ['hide_empty' => false];
	            $categories = get_categories($args);
                foreach ($categories as $cat): ?>
                    <option value="<?php echo $cat->term_id ?>"
                        <?php selected( get_post_meta($object->ID, "ghs_games_choice_cat", true), $cat->term_id ); ?>>
                        <?php echo $cat->name ?>
                    </option>
	            <?php endforeach; ?>

            </select>
        </div>
    </div>

    <?php
}

function ghs_games_slide_metaboxes($object){
    ?>

    <div>
        <label for="ghs_games_slide_1">Slide 1</label>
        <div class="input-group mb-3 ghs_games_slide_1">
            <input name="ghs_games_slide_1" type="text" class="form-control ghs_games_slide_1" id="ghs_games_slide_1" aria-describedby="basic-addon3" value="<?php echo get_post_meta($object->ID, "ghs_games_slide_1", true) ?>">
        </div>

        <label for="ghs_games_slide_2">Slide 2</label>
        <div class="input-group mb-3 ghs_games_slide_2">
            <input name="ghs_games_slide_2" type="text" class="form-control ghs_games_slide_2" id="ghs_games_slide_2" aria-describedby="basic-addon3" value="<?php echo get_post_meta($object->ID, "ghs_games_slide_2", true) ?>">
        </div>

        <label for="ghs_games_slide_3">Slide 3</label>
        <div class="input-group mb-3 ghs_games_slide_3">
            <input name="ghs_games_slide_3" type="text" class="form-control ghs_games_slide_3" id="ghs_games_slide_3" aria-describedby="basic-addon3" value="<?php echo get_post_meta($object->ID, "ghs_games_slide_3", true) ?>">
        </div>

        <label for="ghs_games_slide_4">Youtube Link</label>
        <div class="input-group mb-3 ghs_games_slide_4">
            <input name="ghs_games_slide_4" type="text" class="form-control ghs_games_slide_4" id="ghs_games_slide_4" aria-describedby="basic-addon3" value="<?php echo get_post_meta($object->ID, "ghs_games_slide_4", true) ?>">
        </div>
    </div>

    <?php
}

function ghs_game_metaboxes($object){
    $jsonFiles = preg_grep('~\.(json)$~', scandir(unity_path_dir));
    ?>
    <div>
        <label for="ghs_game_meta">Playable Game</label>
        <select id="ghs_game_meta" class="ghs_game_select" name="ghs_game_meta" class="postbox">
            <option value="">Select a game</option>
            <?php foreach ($jsonFiles as $js): ?>
                <option value="<?php echo $js ?>" <?php selected( get_post_meta($object->ID, "ghs_game_meta", true), $js ); ?>><?php echo $js ?></option>
            <?php endforeach; ?>
        </select>
    </div>
    <?php
}

function ghs_games_availability_metaboxes($object){
    ?>

    <div>
        <label for="ghs_game_meta_android">Android</label>
        <div class="input-group mb-3 ghs_game_meta_android">
            <input name="ghs_game_meta_android" type="text" class="form-control ghs_game_meta_android" id="ghs_game_meta_android" aria-describedby="basic-addon3" value="<?php echo get_post_meta($object->ID, "ghs_game_meta_android", true) ?>">
        </div>

        <label for="ghs_game_meta_ios">IOS</label>
        <div class="input-group mb-3 ghs_game_meta_ios">
            <input name="ghs_game_meta_ios" value="<?php echo get_post_meta($object->ID, "ghs_game_meta_ios", true) ?>" type="text" class="form-control ghs_game_meta_ios" id="ghs_game_meta_ios" aria-describedby="basic-addon3">
        </div>

        <label for="ghs_game_meta_ps">Playstation</label>
        <div class="input-group mb-3 ghs_game_meta_ps">
            <input name="ghs_game_meta_ps" type="text" value="<?php echo get_post_meta($object->ID, "ghs_game_meta_ps", true) ?>" class="form-control ghs_game_meta_ps" id="ghs_game_meta_ps" aria-describedby="basic-addon3">
        </div>

        <label for="ghs_game_meta_nintendo">Nintendo</label>
        <div class="input-group mb-3 ghs_game_meta_nintendo">
            <input name="ghs_game_meta_nintendo" type="text" value="<?php echo get_post_meta($object->ID, "ghs_game_meta_nintendo", true) ?>" class="form-control ghs_game_meta_nintendo" id="ghs_game_meta_nintendo" aria-describedby="basic-addon3">
        </div>

        <label for="ghs_game_meta_xbox">Xbox</label>
        <div class="input-group mb-3 ghs_game_meta_xbox">
            <input name="ghs_game_meta_xbox" type="text" value="<?php echo get_post_meta($object->ID, "ghs_game_meta_xbox", true) ?>" class="form-control ghs_game_meta_xbox" id="ghs_game_meta_xbox" aria-describedby="basic-addon3">
        </div>

        <label for="ghs_game_meta_steam">Steam</label>
        <div class="input-group mb-3 ghs_game_meta_steam">
            <input name="ghs_game_meta_steam" type="text" value="<?php echo get_post_meta($object->ID, "ghs_game_meta_steam", true) ?>" class="form-control ghs_game_meta_steam" id="ghs_game_meta_steam" aria-describedby="basic-addon3">
        </div>

        <label for="ghs_game_meta_epic">Epic Game Store</label>
        <div class="input-group mb-3 ghs_game_meta_epic">
            <input name="ghs_game_meta_epic" type="text" value="<?php echo get_post_meta($object->ID, "ghs_game_meta_epic", true) ?>" class="form-control ghs_game_meta_epic" id="ghs_game_meta_epic" aria-describedby="basic-addon3">
        </div>
    </div>

    <?php

}

function ghs_youtube_metaboxes($object){

    ?>
    <div>
        <label for="ghs_youtube_meta">Link</label>
        <input name="ghs_youtube_meta" type="text" value="<?php echo get_post_meta($object->ID, "ghs_youtube_meta", true); ?>">
    </div>
    <?php
}

function ghs_podcast_metaboxes($object){

    ?>
    <div>
        <label for="ghs_podcast_meta">Link</label>
        <input name="ghs_podcast_meta" type="text" value="<?php echo get_post_meta($object->ID, "ghs_podcast_meta", true); ?>">
    </div>
    <?php
}

function ghs_ad_msg_metabox($object){
    var_dump(get_post_meta( $object->ID, 'ghs_ad_msg_meta', true));
    ?>
    <div>
        <label for="ghs_ad_msg_meta">Has Affiliate Links or Sponsored Content</label>
        <input type="checkbox" name="ghs_ad_msg_meta" id="ghs_ad_msg_meta" value="<?php echo get_post_meta( $object->ID, 'ghs_ad_msg_meta', true ) ?>" <?php if( get_post_meta( $object->ID, 'ghs_ad_msg_meta', true ) == true ): echo 'checked="checked"'; else: echo ''; endif; ?> />
    </div>
    <?php
}
