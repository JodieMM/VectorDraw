<form action="
<?php 
	if (isset($_GET['email']))
	{
		echo htmlspecialchars($_SERVER["PHP_SELF"]) . "?email=" . cleanEmail($_GET['email']);
	}
	else
	{
		echo htmlspecialchars($_SERVER["PHP_SELF"]); 
	}
?>
" method="post">
	<div class="inputline details">
		<p>Receive Emails about New Software</p><input type="checkbox" id="detnotinew" name="detnotinew" <?php if($notinewsoft) {echo 'checked';} ?>></input>
	</div>
	<div class="inputline details">
		<p>Receive General Update Emails</p><input type="checkbox" id="detnotigen" name="detnotigen" <?php if($notigeneral) {echo 'checked';} ?>></input>
	</div>
	<input type="hidden" name="nofiupdate">
	<button class="button" id="updatenotibtn">
		Update Notifications
	</button>
</form>