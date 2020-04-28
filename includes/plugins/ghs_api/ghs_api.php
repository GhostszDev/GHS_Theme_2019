<?php
/*
Plugin Name: GHS API
Description: This API contains all restful functions
Author: Steven "Ghost" Rivera
*/

//actions
add_action('rest_api_init', 'ghs_api_routes');

//filters


//functions
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
//            'permission_callback' => function () {
//                return is_user_admin();
//            }
        ));
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

function ghs_api_login(){}


