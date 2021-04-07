var set_social = function(){

    jQuery.ajax({
        method: 'POST',
        url: ghs_obj.ghs_api_uri + 'set_social',
        headers: {
            Authorization: 'Bearer ' + Cookies.get('Token')
        },
        data: {
            facebook: jQuery('.ghs-set-social-facebook').val(),
            twitter: jQuery('.ghs-set-social-twitter').val(),
            tumblr: jQuery('.ghs-set-social-tumblr').val(),
            instagram: jQuery('.ghs-set-social-instagram').val(),
            youtube: jQuery('.ghs-set-social-youtube').val(),
            snapchat: jQuery('.ghs-set-social-snapchat').val(),
        }
    }).done(function(response) {
        console.log(response);
        if(response.success){
            jQuery('.ghs_admin_alert').css('display','block').addClass('ghs_success');
            jQuery('.ghs_admin_alert .ghs_msg').append(response.success_msg);
        }else{
            jQuery('.ghs_admin_alert').css('display','block').addClass('ghs_error');
            jQuery('.ghs_admin_alert .ghs_msg').append(response.data);
        }
    })

};

var get_social = function(){
    var data = {

    };

    jQuery.get(ghs_obj.ghs_api_uri + 'get_social', data, function (response) {

        if(response.success){
            if(document.URL.indexOf("page=ghs-theme-settings") !== -1) {
                jQuery('.ghs-set-social-facebook').val(response.social.facebook);
                jQuery('.ghs-set-social-twitter').val(response.social.twitter);
                jQuery('.ghs-set-social-tumblr').val(response.social.tumblr);
                jQuery('.ghs-set-social-youtube').val(response.social.youtube);
                jQuery('.ghs-set-social-snapchat').val(response.social.snapchat);
                jQuery('.ghs-set-social-instagram').val(response.social.instagram);
            } else {
                if(jQuery('.social-list').length > 0){
                    jQuery.each(response.social, function (i, val) {

                        if(val !== ''){
                            jQuery('.social-list').append("<li class='ghs-social-"+ i +"'><a href='"+val+"'><i class='fab fa-"+ i +"-square'></i></a></li>")
                        }
                    });
                }
            }
        }
    }, 'json');

};

var get_theme_cats = function(){
    var data = {

    };

    jQuery.get(ghs_obj.ghs_api_uri + 'get_theme_cats', data, function (response) {

        if(response.success){
            if(document.URL.indexOf("page=ghs-theme-settings") !== -1) {

                if(response.cats.length > 0){
                    jQuery.each(response.cats, function (i, val) {

                        if(val !== ''){
                            jQuery('.ghs_theme_cat_settings .ghs_theme_cat_options .ghs_theme_cat_1').append(new Option(val.name, val.ID));
                            jQuery('.ghs_theme_cat_settings .ghs_theme_cat_options .ghs_theme_cat_2').append(new Option(val.name, val.ID));
                            jQuery('.ghs_theme_cat_settings .ghs_theme_cat_options .ghs_theme_cat_3').append(new Option(val.name, val.ID));
                        }
                    });
                }

                if(response.selected.length > 0){
                    jQuery('.ghs_theme_cat_settings .ghs_theme_cat_options .ghs_theme_cat_1').val(response.selected[0].cat_1);
                    jQuery('.ghs_theme_cat_settings .ghs_theme_cat_options .ghs_theme_cat_2').val(response.selected[0].cat_2);
                    jQuery('.ghs_theme_cat_settings .ghs_theme_cat_options .ghs_theme_cat_3').val(response.selected[0].cat_3);
                }

            }
        }
    }, 'json');

};

var set_theme_cats = function(){
    var tc = {};

    jQuery.ajax({
        method: 'POST',
        url: ghs_obj.ghs_api_uri + 'set_theme_cats',
        headers: {
            Authorization: 'Bearer ' + Cookies.get('Token')
        },
        data: {
            cat1: jQuery('.ghs_theme_cat_settings .ghs_theme_cat_options .ghs_theme_cat_1').val(),
            cat2: jQuery('.ghs_theme_cat_settings .ghs_theme_cat_options .ghs_theme_cat_2').val(),
            cat3: jQuery('.ghs_theme_cat_settings .ghs_theme_cat_options .ghs_theme_cat_3').val(),
        }
    }).done(function(response) {
        console.log(response);
        if(response.success){
            jQuery('.ghs_theme_cat_settings .ghs_admin_alert').css('display','block').addClass('ghs_success');
        }else{
            jQuery('.ghs_theme_cat_settings .ghs_admin_alert').css('display','block').addClass('ghs_error');
        }
    })
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

            jQuery.post(ghs_obj.ajaxurl, data, function (response) {

                if(response.success){
                    jQuery('.ghs_admin_alert').css('display','block').addClass('ghs_success');
                }else{
                    jQuery('.ghs_admin_alert').css('display','block').addClass('ghs_error');
                }
            }, 'json');
        };
    }

};

var goToPage = function(url){
    window.location.href = url;
}

var checkURL = function(url){
    console.log(url);
    // if (validUrl.isUri(suspect)){
    //     console.log('Looks like an URI');
    // } else {
    //     console.log('Not a URI');
    // }
}

var copyToClipboard = function(copyInputText){
    var hiddenInput = document.getElementById('copyInput');
    hiddenInput.value = copyInputText;

    /* Select the text field */
    hiddenInput.select();
    hiddenInput.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand('copy');

    /* Alert the copied text */
    alert("Copied the text: " + hiddenInput.value);
}

function addToMailingList() {
    var email = jQuery('.ghs_email_list')[1].firstElementChild.value;

    jQuery.ajax({
        method: 'POST',
        url: ghs_obj.ghs_api_uri + 'ghs_add_to_mailing_list',
        headers: {
            Authorization: 'Bearer ' + Cookies.get('Token')
        },
        data: {
            'mailingListEmail': email
        }
    }).done(function(response) {
        console.log(response);
        if(response.success){
            if(jQuery('.ghs_email_list').length > 1){
                var ghs_email_list = jQuery('.ghs_email_list');
                ghs_email_list.empty();
                ghs_email_list.append('<div class="ghs_email_success">' +
                    '<p>Thank for joining the mailing list!</p>' +
                    '</div>');
            }
        }else{
            console.error(response.error_msg);
        }
    })

}

function login(){
     var data = {
         user: jQuery('.ghs-username').val(),
         password: jQuery('.ghs-pwd').val(),
         remember: jQuery('.ghs-remember').is(':checked')
     };

     if(data.user && data.password) {
         jQuery.post(ghs_obj.ghs_api_uri + 'login', data, function (response) {
             console.log(response);
             if (response.success) {
                 jQuery('.ghs-login-alert').css("display", "none").empty();
                 goToPage(ghs_obj.ghs_site);
             } else {
                 if (response.error_message) {
                     jQuery('.ghs-login-alert').css("display", "block").empty().append(response.error_message);
                 }
             }
         }, 'json');
     } else {
         jQuery('.ghs-login-alert').css("display", "block").empty().append("Missing Username/Email or Password");
     }
}

function signup(){
     var data = {
         user: jQuery('.ghs-username').val(),
         password: jQuery('.ghs-pwd').val(),
         email: jQuery('.ghs-email').val()
     };

     if(data.user && data.password && data.email) {
         jQuery.post(ghs_obj.ghs_api_uri + 'signup', data, function (response) {
             console.log(response);
             if (response.success) {
                 jQuery('.ghs-login-alert').css("display", "none").empty();
                 goToPage(ghs_obj.ghs_site);
             } else {
                 if (response.error_message) {
                     jQuery('.ghs-login-alert').css("display", "block").empty().append(response.error_message);
                 }
             }
         }, 'json');
     } else {
         jQuery('.ghs-login-alert').css("display", "block").empty().append("Missing Username, Email or Password");
     }
}



if(document.URL.indexOf("page=ghs-theme-settings") !== -1) {
    //found
    get_social();
    get_theme_cats();
}

if(document.URL.indexOf("page=ghs_theme_settings_hps") !== -1) {
    //found
    get_hero_settings();
}

jQuery( document ).ready(function($) {

    var init = function(){

        if($('#wpadminbar').length > 0){
            var wpadminHeight = jQuery('#wpadminbar').outerHeight(true);
            $('nav').css('margin-top', wpadminHeight);
        }

        if ($('.social-list').length > 0) {
            get_social();
        }

        if ($('.ghs_hero_banner').length > 0) {
            $('.ghs_hero_banner .ghs_vid_play_btn').on( "click", "svg", function() {
                $(this).fadeOut();
                $('.ghs_hero_banner').css('background', 'none');
                if($('.ghs_hero_banner #ytplayer').length > 0) {
                    $('.ghs_hero_banner #ytplayer').css('display', 'block');
                }

                if($('.ghs_hero_banner #ghs_game').length > 0) {
                    $('.ghs_hero_banner #ghs_game').css('display', 'block');
                }
            });
        }

        if($('.slick').length > 0){
            $('.slick').slick({
                // slidesToShow: 1,
                // slidesToScroll: 1,
                // autoplay: true,
                // autoplaySpeed: 3000,
                // dots: true,
                // infinite: true,
                // adaptiveHeight: true,
                // arrows: false
            });

            // var video = $('.slick .slick-active').find('iframe').get(0).play();
            //
            // $('.slick').on('afterChange', function(event, slick, currentSlide, nextSlide){
            //     $('.slick .slick-slide').find('video').get(0).pause();
            //     var video = $('.slick .slick-active').find('video').get(0).play();
            // });
        }

    };

    init();
      
});
