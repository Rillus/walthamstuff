<?php 
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $url_part =  (explode("/", $path));
    $formType = ($url_part[2] == 'add.php')? 'add': 'edit'; 
    ?>

<form class="form-container" method="post" id="<?php echo $formType ?>Form">
  <fieldset>
      <h2><?php echo ($formType == 'add') ? "Add Location" : "Edit Location" ?></h2>
      <div class="form-group">
          <label for="postcode">Postcode</label>
          <input type="text" id="postcode" name="postcode" class="form-control">
      </div>
      <div class="form-group">
          <label for="name">Name of Place</label>
          <input type="text" id="name" name="name" class="form-control">
      </div>
      <div class="form-group">
          <label for="address">Address</label>
          <input type="text" id="address" name="address" class="form-control">
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

  </fieldset>
  <fieldset>
      <div class="form-group">
          <label for="contributor_name">Your name</label>
          <input type="text" id="contributor_name" name="contributor_name" class="form-control">
      </div>
      <div class="form-group">
          <label for="contributor_email">Your email <small>(so we can keep you updated about your submission)</small></label>
          <input type="text" id="contributor_email" name="contributor_email" class="form-control">
      </div>
  </fieldset>
  <button value="Submit" class="btn btn-primary" onclick="sendData(event, 'add/location')">Submit</button>
</form>