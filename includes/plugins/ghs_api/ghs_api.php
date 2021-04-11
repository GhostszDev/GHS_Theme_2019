<?php
/*
Plugin Name: GHS API
Description: This API contains all restful functions
Author: Steven "Ghost" Rivera
*/

//actions
add_action('rest_api_init', 'ghs_api_routes');
add_action( 'wp_logout', 'ghs_jwt_auth_remove_token' );

//filters
add_filter('rest_url_prefix', 'ghs_rest_url_prefix');
add_filter( 'wp_authenticate', 'ghs_jwt_auth', 30, 2 );

//functions
function ghs_rest_url_prefix(){
	return 'api';
}

function ghs_api_routes(){
    $v = 'v1';

    register_rest_route('ghs_api/'.$v, '/get_social',
    array(
        'methods' => 'GET',
        'callback' => 'ghs_api_get_social'
    ));

    register_rest_route('ghs_api/'.$v, '/get_theme_cats',
        array(
            'methods' => 'GET',
            'callback' => 'ghs_api_get_theme_cats'
        ));

    register_rest_route('ghs_api/'.$v, '/set_social',
        array(
            'methods' => 'POST',
            'callback' => 'ghs_api_set_social',
            'args' => array(
                'facebook' => array(
                    'validate_callback' => function($parameter, $request, $key) {
	                    if(!empty($parameter)):
		                    return filter_var($parameter, FILTER_VALIDATE_URL);
	                    else:
		                    return null;
	                    endif;
                    },),
                'twitter' => array(
                    'validate_callback' => function($parameter, $request, $key) {
                        if(!empty($parameter)):
	                        return filter_var($parameter, FILTER_VALIDATE_URL);
                        else:
	                        return null;
                        endif;
                    },),
                'tumblr' => array(
                    'validate_callback' => function($parameter, $request, $key) {
	                    if(!empty($parameter)):
		                    return filter_var($parameter, FILTER_VALIDATE_URL);
	                    else:
		                    return null;
	                    endif;
                    },),
                'instagram' => array(
                    'validate_callback' => function($parameter, $request, $key) {
	                    if(!empty($parameter)):
		                    return filter_var($parameter, FILTER_VALIDATE_URL);
	                    else:
		                    return null;
	                    endif;
                    },),
                'youtube' => array(
                    'validate_callback' => function($parameter, $request, $key) {
	                    if(!empty($parameter)):
		                    return filter_var($parameter, FILTER_VALIDATE_URL);
	                    else:
		                    return null;
	                    endif;
                    },),
                'snapchat' => array(
                    'validate_callback' => function($parameter, $request, $key) {
	                    if(!empty($parameter)):
		                    return filter_var($parameter, FILTER_VALIDATE_URL);
	                    else:
		                    return null;
	                    endif;
                    },),
            ),
            'permission_callback' => function () {
                return current_user_can( 'edit_posts' );
            }
        ));

    register_rest_route('ghs_api/'.$v, '/set_theme_cats',
        array(
            'methods' => 'POST',
            'callback' => 'ghs_api_set_theme_cats',
            'args' => array(
                'cat1' => array(
                    'validate_callback' => function($parameter, $request, $key) {
                        return filter_var($parameter, FILTER_VALIDATE_INT);
                    },),
                'cat2' => array(
                    'validate_callback' => function($parameter, $request, $key) {
                        return filter_var($parameter, FILTER_VALIDATE_INT);
                    },),
                'cat3' => array(
                    'validate_callback' => function($parameter, $request, $key) {
                        return filter_var($parameter, FILTER_VALIDATE_INT);
                    },),
            ),
            'permission_callback' => function () {
                return current_user_can( 'edit_posts' );
            }
        ));

    register_rest_route('ghs_api/'.$v, '/login',
        array(
            'methods' => 'POST',
            'callback' => 'ghs_api_login',
            'args' => array(
                'user' => array('sanitize_callback' => function($param, $request, $key) {
	                return sanitize_text_field( $param );
                }),
                'password' => array('sanitize_callback' => function($param, $request, $key) {
	                return sanitize_text_field( $param );
                })
            ),
        ));
	
	register_rest_route('ghs_api/'.$v, '/signup',
        array(
            'methods' => 'POST',
            'callback' => 'ghs_api_signup',
            'args' => array(
                'user' => array('sanitize_callback' => function($param, $request, $key) {
	                return sanitize_text_field( $param );
                }),
                'password' => array('sanitize_callback' => function($param, $request, $key) {
	                return sanitize_text_field( $param );
                }),
		        'email' => array('validate_callback' => function($parameter, $request, $key) {
					return filter_var($parameter, FILTER_VALIDATE_EMAIL);
	    },),
            ),
        ));

	register_rest_route('ghs_api/'.$v, '/testFunction',
		array(
			'methods' => 'GET',
			'callback' => 'testFunction'
		));

	register_rest_route('ghs_api/'.$v, '/ghs_add_to_mailing_list',
		array(
			'methods' => 'POST',
			'callback' => 'ghs_api_add_to_mailinglist'
		));
}

function ghs_jwt_auth($username, $password){

	$data['success'] = true;
	$request = new WP_REST_Request( 'POST', '/jwt-auth/v1/token' );
	$request->set_query_params( [
		'username' => $username,
		'password' => $password
	] );
	$response = rest_do_request( $request );
	$server = rest_get_server();
	$server_data = $server->response_to_data( $response, false );
	$json = wp_json_encode( $server_data );
	$token = json_decode($json);

	if ( $token->token ) {
		setcookie( 'Token', $token->token, time() + ( DAY_IN_SECONDS * 7 ), COOKIEPATH, COOKIE_DOMAIN );
		$data['success']   = true;
		$data['token']     = $token->token;
		$data['name']      = $token->user_nicename;
		$data['user_icon'] = gravatarToBase64( get_avatar_url( get_user_by('email', $token->user_email )->ID ) );
		$data['useBlob']   = true;
	} else {
		$data['success']       = false;
		$data['error_message'] = "Failed to authentication user!";
	}
	return $data;

}

function ghs_jwt_auth_remove_token(){
	setcookie( 'Token', '', time() + ( DAY_IN_SECONDS * 7 ), COOKIEPATH, COOKIE_DOMAIN );
}

function testFunction(){
//	return current_user_can( 'edit_posts' );
    return get_current_user_id();
}

function ghs_api_add_to_mailinglist($request){
	$data['success'] = false;
	$insertData = [
		'Email' => $request['mailingListEmail'],
		'OptIn' => 1
	];
	$data['insert'] = $insertData;

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

function ghs_api_set_social($request){
    $data['success'] = false;
    global $wpdb;

    $collect = [
        'FaceBookName' => $request['facebook'],
        'TwitterName' => $request['twitter'],
        'TumblrName' => $request['tumblr'],
        'InstagramName' => $request['instagram'],
        'YoutubeName' => $request['youtube'],
        'SnapChatName' => $request['snapchat']
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

    return $data;
}

function ghs_api_get_social(){
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
    return $data;
}

function gravatarToBase64($url){
	$img = file_get_contents($url);
	$blob = base64_encode($img);
	return $blob;
}

function ghs_api_login($request){
    $data['success'] = false;

    if($request['user'] && $request['password']){
        $userInfo = [
            'user_login' => $request['user'],
            'user_password' => $request['password']
        ];

        $signon = wp_signon($userInfo, is_ssl());

        if($signon->errors){
            if($signon->errors['incorrect_password'] or $signon->errors['invalid_username']){
                $data['error_message'] = "Please check the information entered!";
            } else {
            	$data['success'] = true;
            	$data['signIn'] = ghs_jwt_auth($request['user'], $request['password']);
            }
        }
    }

    return $data;
}

function ghs_api_signup($request){
	
	$data['success'] = false;
	
	$user_id = username_exists($request['user']);
	
	if(! $user_id && false == email_exists($request['email'])){
		$user_created = wp_create_user( $request['user'], $request['password'], $request['email'] );
		
		if($user_created){
			$data['success'] = true;
			ghs_api_login($request);
		}
	} else {
		$data['error_message'] = 'Sorry, this user already exist';
	}

	return $data;
	
}

function ghs_api_capture_score($request){
    $data['success'] = false;
    global $wpdb;

    $check = $wpdb->get_results('SELECT ID FROM `' . $request['game_title'] . '`');

    if($check){
        $update = $wpdb->update($request['game_title'], ['score' => $request['score']], ['ID' => get_current_user_id()]);
        if($update){
            $data['success'] = true;
        } else {
            $data['error_message'] = 'ERROR: Failed to update the user ' . get_current_user_id() . ' to the database';
        }
    } else {
        $insert = $wpdb->insert($request['game_title'], ['ID' => get_current_user_id(), 'score' => $request['score']]);
        if($insert){
            $data['success'] = true;
        } else {
            $data['error_message'] = 'ERROR: Failed to insert the user ' . get_current_user_id() . ' to the database';
        }
    }

    return $data;
}

function ghs_api_show_score($request){
    $data['success'] = false;
    global $wpdb;

    $check = $wpdb->get_results('SELECT * FROM `' . $request['game_title'] . '`');

    if($check){
        $data['success'] = true;
        $data['scores'] = $check;
    } else {
        $data['error_message'] = 'ERROR: Failed to get this game\'s leaderboard.';
    }

    return $data;
}

function ghs_api_get_theme_cats(){
    $data['success'] = false;
    global $wpdb;

    $selected = $wpdb->get_results('SELECT * FROM `ghs_cat_selection`');

    $data['selected'] = $selected;

    $categories = get_categories( array(
        'orderby' => 'name',
        'order'   => 'ASC'
    ) );

    if($categories) {
        $data['success'] = true;
        $key = 0;

        foreach ($categories as $c) {
            $data['cats'][$key]['ID'] = $c->cat_ID;
            $data['cats'][$key]['name'] = $c->cat_name;
            $key++;
        }
    }

    return $data;
}

function ghs_api_set_theme_cats($request){
    $data['success'] = false;
    global $wpdb;

    $check = $wpdb->get_results('SELECT * FROM `ghs_cat_selection`');

    if($check){
        for($i = 0; $i < 3; $i++ ) {
            $update = $wpdb->update('ghs_cat_selection',
                ['cat_'.$i => $request['cat'.$i]],
                ['ID' => $i]);
        }
        if($update){
            $data['success'] = true;
        } else {
            $data['error_message'] = 'ERROR: Failed to update the cats to the database';
        }
    } else {
        $insert = $wpdb->insert('ghs_cat_selection', [
                'cat_1' => $request['cat1'],
                'cat_2' => $request['cat2'],
                'cat_3' => $request['cat3']
            ]);
        if($insert){
            $data['success'] = true;
        } else {
            $data['error_message'] = 'ERROR: Failed to insert the cats to the database';
        }
    }

    return $data;
}
