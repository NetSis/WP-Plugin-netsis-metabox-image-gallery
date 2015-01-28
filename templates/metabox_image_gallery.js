function NetSisMetaboxImageGallery() {}

NetSisMetaboxImageGallery.Run = function(metabox_id, post_meta_key) {
  jQuery(function ($) {
    NetSisMetaboxImageGallery.BindEvents(metabox_id, post_meta_key);

    $('#' + metabox_id + ' ul.image_gallery').sortable({
      items: '> li',
      opacity: 0.5,
      update: function() {
        NetSisMetaboxImageGallery.UpdateImageGalleryAttachments(metabox_id, post_meta_key);
      }
    });
   
    var custom_uploader;

    $('#' + metabox_id + ' .add_button').click(function(e) {
        e.preventDefault();

        //If the uploader object has already been created, reopen the dialog
        if (custom_uploader) {
            custom_uploader.open();
        }
        else {
          //Extend the wp.media object
          custom_uploader = wp.media.frames.file_frame = wp.media({
              title: 'Imagens para Galeria',
              button: {
                text: 'Adicionar na Galeria'
              },
              library: {
                type: 'image'
              },
              multiple: true
          });
   
          //When a file is selected, grab the URL and set it as the text field's value
          custom_uploader.on('select', function() {
              var selection = custom_uploader.state().get('selection');
              selection.map(function(attachment) {
                attachment = attachment.toJSON();

                var image_exists = false;
                $('#' + metabox_id + ' li').each(function(i) {
                  var url = '';
                  if ((attachment.sizes !== undefined) && (attachment.sizes.thumbnail !== undefined))
                    url = attachment.sizes.thumbnail.url;
                  else
                    url = attachment.url;

                  if ($(this).find('img').attr('src') == url)
                    image_exists = true;
                });

                if (!image_exists) {
                  var orientation = '';
                  if ((attachment.sizes !== undefined) && (attachment.sizes.thumbnail !== undefined))
                    orientation = attachment.sizes.thumbnail.orientation;
                  else
                    orientation = attachment.orientation;

                  var url = '';
                  if ((attachment.sizes !== undefined) && (attachment.sizes.thumbnail !== undefined))
                    url = attachment.sizes.thumbnail.url;
                  else
                    url = attachment.url;

                  var html = '<li class="attachment save-ready">';
                  html += '<div class="attachment-preview type-' + attachment.type + ' subtype-' + attachment.subtype + ' ' + orientation + '">';
                  html += '<div class="thumbnail">';
                  html += '<div class="centered">';
                  html += '<img src="' + url + '" alt="' + attachment.title + '" data-attachment-id="' + attachment.id + '" />';
                  html += '</div>';
                  html += '</div>';
                  html += '<a class="check" href="#" title="Excluir"><div class="media-modal-icon"></div></a>';
                  html += '</div>';
                  html += '</li>';

                  $('#' + metabox_id + ' ul.image_gallery').append(html);

                  NetSisMetaboxImageGallery.BindEvents(metabox_id, post_meta_key);

                  $('#' + post_meta_key).val($('#' + post_meta_key).val() + ',' + attachment.id);
                }
              });

            NetSisMetaboxImageGallery.UpdateImageGalleryAttachments(metabox_id, post_meta_key);
          });
   
          //Open the uploader dialog
          custom_uploader.open();
        }
    });
  });
}

NetSisMetaboxImageGallery.BindEvents = function(metabox_id, post_meta_key) {
  jQuery(function ($) {
    $('#' + metabox_id + ' li').unbind();
    $('#' + metabox_id + ' li')
      .mouseover(function() {
        if (!$(this).hasClass('details'))
          $(this).addClass('details');

        if (!$(this).hasClass('selected'))
          $(this).addClass('selected');
    })
      .mouseout(function() {
        if ($(this).hasClass('details'))
          $(this).removeClass('details');

        if ($(this).hasClass('selected'))
          $(this).removeClass('selected');
    });

    $('#' + metabox_id + ' li a.check').unbind();
    $('#' + metabox_id + ' li a.check').click(function(e) {
      e.preventDefault();
      $(this).parent().parent().remove();
      NetSisMetaboxImageGallery.UpdateImageGalleryAttachments(metabox_id, post_meta_key);
    });
  });
}

NetSisMetaboxImageGallery.UpdateImageGalleryAttachments = function(metabox_id, post_meta_key) {
  jQuery(function ($) {
    var ids = '';
    $('#' + metabox_id + ' li').each(function(i) {
      ids += ',' + $(this).find('img').data('attachment-id');
    });

    if (ids.length > 0)
      $('#' + post_meta_key).val(ids.substring(1));
    else
      $('#' + post_meta_key).val('');
  });
}