function resolve_urn(urn) {
    return '/' + urn.split(':').join('/');
}
function fqpagename_from_url(url) {
    // the reverse of resolve_urn()
    // does "/en/somepage/subpage" => "en:somepage/subpage"
    return url.substr(1).replace('/', ':');
}

function resolve_mediacache_url(resource, mime_type, additional_args, blob_urn) {
    var split_urn = (blob_urn || resource.resource.blob.href).split(':');
    var hash_type = split_urn[1];
    var digest = split_urn[2];
    var dotstr = additional_args ? '.' + additional_args : '';
    var mime_ext = ductus_mime_to_ext[mime_type || resource.resource.blob.mime_type];
    return ductus_mediacache_prefix + hash_type + '/' + digest + dotstr + '.' + mime_ext + '?' + resource.href;
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = $.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$(function () {

    // CSRF handling for AJAX requests
    // (see https://docs.djangoproject.com/en/dev/ref/contrib/csrf/#ajax)
    $(document).ajaxSend(function(event, xhr, settings) {
        function sameOrigin(url) {
            // url could be relative or scheme relative or absolute
            var host = document.location.host; // host + port
            var protocol = document.location.protocol;
            var sr_origin = '//' + host;
            var origin = protocol + sr_origin;
            // Allow absolute or scheme relative URLs to same origin
            return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
                (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
                // or any other URL that isn't scheme relative or absolute i.e relative.
                !(/^(\/\/|http:|https:).*/.test(url));
        }
        function safeMethod(method) {
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        }
        if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    });

    // AJAX status indicator
    $("body").append($('<div id="ductus_ajax_status">Working...</div>').hide().ajaxStart(function () {
        $(this).show();
    }).ajaxStop(function () {
        $(this).hide();
    }));

});

// from http://stackoverflow.com/questions/901115/get-query-string-values-in-javascript
var urlParams = {};
(function () {
    var e,
        param,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&=]+)=?([^&]*)/g,
        d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
        q = window.location.search.substring(1);

    while (e = r.exec(q)) {
        param = d(e[1]);
        type = typeof(urlParams[param]);
        // each param is either a string or an array of strings
        if (type === 'undefined') {
            urlParams[param] = d(e[2]);
        } else {
            if (type === 'string') {
                urlParams[param] = [urlParams[param]];
            }
            urlParams[param].push(d(e[2]));
        }
    }
})();

