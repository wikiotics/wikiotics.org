function initialize_audio_lesson() {
    var main_div = $('.the-content');
    // https://github.com/wikiotics/ductus/blob/master/ductus/modules/flashcards/templates/flashcards/audio_lesson.html
    var interaction = resource_json.resource.interactions[0];
    var col = interaction.audio;
    // Logic following ductus/modules/audio/views.py and ductus/modules/flashcards/views.py
    var hrefs = resource_json.resource.cards.map(function (card) { return card.sides[col].href }).filter(function (href) { return !!href; });
    var first_audio_blob_href = resource_json.resource.cards.map(function (card) { return card.sides[col].blob_href }).filter(function (href) { return !!href; })[0];
    if (first_audio_blob_href) {
        var additional_args = sha1(hrefs.join(' '));
        var podcast_links = $('<div class="ductus_podcast_links"><a class="download" title="Download the podcast in MP4/AAC format, compatible with most software, portable music players and mobile phones.">Download the podcast</a><a class="listen" title="Listen to the podcast online. If you use an old browser, it will offer to download the file in webm format instead.">Listen online</a></div>');
        podcast_links.find('.download').attr('href', resolve_mediacache_url({'href': ''}, 'audio/mp4', additional_args, first_audio_blob_href));
        podcast_links.find('.listen').attr('href', resolve_mediacache_url({'href': ''}, 'audio/webm', additional_args, first_audio_blob_href));
        main_div.append(podcast_links);
    }
    main_div.append('<h3>Full transcript of the lesson:</h3>');
    initialize_grid();
}

function initialize_grid() {
    var main_div = $('.the-content');

    // https://github.com/wikiotics/ductus/blob/master/ductus/modules/flashcards/templates/flashcards/flashcard_deck_as_html.html
    var table = $('<table class="ductus_flashcard_deck_as_html"></table>').appendTo(main_div);
    var tr = $('<tr></tr>').appendTo(table);
    tr.append('<th></th>'); // empty column for row number
    resource_json.resource.headings.forEach(function (heading) {
	$('<th></th>').text(heading).appendTo(tr);
    });
    var arr = resource_json.resource.cards;
    for (var i = 0; i < arr.length; ++i) {
	var card = arr[i];
	var tr = $('<tr></tr>').appendTo(table);
	$('<td class="row_header"></td>').text(i + 1).appendTo(tr);
	card.sides.forEach(function (side) {
	    var td = $('<td></td>').appendTo(tr);
	    if (!side || side.type == 'empty') {
		return;
	    }
	    if (side.type == 'phrase') {
		$('<div class="ductus_phrase"></div>').text(side.text).appendTo(td);
	    } else if (side.type == 'audio') {
		// https://github.com/wikiotics/ductus/blob/master/ductus/modules/audio/templates/audio/as_html.html
		var audio = $('<div class="ductus_audio ui-button ui-state-default ui-button-text-icon-primary ui-corner-all"><span class="ui-button-icon-primary ui-icon ui-icon-play"></span><span class="ui-button-text">play</span></div>').appendTo(td);
		audio.data('mime', side.mime_type);
		audio.data('res', side.href);
		audio.data('blob', side.blob_href);
	    } else if (side.type == 'picture') {
		var rotstr = side.rotation ? "_" + side.rotation : "";
		var src = resolve_mediacache_url(side, 'image/jpeg', "100_100" + rotstr);
		return $('<div class="picture"></div>').append($('<img alt=""/>').attr('src', src)).appendTo(td);
	    } else {
		td.text(side.type);
	    }
	});
    }

    // https://github.com/wikiotics/ductus/blob/master/ductus/wiki/templates/wiki/tags_display.html
    var tags_div = $('<div class="ductus_tags_display"></div>').appendTo(main_div);
    if (resource_json.resource.tags) {
	tags_div.text('Tags: ');
	var tags = $('<ul></ul>').appendTo(tags_div);
	resource_json.resource.tags.forEach(function (tag) {
	    $('<li></li>').text(tag).appendTo(tags)
	});
    }

    // https://github.com/wikiotics/ductus/blob/master/ductus/modules/flashcards/templates/flashcards/audio_lesson.html
    function play(elt) {
        // build a pseudo resource to send to jplayer_play()
        var res = {};
        res.href = elt.data('res');
        res.mime_type = elt.data('mime');
        res.blob_href = elt.data('blob');
        jplayer_play(res);
    }
    $('.ductus_audio').click( function() {
        play($(this));
    });
}
