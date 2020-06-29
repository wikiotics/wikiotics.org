function gettext(s) { return s; }
var ductus_mediacache_prefix = 'https://wikiotics.github.io/';
var ductus_mime_to_ext = {"audio/webm": "webma", "audio/mp4": "m4a", "image/jpeg": "jpg", "audio/ogg": "oga", "image/png": "jpg"};
var resource_json = {'resource': data};
var available_audio_formats = {"audio/mp4": ["audio/ogg"], "audio/ogg": ["audio/mp4"]}; /* from ductus.modules.audio.views */
// lesson specific
if (data.type == 'lesson') {
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
}
