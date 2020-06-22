function shuffle (a) {
    for (var j, x, i = a.length; i; j = parseInt(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
}

// like python's range() function
function array_range (a, b, c) {
    var start, finish, step = c || 1;
    if (b === undefined) {
        start = 0;
        finish = a;
    } else {
        start = a;
        finish = b;
    }

    var rv = [];
    for (var i = start; i < finish; i += step) {
        rv.push(i);
    }
    return rv;
}

function min_gt(n, array) {
    // return the minimum value in array > n and its index
    // fixme: use bisect algorithm
    var rv;
    for (var i = 0; i < array.length; ++i) {
        if (array[i] > n && (rv === undefined || array[i] < rv[1]))
            rv = [i, array[i]];
    }
    return rv;
}

function max_lte(n, array) {
    // return the max value in array <= n and its index
    // fixme: use bisect algorithm
    var rv;
    for (var i = 0; i < array.length; ++i) {
        if (array[i] <= n && (rv === undefined || array[i] > rv[1]))
            rv = [i, array[i]];
    }
    return rv;
}

var resource_displayer = {
    '{http://wikiotics.org/ns/2009/picture}picture': function (resource) {
        var rotstr = resource.resource.rotation ? "_" + resource.resource.rotation : "";
        var src = resolve_mediacache_url(resource, 'image/jpeg', "250_250" + rotstr);
        return $('<div class="picture"></div>').append($('<img alt=""/>').attr('src', src));
    },
    '{http://wikiotics.org/ns/2011/phrase}phrase': function (resource) {
        return $('<span class="phrase"></span>').text(resource.resource.phrase.text);
    },
    '{http://wikiotics.org/ns/2010/audio}audio': function (resource) {
        var rv = $('<span class="audio play-button"></span>').text(gettext("play audio"));
        rv.data('resource', resource);
        return rv;
    }
};

function display_resource (resource) {
    return resource.resource ? resource_displayer[resource.resource.fqn](resource) : $('<div></div>');
}

function initialize_choice() {

    $('.the-content').html('<div><div id="choice_frame_container"></div><p class="choice_frame_count">Frame <span id="frame_number">1</span><span id="total_frames_text"> of <span id="number_of_frames">0</span></span> (<span id="choice_correct_count">0</span> correct, <span id="choice_incorrect_count">0</span> incorrect).</p></div>');

    var i;

    // dividers exist immediately before each index provided here
    var dividers = resource_json.resource.dividers || '';
    // the backend sends dividers as a comma-separated string, turn it into an array first
    dividers = dividers ? dividers.split(',') : [];
    dividers.unshift(0);
    dividers.push(resource_json.resource.cards.length);
    for (i = dividers.length - 1; i; i--) {
        dividers[i] = parseInt(dividers[i]);
    }
    // ignore cards that have no answer, and update divider indices accordingly
    // this MUST run first, since everything else relies on coherent cards and dividers
    var original_length = resource_json.resource.cards.length;
    for (i = original_length; --i > -1; ) {
        var card = resource_json.resource.cards[i];
        if (card.resource.sides[answer_column].resource == null) {
            resource_json.resource.cards.splice(i, 1);
            // shift dividers accordingly
            // TODO: tell the user to remove empty rows from the lesson in the editor
            // this is a waste of time, but prevents buggy situations where the choice lesson
            // won't be usable.
            for (var d = min_gt(i, dividers)[0], end = dividers.length; d < end; d++) {
                --dividers[d];
            }
        }
    }

    // this is meant to be a generic interface, with `length` and `get_next` properties.
    // If there is no known length, it should return -1.  `get_next()` should be a function
    // that returns -1 after the final frame.
    var lesson_iterator = (function () {
        var index = 0;
        var length = resource_json.resource.cards.length;

        // each frame will be shown once, and we will display each group
        // in order, but the frames within each group will be shuffled.
        var a = [];
        for (var j = 0; j < dividers.length - 1; ++j) {
            var b = array_range(dividers[j], dividers[j + 1]);
            shuffle(b);
            // extend array "a" with the contents of "b"
            a.push.apply(a, b);
        }

        return {
            length: length,
            get_next: function () {
                var ind = index++;
                return (ind < a.length) ? a[ind] : -1;
            }
        };
    })();

    function get_wrong_indices (correct_index) {
        var rv = array_range(max_lte(correct_index, dividers)[1], min_gt(correct_index, dividers)[1]);
        rv.splice($.inArray(correct_index, rv), 1);
        shuffle(rv);
        return rv;
    }

    var prepared_frame;

    function prepare_frame () {
        var index = lesson_iterator.get_next();
        if (index == -1) {
            prepared_frame = null;
            return;
        }

        var display_indices = get_wrong_indices(index).slice(0, 3);
        display_indices.push(index);
        shuffle(display_indices);

        prepared_frame = $('<div class="ductus_choice"></div>');
        var cards_array = resource_json.resource.cards;
        // prompt
        var prompt_sides_array = cards_array[index].resource.sides;
        for (var k = 0; k < prompt_columns.length; ++k) {
            var header_number = Math.min(k + 2, 6);
            var header_element = $('<h' + header_number +' class="prompt" lang=""></h' + header_number + '>').appendTo(prepared_frame);
            header_element.append(display_resource(prompt_sides_array[prompt_columns[k]]));
        }
        // answer choices
        var table = $('<table></table>').appendTo(prepared_frame);
        for (var i = 0; i < 2; ++i) {
            var tr = $('<tr></tr>').appendTo(table);
            for (var j = 0; j < 2; ++j) {
                var td = $('<td></td>').appendTo(tr);
                var display_index = display_indices[i * 2 + j];
                if (display_index !== undefined) {
                    var res = cards_array[display_index].resource.sides[answer_column];
                    var div = $('<div></div>').append(display_resource(res));
                    td.addClass("choice_item clickable").append(div);
                    td.addClass(display_index == index ? "correct": "incorrect");
                }
            }
        }
        prepared_frame.find('span.audio').button({icons: { primary: 'ui-icon-play' }}).click(function () {
            jplayer_play($(this).data('resource'));
        });
    }

    var choice_actions_enabled = false;

    var pc_connect_click_actions = function () {
        choice_actions_enabled = true;
        $(".choice_item").click(function () {
            if (!choice_actions_enabled)
                return;

            $(this).removeClass('clickable');

            var already_called = false;
            if ($(this).hasClass("correct")) {
                choice_actions_enabled = false;
                var dc = $('.ductus_choice');
                dc.height(dc.height()); // prevent the entire page from resizing
                $('.ductus_choice td.incorrect div').hide(450, "linear");
                setTimeout(function () {
                    if (!already_called) {
                        choice_correct_callback();
                    }
                    already_called = true;
                }, 500);
            } else {
                $(this).fadeTo(200, .25, "linear", function () {
                    if (!already_called) {
                        choice_incorrect_callback();
                    }
                    already_called = true;
                });
            }
        });
    };

    var frame = -1;
    var correct = 0;
    var incorrect = 0;
    var current_frame_incorrect_guess = false;

    function advance_frame () {
        if (prepared_frame) {
            frame = frame + 1;
            $("#choice_frame_container").empty().append(prepared_frame);
            pc_connect_click_actions();
            $("#frame_number").html(frame + 1 + '');
            current_frame_incorrect_guess = false;
            prepare_frame();
        } else {
            // we've reached the end of the lesson, give the user something to do next
            show_lesson_end();
        }
    }

    var choice_correct_callback = function () {
        if (!current_frame_incorrect_guess) {
            correct = correct + 1;
            $("#choice_correct_count").html(correct + '');
        }
        setTimeout(advance_frame, 2500);
    };
    var choice_incorrect_callback = function () {
        if (!current_frame_incorrect_guess) {
            incorrect = incorrect + 1;
            $("#choice_incorrect_count").html(incorrect + '');
            current_frame_incorrect_guess = true;
        }
    };

    var show_lesson_end = function () {
        // point the user to the portal of the target language of this lesson
        // in the future, this should also suggest a logical next lesson to take
        var url, epilogue;
        if (window.target_language.code) {
            url = '/special/search?tag=target-language:' + window.target_language.code;
            epilogue = gettext('Back to the main page for ') + window.target_language.name;
        } else {
            url = '/';
            epilogue = gettext('Back to the main page');
        }
        var dc = $('.ductus_choice');
        var container = $("#choice_frame_container");
        container.height(dc.height()); // prevent the entire page from resizing
        dc.hide(450, "linear");
        setTimeout(function () {
            var text = gettext('You completed the lesson. You can now continue by clicking one of these links:');
            var dce = $('<div class="ductus_choice_epilogue"></div>');
            $('<p></p>').text(text).appendTo(dce);
            $('<a href=""></a>').attr("href", url).text(epilogue).appendTo(dce);
            $('<a href="javascript:history.back();">' + gettext('Back to previous page') + '</a>').appendTo(dce);
            dce.appendTo(container);
        }, 500);
    };

    if (lesson_iterator.length != -1) {
        $("#number_of_frames").text('' + lesson_iterator.length);
    }
    $("#total_frames_text").toggle(lesson_iterator.length != -1);

    prepare_frame();
    advance_frame();

}
