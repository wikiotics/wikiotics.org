function gettext(s) { return s; }
var ductus_mediacache_prefix = 'https://old.wikiotics.org/mediacache/';
var ductus_mime_to_ext = {"audio/webm": "webma", "audio/mp4": "m4a", "image/jpeg": "jpg", "audio/ogg": "oga"};
var resource_json = {'resource': data};
var available_audio_formats = {"audio/mp4": ["audio/ogg"], "audio/ogg": ["audio/mp4"]}; /* from ductus.modules.audio.views */
// lesson specific
if (data.fqn == '{http://wikiotics.org/ns/2011/flashcards}flashcard_deck') {
    if (!data.interactions) {
        $(initialize_grid);
    } else {
        var interaction = data.interactions.array[0].resource;
        if (interaction.fqn == '{http://wikiotics.org/ns/2011/flashcards}choice_interaction') {
            var prompt_columns = interaction.prompt.split(',').map(Number);
            var answer_column = Number(interaction.answer);
            $(initialize_choice);
        } else if (interaction.fqn == '{http://wikiotics.org/ns/2011/flashcards}story_book_interaction') {
            $(initialize_storybook);
        } else if (interaction.fqn == '{http://wikiotics.org/ns/2011/flashcards}audio_lesson_interaction') {
            $(initialize_audio_lesson);
        }
    }
}
