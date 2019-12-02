<?php 
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $url_part =  (explode("/", $path));
    $formType = ($url_part[2] == 'add.php')? 'add': 'edit'; 
?>

<form class="form-container j-isLoggedIn" method="post" id="<?php echo $formType ?>Form">
    <fieldset>
        <h2><?php echo ($formType == 'add') ? "Add Location" : "Edit Location" ?></h2>
        <div id="addError"></div>
        <div class="form-group">
            <label for="name">Name of place/business</label>
          <input type="text" id="name" name="name" class="form-control">
        </div>
        <div class="form-group">
            <label for="address">Address</label>
            <input type="text" id="address" name="address" class="form-control">
        </div>
        <div class="form-group">
            <label for="postcode">Postcode</label>
          <input type="text" id="postcode" name="postcode" class="form-control">
        </div>
        <div class="form-group">
            <label for="category">Categories</label>
            <select name="category" id="category" class="form-control">

            </select>
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <textarea type="text" id="description" name="description" class="form-control"></textarea>
        </div>
        <div class="form-group">
            <label for="website">Website</label>
            <input type="text" id="website" name="website" class="form-control">
        </div>
        <div class="form-group">
            <label for="twitter">Twitter</label>
            <input type="text" id="twitter" name="twitter" class="form-control">
        </div>
        <div class="form-group">
            <label for="instagram">Instagram</label>
            <input type="text" id="instagram" name="instagram" class="form-control">
        </div>
        <div class="form-group">
            <label for="facebook">Facebook</label>
            <input type="text" id="facebook" name="facebook" class="form-control">
        </div>
    </fieldset>

    <button value="Submit" class="btn btn-primary" onclick="sendData(event, 'add/location', addFormCallback)">Submit</button>
</form>

<div class="j-isNotLoggedIn">
    <h2>Sorry</h2>
    <p>You must be logged in to add an event. Please <a href="#" class="j-loginButton">login</a> or <a href="./register.php">register</a></p>
</div>