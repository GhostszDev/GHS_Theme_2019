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
    <div class="d-flex justify-content-between mt-3">
        <a class="btn btn-primary ghs_button" onclick="login()" role="button">Submit</a>
        <?php if(get_page_by_path('sign-up') ): ?>
            <a href="<?php echo site_url('/sign-up') ?>">Sign Up</a>
        <?php endif; ?>
    </div>
</section>

<?php get_footer(); ?>
