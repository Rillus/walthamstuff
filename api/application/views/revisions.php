<h1>Super magical admin area</h1>

<h2>Newly added locations</h2>
<?php if ($news->num_rows() > 0) { ?>
	<ul>
	<?php foreach($news->result() as $new) { ?>
		<li>
			<?php echo $new->name; ?><br>
			<?php echo $new->description; ?><br>
			<?php echo $new->address; ?><br>
			<?php echo $new->category; ?><br>
			<a href="<?php echo base_url('/edit.html?id='.$new->id); ?>">Edit</a> - <a href="<?php echo site_url('moderation/publish/'.$new->id); ?>">Publish</a> - <a href="<?php echo site_url('moderation/reject/'.$new->id); ?>">Reject</a>
		</li>
		<?php 
	} ?>
	</ul>
	<?php 
} else { ?>
	<p>No locations requiring approval</p>
	<?php 
} ?>

<h2>Edited locations</h2>
<?php if ($revisions->num_rows() > 0) { ?>
	<ul>
	<?php foreach($revisions->result() as $revision) { ?>
		<li>
			<?php echo $revision->name; ?><br>
			<?php echo $revision->description; ?><br>
			<?php echo $revision->address; ?><br>
			<?php echo $revision->category; ?><br>
			<a href="<?php echo base_url('/edit.html?id='.$revision->location_id); ?>">Edit</a> - <a href="<?php echo site_url('moderation/approve/'.$revision->id); ?>">Approve</a> - <a href="<?php echo site_url('moderation/reject/'.$revision->id); ?>">Reject</a>
		</li>
		<?php 
	} ?>
	</ul>
	<?php 
} else { ?>
	<p>No locations requiring approval</p>
	<?php 
} ?>