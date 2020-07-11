# Wikiotics

Wikiotics is a website for learning a foreign language.

## Editing the site

Wikiotics is becoming a static site built with [Hugo](https://gohugo.io/).  The following steps allow one to edit it locally:

1. [Install Hugo](https://gohugo.io/getting-started/installing/).

   On Ubuntu, this is as simple as
      ```
      $ sudo snap install hugo --channel=extended
      ```

   Right now, the "extended" version is not necessary, but we may experiment with its features in the future.

2. Clone this repository:

   ```
   $ git clone https://github.com/wikiotics/wikiotics.org.git
   ```

3. Start the Hugo development server and point a web browser to the provided URL:

   ```
   $ cd wikiotics.org
   $ hugo server
   [...]
   Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
   Press Ctrl+C to stop
   ```

The content is in the `content/` directory.  Upon saving any content file, the web browser should refresh automatically with the updated content.

Each lesson is represented entirely by TOML front matter, which is contained between lines which say `+++`.  When editing a lesson, one tip is to temporarily set `grid = true` in its front matter, which will display the lesson's elements as a spreadsheet.  This can be useful to obtain a global view of the lesson.

## Background

The Wikiotics project was founded in 2008 with the goal of creating a freely licensed wiki where people could collaborate on materials for language learners.  As part of this, we built a wiki engine called [Ductus](https://github.com/wikiotics/ductus), which provided a framework for building interactive wiki pages from structured content, editable from the web browser.  In 2011, Wikiotics joined forces with the WikiBabel project, a project with a similar vision and whose developer went on to contribute signficantly to Wikiotics.  A few years later, we lost interest in maintaining Ductus and became occupied with other activities.

## Status

As of July 2020, Wikiotics has been transitioned to a static site.  The content is a bit of a mess, as might be expected from a repository that was editable by anyone in the world, without moderation.  On top of that, the only real way to see a working draft of a lesson was to save it to the wiki.  A cleanup will be necessary if the project is to continue.  Otherwise, this repository will serve as a working archive of the community's work.

## Claiming contributions

During its time in existence, wikiotics.org received contributions from 62 logged-in users, as well as anonymous users identified only by their ip address.  There were a total of 4064 such contributions, each of which has a corresponding commit in this repository.  ~~Anyone who contributed and has an account on GitHub can claim these contributions and be listed on the [contributions page](https://github.com/wikiotics/wikiotics.org/graphs/contributors) by submitting a pull request that adds [an appropriate entry](https://git-scm.com/docs/git-check-mailmap#_mapping_authors) to the `.mailmap` file in this repository which maps `username@wikiotics.org` to an email address associated with the person's GitHub account.~~ The GitHub contributors graph currently [does not consider the `.mailmap` file](https://github.community/t/how-to-get-mailmap-to-work-and-record-contributions-in-relevant-users-profile/121285), so there is currently no way of claiming past contributions.

## Licenses

All content (i.e., everything in the `content/` directory, recursively) is licensed under the [Creative Commons Attribution-ShareAlike 3.0](https://creativecommons.org/licenses/by-sa/3.0/) license.  Some of the lesson media (referenced but not included in this repository) is available under a different (but free) Creative Commons license.  Everything else (e.g., all code) is available under the [GNU General Public License version 3](https://www.gnu.org/licenses/gpl-3.0.en.html) or any later version.  Some of the libraries in `{assets,static}/ductus/` are available under more permissive licenses.

## Technology

After years of having a rather complicated technology stack, we now like to keep things simple.  This helps to maximize the [bus factor](https://en.wikipedia.org/wiki/Bus_factor) and minimize time spent maintaining the site.  There should be no or few moving parts, and ideally no server to maintain.

We use the following pieces of technology to help us meet our goals:

- [Hugo](https://gohugo.io/) static site generator.  It is known for allowing the creator to get quick visual feedback while building content.  It moves relatively slowly, and is in an ecosystem that [moves especially slowly](https://golang.org/doc/go1compat).  Every page at wikiotics.org is built by Hugo.  Each lesson is a Markdown file which consists *only* of the lesson data structure as TOML front matter.
- [Tachyons](https://tachyons.io/) CSS framework helps to [keep the development process simple](https://github.com/dwyl/learn-tachyons#a-natural-workflow).
- [jQuery](https://jquery.com/) 1.x is about as stable as it gets.
