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
