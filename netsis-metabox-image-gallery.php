<?php
/*
Plugin Name: NetSis - Metabox Image Gallery
Plugin URI: 
Description: Permite inclusão de galeria de imagens para tipos de posts customizados
Version: 0.4.0
Author: NetSis - Sistemas Web
Author URI: http://www.netsis.com.br
License: Copyright
*/

$exception = null;

if(!class_exists('NetSisMetaboxImageGallery'))
{
	class NetSisMetaboxImageGallery
	{
		public static function Add($id, $title, $post_meta_key, $post_type = 'post', $context = 'normal', $priority = 'default', $callback_args = array())
		{
			$callback_args['post_meta_key'] = $post_meta_key;

			add_meta_box($id, $title, 'NetSisMetaboxImageGallery::AddMetaboxFiles', $post_type, $context, $priority, $callback_args);
		}

		public static function AddMetaboxFiles($post, $metabox)
		{
			wp_enqueue_script('jquery-ui-sortable');
			wp_enqueue_style('metabox_image_gallery', plugins_url('/templates/metabox_image_gallery.css', __FILE__));
			wp_enqueue_script('metabox_image_gallery', plugins_url('/templates/metabox_image_gallery.js', __FILE__), array('jquery'));

			include_once(sprintf("%s/templates/metabox_image_gallery.php", dirname(__FILE__)));
			include_once(sprintf("%s/templates/metabox_image_gallery_add.js.php", dirname(__FILE__)));
		}
    }
}
?>