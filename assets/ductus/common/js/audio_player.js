var filetype_map = {
    "audio/mp4": "m4a",
    "audio/ogg": "oga",
    "audio/webm": "webma",
    "audio/x-wav": "wav"
};

var jplayer_play = (function ($) {

    var _jplayer_instance = {};

    function get_jplayer_instance(mime_type) {
        if (!_jplayer_instance[mime_type]) {
            // create a new instance to handle this mime type

            // first, determine the available file formats (after conversion on
            // the server) for the given mime type
            var filetypes = [filetype_map[mime_type]];
            var available_conversions = available_audio_formats[mime_type];
            if (available_conversions) {
                for (var i = 0; i < available_conversions.length; ++i) {
                    filetypes.push(filetype_map[available_conversions[i]]);
                }
            }

            // now create the jplayer instance
            var jplayer = $('<div></div>').appendTo('body');
            jplayer.jPlayer({
                ready: _jplayer_ready,
                supplied: filetypes.join(', '),
                swfPath: "/ductus/common/js/jQuery.jPlayer.2.1.0"
            });
            _jplayer_instance[mime_type] = jplayer;
        }

        return _jplayer_instance[mime_type];
    }

    function _jplayer_ready() {
        var media_map = $(this).data('onready_mediamap');
        if (media_map) {
            $(this).jPlayer("setMedia", media_map).jPlayer("play");
        }
        $(this).data('ready', 'yes');
    }

    function jplayer_play(resource_json) {
        if (resource_json.href.slice(0, 5) == 'data:') {
            // it's a local file from recorder stored in data:url
            var media_map = {'wav': resource_json.href};
            var mime_type = 'audio/x-wav';
        } else {
            // all other cases
            var mime_type = resource_json.resource.blob.mime_type;
            var available_conversions = available_audio_formats[mime_type];
            var media_map = {};
            media_map[filetype_map[mime_type]] = resolve_mediacache_url(resource_json);
            if (available_conversions) {
                for (var i = 0; i < available_conversions.length; ++i) {
                    var filetype = filetype_map[available_conversions[i]];
                    media_map[filetype] = resolve_mediacache_url(resource_json, available_conversions[i]);
                }
            }
        }

        var jplayer = get_jplayer_instance(mime_type);
        if (jplayer.data('ready')) {
            jplayer.jPlayer("setMedia", media_map).jPlayer("play");
        } else {
            jplayer.data('onready_mediamap', media_map);
        }
    }

    return jplayer_play;

})(jQuery);

