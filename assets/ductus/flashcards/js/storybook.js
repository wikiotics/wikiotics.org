function initialize_storybook() {

    $('.the-content').html('<div><div id="storybook_frame_container"></div><div id="storybook_pager"></div><p class="storybook_frame_count">Page <span id="frame_number">1</span> <span id="total_frames_text"> of <span id="number_of_frames">0</span></span></p></div>');

    var next, previous;

    function prepare_page(index) {
        /*
         * prepare page number index (0-based)
         * or return null if it's beyond the deck
         */
        if (index <= -1 || index >= resource_json.resource.cards.array.length) {
            return null;
        }

        var prepared_page = $('<div class="ductus_storybook"></div>');
        var cards_array = resource_json.resource.cards.array;
        prepared_page.append($('<span></span>').append(display_resource(cards_array[index].resource.sides.array[1])));
        prepared_page.append(display_resource(cards_array[index].resource.sides.array[2]));
        prepared_page.append(display_resource(cards_array[index].resource.sides.array[0]));
        prepared_page.find('span.audio').button({icons: { primary: 'ui-icon-play' }}).click(function () {
            jplayer_play($(this).data('resource'));
        });
        return prepared_page;
    }

    var page = -1;  // the page currently shown

    function next_page() {
        if (next) {
            page = page + 1;
            var container = $("#storybook_frame_container");
            previous = container.children().detach();
            container.append(next);
            $("#frame_number").html(page + 1 + '');
            next = prepare_page(page + 1);
            $('#prev').button('enable');
        } else {
            // we've reached the end of the lesson, give the user something to do next
            $('#storybook_pager').hide();
            $('.storybook_frame_count').hide();
            show_lesson_end();
        }
        if (page == 0) {
            $('#prev').button('disable');
        }
    }

    function previous_page() {
        if (previous) {
            page = page - 1;
            var container = $("#storybook_frame_container");
            next = container.children().detach();
            container.append(previous);
            $("#frame_number").html(page + 1 + '');
            previous = prepare_page(page - 1);
        }
        if (page == 0) {
            $('#prev').button('disable');
        }
    }

    var show_lesson_end = function() {
        // point the user to the portal of the target language of this lesson
        // in the future, this should also suggest a logical next lesson to take
        var url, epilogue;
        if (window.target_language.code != null) {
            url = '/en/' + window.target_language.name + '_lessons';
            epilogue = gettext('Back to the main page for ') + window.target_language.name;
        } else {
            url = '/';
            epilogue = gettext('Back to the main page');
        }
        var dc = $('.ductus_storybook');
        var container = $("#storybook_frame_container");
        container.height(dc.height()); // prevent the entire page from resizing
        dc.hide(450, "linear");
        setTimeout(function () {
            var text = gettext('You completed the lesson. You can now continue by clicking one of these links:');
            var dce = $('<div class="ductus_storybook_epilogue"></div>');
            $('<p></p>').text(text).appendTo(dce);
            $('<a href=""></a>').attr("href", url).text(epilogue).appendTo(dce);
            $('<a href="javascript:history.back();"></a>').text(gettext('Back to previous page')).appendTo(dce);
            dce.appendTo(container);
        }, 500);
    };

    var pager = $('#storybook_pager');
    pager.append($('<div id="prev"></div>').text('<').button().click(previous_page));
    pager.append($('<div id="next"></div>').text('>').button().click(next_page));
    $("#number_of_frames").text('' + resource_json.resource.cards.array.length);

    next = prepare_page(0);
    next_page();

}
