function gettext(s) { return s; }
var ductus_mediacache_prefix = 'https://cloudflare-ipfs.com/ipfs/QmPTzBud9tGnVXRnfiS7DPUtsMs4SjhkvcwWo7JGbjwk4i/';
var ductus_mime_to_ext = {"audio/webm": "webma", "audio/mp4": "m4a", "image/jpeg": "jpg", "audio/ogg": "oga", "image/png": "jpg"};
var resource_json = {'resource': data};
var available_audio_formats = {"audio/mp4": ["audio/ogg"], "audio/ogg": ["audio/mp4"]}; /* from ductus.modules.audio.views */
var license_name_map = {
    'https://creativecommons.org/licenses/publicdomain/': gettext('Public Domain'),
    'https://creativecommons.org/licenses/by-sa/1.0/': gettext('Creative Commons Attribution-ShareAlike 1.0'),
    'https://creativecommons.org/licenses/by-sa/2.0/': gettext('Creative Commons Attribution-ShareAlike 2.0'),
    'https://creativecommons.org/licenses/by-sa/2.5/': gettext('Creative Commons Attribution-ShareAlike 2.5'),
    'https://creativecommons.org/licenses/by-sa/3.0/': gettext('Creative Commons Attribution-ShareAlike 3.0'),
    'https://creativecommons.org/licenses/by/1.0/': gettext('Creative Commons Attribution 1.0'),
    'https://creativecommons.org/licenses/by/2.0/': gettext('Creative Commons Attribution 2.0'),
    'https://creativecommons.org/licenses/by/2.5/': gettext('Creative Commons Attribution 2.5'),
    'https://creativecommons.org/licenses/by/3.0/': gettext('Creative Commons Attribution 3.0')
};
// lesson specific
if (data.type == 'lesson') {
    $(function () {
	$('.the-content').html(''); // Remove "Javascript required" message
    });
    if (!data.interactions || data.grid) {
        $(initialize_grid);
    } else {
        var interaction = data.interactions[0];
        if (interaction.type == 'choice') {
            var prompt_columns = interaction.prompt;
            var answer_column = interaction.answer;
            $(initialize_choice);
        } else if (interaction.type == 'storybook') {
            $(initialize_storybook);
        } else if (interaction.type == 'podcast') {
            $(initialize_audio_lesson);
        }
    }
    $(function () {
        var license_block = $('<div></div>').hide(), current_block;
        license_block.append('<div class="ba bg-white b--black-30 mv4 pa4 cf"><p>Lesson contributor(s): <span class="contributors"></span></p><p>This lesson is available under the <a href="https://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-ShareAlike 3.0</a> license.</p></div>');
        if (resource_json.resource.contributors) {
            license_block.find('.contributors').text(resource_json.resource.contributors.join(', '));
        }
        resource_json.resource.cards.forEach(function (card) {
            card.sides.forEach(function (side) {
                if (side && side.credit) {
                    current_block = $('<div class="ba bg-white b--black-30 mv4 pa3 cf"><div class="resource pa3 fl-ns w-50-ns"></div> <div class="pa3 fl-ns w-50-ns">Author: <span class="author"></span></div> <div class="pa3 fl-ns w-50-ns">License: <span class="license"></span></div></div>');
                    if (side.credit.author_url) {
                        $('<a></a>').attr('href', side.credit.author_url).text(side.credit.author).appendTo(current_block.find('.author'));
                    } else {
                        current_block.find('.author').text(side.credit.author);
                    }
                    if (side.credit.original_url) {
                        $('<a></a>').attr('href', side.credit.original_url).append(display_resource(side).attr('title', side.credit.title)).appendTo(current_block.find('.resource'));
                    } else {
                        current_block.find('.resource').append(display_resource(side).attr('title', side.credit.title));
                    }
                    $('<a></a>').attr('href', side.credit.license).text(license_name_map[side.credit.license]).appendTo(current_block.find('.license'));
                    current_block.appendTo(license_block);
                }
            });
        });
        var license_toggle = $('<a href="#license_info" id="license_info" class="f6 link dim ph3 pv2 mb2 dib ba black-50">Show license info ...</a>').click(function () {
            if (license_block.is(':hidden')) {
                $(this).text('Hide license info ...')
                license_block.show();
                $('html, body').animate({scrollTop: $(this).offset().top}, 600);
            } else {
                license_block.hide();
                $(this).text('Show license info ...')
            }
            return false;
        });
        $('.main-content').append(license_toggle).append(license_block);
    });
}
