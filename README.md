# Log Viewer 2 Front-end

The log viewer for `c00/log`.

## Deployment
To make a distributable version, run `node dist`. This will create a `dist/` folder with the front and back-end combined.

The structure of the dist folder is:

- dist/
  - bunch of api files
  - public/     <--Entry point for web server
    - angular app built files.
    - settings.json <-- You have add this yourself!
    - api/
      - index.php    <-- API entry point

Don't make the `dist` folder accessible from the outside. Only expose the `public` folder.

# Todo
- Allow editing of settings file from UI

# Docker build

```
docker build -t log-viewer-2 .
```

The built image allowes for a env settings: 

- `ANGULAR_BASE_HREF` that will set the <base href=""> tag and the nginx conf. It defaults to `/lv2/`.
- `ANGULAR_API_URL` that will set the location of the api. Defaults to `api/`.