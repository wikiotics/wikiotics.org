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

## Background

The Wikiotics project was founded in 2008 with the goal of creating a freely licensed wiki where people could collaborate on materials for language learners.  As part of this, we built a wiki engine called [Ductus](https://github.com/wikiotics/ductus), which provided a framework for building interactive wiki pages from structured content, editable from the web browser.  In 2011, Wikiotics joined forces with the WikiBabel project, a project with a similar vision and whose developer went on to contribute signficantly to Wikiotics.  A few years later, we lost interest in maintaining Ductus and became occupied with other activities.

## Status

Wikiotics is being transitioned to a static site.  The work is happening on the `migration` branch (pull request #[4](https://github.com/wikiotics/wikiotics.org/pull/4)).  Once we are happy with the automated scrape of the old site's content, this pull request will be merged.

Improvements to the functionity of the site are welcome and can be submitted as pull requests against the `master` branch.  Improvements to site content should wait for now, until we finalize the migration from Ductus by merging the `migration` branch (pull request #[4](https://github.com/wikiotics/wikiotics.org/pull/4).

The content of the site is a bit of a mess, as might be expected from a repository that was editable by anyone in the world, without moderation.  On top of that, the only real way to see a working draft of a lesson was to save it to the wiki.  After #[4](https://github.com/wikiotics/wikiotics.org/pull/4) is merged, a massive cleanup will be necessary if the project is to continue.  Otherwise, this repository will serve as a working archive of the community's work.

## Claiming contributions

During its time in existence, wikiotics.org received contributions from 62 logged-in users, as well as anonymous users identified only by their ip address.  There were a total of 4064 such contributions, each of which has a corresponding commit on the `migration` branch.  Anyone who contributed and has an account on GitHub can claim these contributions and be listed on the [contributions page](https://github.com/wikiotics/wikiotics.org/graphs/contributors) by submitting a pull request that adds [an appropriate entry](https://git-scm.com/docs/git-check-mailmap#_mapping_authors) to the `.mailmap` file in this repository which maps `username@wikiotics.org` to an email address associated with the person's GitHub account.

## Licenses

All content (i.e., everything in the `content/` directory, recursively) is licensed under the [Creative Commons Attribution-ShareAlike 3.0](https://creativecommons.org/licenses/by-sa/3.0/) license.  Some of the lesson media (referenced but not included in this repository) is available under a different (but free) Creative Commons license.  Everything else (e.g., all code) is available under the [GNU General Public License version 3](https://www.gnu.org/licenses/gpl-3.0.en.html) or any later version.  Some of the libraries in `{assets,static}/ductus/` are available under more permissive licenses.
