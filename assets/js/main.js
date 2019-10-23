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

    jQuery.post(ajaxurl, data, function (response) {
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

    jQuery.post(ajaxurl, data, function (response) {

        if(response.success){
            jQuery('.ghs-set-social-facebook').val(response.social[0].FaceBookName);
        }
    }, 'json');

};

var set_hero_settings = function () {

    var hbi,
        file = jQuery('.ghs-hero-banner-img')[0].files[0];

    if(file){
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            hbi = e.target.result;

            var data = {
                'action': 'ghs_set_hero_settings',
                'post_type': 'POST',
                'hero-banner-img': hbi,
            };

            jQuery.post(ajaxurl, data, function (response) {

                if(response.success){
                    jQuery('.ghs_admin_alert').css('display','block').addClass('ghs_success');
                }else{
                    jQuery('.ghs_admin_alert').css('display','block').addClass('ghs_error');
                }
            }, 'json');
        };
    }

};

var get_hero_settings = function () {

    var data = {
        'action': 'ghs_get_hero_settings',
        'post_type': 'POST',
        'name': ''
    };

    jQuery.post(ajaxurl, data, function (response) {

        if(response.success){
            if(jQuery('.ghs_hero_preview').length > 0) {
                jQuery('.ghs_hero_preview').css({
                    "display" : "block",
                    "background-image" : "url('"+response.hero_banner_img+"')",
                    "background-size" : "100%",
                    "background-position" : "center"
                });
            }

            if(jQuery('.ghs_hero_banner').length > 0){
                jQuery('.ghs_hero_banner').css({
                    "display" : "block",
                    "background-image" : "url('"+response.hero_banner_img+"')",
                    "background-size" : "100%",
                    "background-position" : "center"
                });
            }
        }
    }, 'json');

};

if(document.URL.indexOf("page=ghs-theme-settings") !== -1) {
    //found
    get_social();
}

if(document.URL.indexOf("page=ghs_theme_settings_hps") !== -1) {
    //found
    get_hero_settings();
}




jQuery(document).ready(function () {

    var init = function(){

        if(jQuery('#wpadminbar').length > 0){
            var wpadminHeight = jQuery('#wpadminbar').outerHeight(true);
            jQuery('nav').css('margin-top', wpadminHeight);
            jQuery('.ghs-content').css('margin-top', jQuery('nav').outerHeight(true)-18);
        } else {
            jQuery('.ghs-content').css('margin-top', jQuery('nav').outerHeight(true)+18);
        }

        if(jQuery('.ghs_hero_banner').length > 0){
            get_hero_settings();
        }

    };

    init();
});