<?php $images_ids = get_post_meta($post->ID, $metabox['args']['post_meta_key'], true); ?>
<label for="<?php echo $metabox['args']['post_meta_key']; ?>"></label>
<input id="<?php echo $metabox['args']['post_meta_key']; ?>" type="hidden" name="<?php echo $metabox['args']['post_meta_key']; ?>" value="<?php echo $images_ids; ?>" />
<a href="#" class="add_button">Adicionar imagens</a>
<ul class="image_gallery attachments ui-sortable">
<?php
if ($images_ids != '') {
	$upload_dir_info = wp_upload_dir();

	$images_ids = explode(',', $images_ids);
	foreach ($images_ids as $id) {
		$image = wp_get_attachment_metadata($id);

		if (array_key_exists('sizes', $image) && array_key_exists('thumbnail', $image['sizes'])) {
			$mime_type = ($image['sizes']['thumbnail']['mime-type']);
			$image_url = $upload_dir_info['baseurl'].'/'.substr($image['file'], 0, strrpos($image['file'], '/') + 1).$image['sizes']['thumbnail']['file'];
		}
		else {
			$mime_type = ($image['mime-type']);
			$image_url = $upload_dir_info['baseurl'].'/'.$image['file'];
		}

		$mime_type = explode('/', $mime_type);

		
?>
	<li class="attachment save-ready">
		<div class="attachment-preview type-<?php echo $mime_type[0]; ?> subtype-<?php echo $mime_type[1]; ?> portrait">
			<div class="thumbnail">
				<div class="centered">
					<img src="<?php echo $image_url; ?>" alt="<?php echo $image['image_meta']['title']; ?>" data-attachment-id="<?php echo $id; ?>" />
				</div>
			</div>
			<a class="check" href="#" title="Excluir"><div class="media-modal-icon"></div></a>
		</div>
	</li>
<?php	
	}
}
?>
</ul>
<div class="clearfix"></div>