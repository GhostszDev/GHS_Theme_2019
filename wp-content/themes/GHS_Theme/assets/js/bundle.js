var set_social = function(){

    var data = {
        'action': 'ghs_set_social',
        'post_type': 'POST',
        'facebook': jQuery('.ghs-set-social-facebook').val(),
        'twitter': jQuery('.ghs-set-social-twitter').val(),
        'tumblr': jQuery('.ghs-set-social-tumblr').val(),
        'instagram': jQuery('.ghs-set-social-instagram').val(),
        'youtube': jQuery('.ghs-set-social-youtube').val(),
        'snapchat': jQuery('.ghs-set-social-snapchat').val(),
    };

    jQuery.post("admin-ajax.php", data, function (response) {
        console.log(response);
        if(response.success){
            jQuery('.ghs_admin_alert').css('display','block').addClass('ghs_success');
        }else{
            jQuery('.ghs_admin_alert').css('display','block').addClass('ghs_error');
        }
    }, 'json');

};

var get_social = function(){

    var data = {
        'action': 'ghs_get_social',
        'post_type': 'POST',
        'name': ''
    };

    jQuery.post("admin-ajax.php", data, function (response) {

        if(response.success){
            jQuery('.ghs-set-social-facebook').val(response.social[0].FaceBookName);
        }
    }, 'json');

};

get_social();

jQuery(document).ready(function () {

    var init = function(){

        if(jQuery('#wpadminbar').length > 0){
            var wpadminHeight = jQuery('#wpadminbar').outerHeight(true);
            jQuery('nav').css('margin-top', wpadminHeight);
            jQuery('.ghs-content').css('margin-top', jQuery('nav').outerHeight(true)-18);
        } else {
            jQuery('.ghs-content').css('margin-top', jQuery('nav').outerHeight(true)+18);
        }

    };

    init();
});