function resolve_mediacache_url(resource, mime_type, additional_args, blob_urn) {
    var split_urn = (blob_urn || resource.blob_href).split(':');
    var hash_type = split_urn[1];
    var digest = split_urn[2];
    var dotstr = additional_args ? '.' + additional_args : '';
    var mime_ext = ductus_mime_to_ext[mime_type || resource.mime_type];
    return ductus_mediacache_prefix + hash_type + '/' + digest.substr(0, 2) + '/' + digest + dotstr + '.' + mime_ext + '?' + resource.href;
}
