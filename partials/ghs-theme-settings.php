<section class="ghs_theme_settings">

    <h1>Theme Settings</h1>

    <div class="ghs_admin_alert" role="alert">
        <strong>Oh snap!</strong> Change a few things up and try submitting again.
    </div>

    <table style="width:100%">
        <tr>
            <th>Facebook:</th>
            <td><input onchange="checkURL(this.value)" class="theme-settings-input ghs-set-social-facebook" placeholder="Facebook"></td>
        </tr>
        <tr>
            <th>Twitter:</th>
            <td><input class="theme-settings-input ghs-set-social-twitter" placeholder="Twitter"></td>
        </tr>
        <tr>
            <th>Tumblr:</th>
            <td><input class="theme-settings-input ghs-set-social-tumblr" placeholder="Tumblr"></td>
        </tr>
        <tr>
            <th>Instagram:</th>
            <td><input class="theme-settings-input ghs-set-social-instagram" placeholder="Instagram"></td>
        </tr>
        <tr>
            <th>Youtube:</th>
            <td><input class="theme-settings-input ghs-set-social-youtube" placeholder="Youtube"></td>
        </tr>
        <tr>
            <th>Snapchat:</th>
            <td><input class="theme-settings-input ghs-set-social-snapchat" placeholder="Snapchat"></td>
        </tr>
    </table>

    <button onclick="set_social()">Submit</button>

</section>

<section class="ghs_theme_cat_settings">

    <div class="ghs_admin_alert" role="alert">
        <strong>Oh snap!</strong> Change a few things up and try submitting again.
    </div>

    <div class="ghs_theme_cat_options">

        <select class="ghs_theme_cat_1"><option value="" disabled selected hidden>Category 1</option></select>
        <select class="ghs_theme_cat_2"><option value="" disabled selected hidden>Category 2</option></select>
        <select class="ghs_theme_cat_3"><option value="" disabled selected hidden>Category 3</option></select>

    </div>

    <button onclick="set_theme_cats()">Submit</button>

</section>