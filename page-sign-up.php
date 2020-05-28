<?php get_header(); ?>

<section class="ghs_signup">
    <div class="alert alert-danger ghs-login-alert"></div>
    <div class="form-group">
        <label for="usr">Username:</label>
        <input type="text" class="form-control ghs-username" id="usr">
    </div>
    <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" class="form-control ghs-email" id="email">
    </div>
    <div class="form-group">
        <label for="pwd">Password:</label>
        <input type="password" class="form-control ghs-pwd" id="pwd">
    </div>
    <div class="d-flex justify-content-between mt-4">
        <a class="btn btn-primary ghs_button" onclick="signup()" role="button">Submit</a>
        <?php if(get_page_by_path('login') ): ?>
            <a href="<?php echo site_url('/login') ?>">Login</a>
        <?php endif; ?>
    </div>
</section>

<?php get_footer(); ?>
