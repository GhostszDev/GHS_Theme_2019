<?php
/*
Plugin Name: GHS API
Description: This API contains all restful functions
Author: Steven "Ghost" Rivera
*/

//actions
add_action('rest_api_init', 'ghs_api_routes');

//filters
add_filter('rest_url_prefix', 'ghs_rest_url_prefix');

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

    register_rest_route('ghs_api/'.$v, '/set_social',
        array(
            'methods' => 'POST',
            'callback' => 'ghs_api_set_social',
            'args' => array(
                'facebook' => array(
                    'validate_callback' => function($parameter, $request, $key) {
                        return filter_var($parameter, FILTER_VALIDATE_URL);
                    },),
                'twitter' => array(
                    'validate_callback' => function($parameter, $request, $key) {
                        return filter_var($parameter, FILTER_VALIDATE_URL);
                    },),
                'tumblr' => array(
                    'validate_callback' => function($parameter, $request, $key) {
                        return filter_var($parameter, FILTER_VALIDATE_URL);
                    },),
                'instagram' => array(
                    'validate_callback' => function($parameter, $request, $key) {
                        return filter_var($parameter, FILTER_VALIDATE_URL);
                    },),
                'youtube' => array(
                    'validate_callback' => function($parameter, $request, $key) {
                        return filter_var($parameter, FILTER_VALIDATE_URL);
                    },),
                'snapchat' => array(
                    'validate_callback' => function($parameter, $request, $key) {
                        return filter_var($parameter, FILTER_VALIDATE_URL);
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

//	register_rest_route('ghs_api/'.$v, '/testFunction',
//		array(
//			'methods' => 'GET',
//			'callback' => 'testFunction'
//		));
}

function testFunction(){
	return current_user_can( 'edit_posts' );
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

        $signon = wp_signon($userInfo, true);

        if($signon->errors){
            if($signon->errors['incorrect_password'] or $signon->errors['invalid_username']){
                $data['error_message'] = "Please check the information entered!";
            }
        } else {
            $authLogin = [
                'username' => $request['user'],
                'password' => $request['password'],

            ];
            $data['success'] = true;
            $sendData = [
                'body'    => $authLogin,
                'headers' => array(
                    'Content-Type' => 'application/x-www-form-urlencoded'
                ),
            ];
            $authInfo = wp_remote_post(site_url() . '/api/jwt-auth/v1/token', $sendData);
            $token = json_decode(wp_remote_retrieve_body($authInfo));

            if($token->token){
                setcookie('Token', $token->token, time() + (DAY_IN_SECONDS * 7), COOKIEPATH, COOKIE_DOMAIN);
                $data['success'] = true;
                $data['token'] = $token->token;
                $data['name'] = $signon->user_nicename;
                $data['user_icon'] = gravatarToBase64(get_avatar_url($signon->ID));
                $data['useBlob'] = true;
            } else {
                $data['success'] = false;
                $data['error_message'] = "Failed to authentication user!";
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


