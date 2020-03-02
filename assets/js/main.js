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

    jQuery.post(ghs_ajax_obj.ajaxurl, data, function (response) {
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

    jQuery.post(ghs_ajax_obj.ajaxurl, data, function (response) {

        if(response.success){
            jQuery('.ghs-set-social-facebook').val(response.social[0].FaceBookName);
            jQuery('.ghs-set-social-twitter').val(response.social[0].TwitterName);
            jQuery('.ghs-set-social-tumblr').val(response.social[0].TumblrName);
            jQuery('.ghs-set-social-youtube').val(response.social[0].YoutubeName);
            jQuery('.ghs-set-social-snapchat').val(response.social[0].SnapChatName);
            jQuery('.ghs-set-social-instagram').val(response.social[0].InstagramName);
        }
    }, 'json');

};

var set_hero_settings = function () {

    var hbi = {
        },
        heroBannerData = {
            title: jQuery('.ghs-hero-banner-title').val(),
            titleTag: jQuery('.ghs-hero-banner-title-tag').val(),
            subtitle: jQuery('.ghs-hero-banner-subtitle').val(),
            subtitleTag: jQuery('.ghs-hero-banner-subtitle-tag').val(),
            theme: jQuery('.ghs-hero-banner-theme').val(),
            link: jQuery('.ghs-hero-banner-link').val()
        },
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
                'hero-banner-title': heroBannerData.title,
                'hero-banner-title-tag': heroBannerData.titleTag,
                'hero-banner-subtitle': heroBannerData.subtitle,
                'hero-banner-subtitle-tag': heroBannerData.subtitleTag,
                'hero-banner-theme': heroBannerData.theme,
                'hero-banner-link': heroBannerData.link
            };

            jQuery.post(ghs_ajax_obj.ajaxurl, data, function (response) {

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
        action: 'ghs_get_hero_settings'
    };

    jQuery.post(ghs_ajax_obj.ajaxurl, data, function (response) {

        if(response.success){
            if(jQuery('.ghs_hero_banner').length > 0){
                jQuery('.ghs_hero_banner').css({
                    "background-color":"black",
                    "background-image":"url('"+ response.hero_banner_img +"')",
                    "background-repeat": "no-repeat",
                    "background-position":  "center center"
                });
            }

            if(jQuery('.ghs_hero_preview').length > 0){
                jQuery('.ghs_hero_preview').css({
                    "display":"block",
                    "background-image":"url('"+ response.hero_banner_img +"')",
                    "background-repeat": "no-repeat",
                    "background-position":  "center center"
                });
                jQuery('.ghs-hero-banner-title').val(response.hero_banner_data[0].Title);
                jQuery('.ghs-hero-banner-title-tag').val(response.hero_banner_data[0].TitleTag);
                jQuery('.ghs-hero-banner-subtitle').val(response.hero_banner_data[0].Subtitle);
                jQuery('.ghs-hero-banner-subtitle-tag').val(response.hero_banner_data[0].SubtitleTag);
                jQuery('.ghs-hero-banner-theme').val(response.hero_banner_data[0].TextBgColor);
                jQuery('.ghs-hero-banner-link').val(response.hero_banner_data[0].Link);
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

jQuery(document).ready(function ($) {

    var init = function(){

        if($('#wpadminbar').length > 0){
            var wpadminHeight = jQuery('#wpadminbar').outerHeight(true);
            $('nav').css('margin-top', wpadminHeight);
            $('.ghs-content').css('margin-top', jQuery('nav').outerHeight(true)-18);
        } else {
            $('.ghs-content').css('margin-top', jQuery('nav').outerHeight(true)+18);
        }

        if($('.ghs_hero_banner').length > 0){
            get_hero_settings();
        }

    };

    init();
      
});
