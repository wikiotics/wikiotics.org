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

## Licenses

All content (i.e., everything in the `content/` directory, recursively) is licensed under the [Creative Commons Attribution-ShareAlike 3.0](http://creativecommons.org/licenses/by-sa/3.0/) license.  Some of the lesson media (referenced but not included in this repository) is available under a different (but free) Creative Commons license.  Everything else (e.g., all code) is available under the [GNU General Public License version 3](https://www.gnu.org/licenses/gpl-3.0.en.html) or any later version.  Some of the libraries in `{assets,static}/ductus/` are available under more permissive licenses.
