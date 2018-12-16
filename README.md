# Log Viewer 2 Front-end

The log viewer for `c00/log`.

## Deployment
To make a distributable version, run `node dist`. This will create a `dist/` folder with the front and back-end combined.

The structure of the dist folder is:

- dist/
  - bunch of api files
  - public/     <--Entry point for web server
    - angular app built files.
    - api/
      - index.php    <-- API entry point

Don't make the `dist` folder accessible from the outside. Only expose the `public` folder.