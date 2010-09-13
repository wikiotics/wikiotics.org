+++
title = "FlashCardDevelopmentPlan"
+++

### Current State

Currently our data model is focused very much on the picture choice
lessons we offer. Going forward we want to move to a model based on
smaller elements like flash cards that can be easily created,
manipulated, and re-used between multiple lesson types. The flash cards
we're envisioning are closer to a Python list than the traditional two
field ones. Basically, any collection of elements should be
representable as a flash card.

For more information on "what is a flash card" see the IRC log from
[Aug 31](http://ductus.us/irc-logs/%23wikiotics.20100831.slog) as well
as the [Anki](http://ichi2.net/anki/) flash card software, and this
[mailing list
message](https://groups.google.com/group/wikiotics/browse_thread/thread/e536a099d786f5ec)
where Ian talks about re-using Anki's data structure, and this [feature
request](http://code.ductus.us/ticket/53) that tracks our current status
in implementing compatibility.

### Hierarchy of elements

Each of our lessons is a collection of nested element containers.
Picture choice lessons break down into groups of four pictures and four
sentences. We call each group a picture choice node. Each node breaks
down into four individual sentence|picture pairs. Over the next term we
hope to add one or more audio elements to those pairs. These single
sentence +picture(+audio+audio) collections are natural flash cards.
They are the smallest structured elements in our lessons and the easiest
to study or re-use.

There are a number of opportunities for improving our capabilities and
ease of use if we focus on these simple elements.

### Automatic study materials

Running through a lesson repeatedly is not always the best way to study
the material it contains. If we look at each sentence|picture pair
inside a picture choice lesson as a flash card, we can let users
automatically export/save the material from their lessons as flash
cards, which can then be used in an external flash card program like
anki or fed to various "print" css/svg templates and memory game testing
tools.

### Lesson creation

Just as we can give users the contents of picture choice lessons as
flash card collections, so too can users take flash card collection and
assemble them into lessons. Our lesson authoring interface needs an
overhaul. Currently it asks for sentences and picture URLs, which you
need to have written down somewhere or open in another window. This is
cumbersome and means that a lot of time goes into finding/matching
sentence|picture pairs rather than focusing on the arrangement and
progression of the pairs, which is the real structure of the lesson.

What we should have is a separate flash card authoring interface,
perhaps integrated into the picture search interface and/or the edit
interface for existing flash cards. Once someone has a collection of
cards, building a picture choice lesson should be as easy as arranging a
game of solitaire.

### Personal Dictionary/repository

Once we can represent flash cards outside of lessons we can also collect
all of them into a meta-collection to represent that user's personal
dictionary. This would do a number of things. It would be a great way to
judge personal progress and proficiency.

It would also be a useful window for sorting through existing materials.
For instance, a user taking a new lesson who runs into a term that she
doesn't know but that seems familiar could search her dictionary for it
and re-take any previous lessons that use the term. Similarly,
collecting all studied flash cards in a single place makes it very easy
to re-mix elements of multiple lessons into new content, say a lesson on
all the adverb sentences you've seen or all the ones with terms of a
particular gender.

A personal dictionary could also be a very powerful way to interface
with new material. If we have all of the material you have studied
broken down into individual components, we can treat the whole
collection as a package repository and allow new material to suggest or
require additional lessons. We could also work in reverse and build a
tool for finding new material based on what you have already learned +5%
new content.

### Easy Import

Flash cards are something people already make and there are a wealth of
flash card decks available to accompany all the various formal language
instruction books and courses out there. A flexible flash card format
would give us access both to this wealth of material and to the students
currently using it, who could simply import their existing materials and
build from there rather than starting from scratch. Larger collections
of content could also be imported as flash card collections.
Dictionaries are the biggest example that springs to mind. There are a
number of them out there under free licenses and they naturally break up
into (word, definition, part of speech, pronunciation, etc), which makes
a very nice flash card and a great place to start for adding pictures
and audio recordings, or linking to individual flash cards from lessons.
