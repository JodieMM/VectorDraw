	<div class="signup">
	<form action="<?php echo htmlspecialchars($_SERVER['REQUEST_URI']); ?>" onsubmit="return validateSignUp()" method="post">
		<h1> Sign Up </h1>
		<p> Create an Opti account to download software or register for updates. </p>
		<div class="inputline">
			<input type="email" id="email" name="email" placeholder="Email" <?php if (isset($_POST['email'])) {echo 'value = '.cleanEmail($_POST['email']);}?>>
			<input type="password" id="password" name="password" placeholder="Password">
			<input type="password" id="passwordconfirm" name="passwordconfirm" placeholder="Confirm Password">
		</div>
		<div class="inputline">
			<input type="checkbox" id="ppcheckbox" name="ppcheckbox"> 
			I understand and agree to the <a target="_blank", href="privacy_policy">Privacy Policy</a> and Optimator <a target="_blank", href="terms_and_conditions">Terms and Conditions.</a>
		</div>
		<p class="error" id="signuperror" <?php if (isset($_POST['email']) && $error != '') {echo 'style="display:block;"';}?>>
			<?php if (isset($_POST['email']) && $error != '') {echo $error;}?>
		</p>
		<div class="inputline">
			<button id="signupbtn">Sign Up</button>
		</div>
	</form>
	</div>