<section class="ghs_theme_settings">

    <h1>Home Page Settings</h1>

    <div class="ghs_admin_alert" role="alert">
        <strong>Oh snap!</strong> Change a few things up and try submitting again.
    </div>

    <div class="ghs_hero_preview">
    </div>

    <table style="width:100%">
        <tr>
            <th>Hero Banner:</th>
            <td><input class="theme-settings-input ghs-hero-banner-img" type="file" accept="image/jpeg"></td>
        </tr>
        <tr>
            <th>Title:</th>
            <td>
                <select class="theme-settings-select ghs-hero-banner-title-tag">
                    <option value="h1">H1</option>
                    <option value="h2" selected>H2</option>
                    <option value="h3">H3</option>
                    <option value="h4">H4</option>
                    <option value="h5">H5</option>
                    <option value="h6">H6</option>
                    <option value="p">P</option>
                </select>
                <br>
                <br>
                <input type="text" class="theme-settings-input ghs-hero-banner-title" placeholder="Title">
            </td>
        </tr>
        <tr>
            <th>Subtitle:</th>
            <td>
                <select class="theme-settings-select ghs-hero-banner-subtitle-tag">
                    <option value="h1">H1</option>
                    <option value="h2" selected>H2</option>
                    <option value="h3">H3</option>
                    <option value="h4">H4</option>
                    <option value="h5">H5</option>
                    <option value="h6">H6</option>
                    <option value="p">P</option>
                </select>
                <br>
                <br>
                <input type="text" class="theme-settings-input ghs-hero-banner-subtitle" placeholder="Subtitle">
            </td>
        </tr>
        <tr>
            <th>Theme:</th>
            <td>
                <select class="theme-settings-select ghs-hero-banner-theme">
                    <option value="dark">Dark</option>
                    <option value="light" selected>Light</option>
                </select>
            </td>
        </tr>
        <tr>
            <th>Link:</th>
            <td>
                <input type="url" class="theme-settings-input ghs-hero-banner-link" placeholder="Link">
            </td>
        </tr>
    </table>

    <button onclick="set_hero_settings()">Submit</button>

</section>