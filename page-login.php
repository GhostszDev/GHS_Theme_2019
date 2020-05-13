<?php get_header(); ?>

<section class="ghs_login">
    <div class="alert alert-danger ghs-login-alert"></div>
    <div class="form-group">
        <label for="usr">Username/Email:</label>
        <input type="text" class="form-control ghs-username" id="usr">
    </div>
    <div class="form-group">
        <label for="pwd">Password:</label>
        <input type="password" class="form-control ghs-pwd" id="pwd">
    </div>
    <div class="checkbox">
        <label><input type="checkbox" value="" class="ghs-remember"> Remember Me</label>
    </div>
    <a class="btn btn-primary ghs_button" onclick="login()" role="button">Submit</a>
</section>

<?php get_footer(); ?>
