# Deploy Ego Gym to Render

This is a static site. Use Render **Static Site**; there is no backend, start command, database, or environment variable to configure.

1. Put this project in a GitHub repository. A private repository works.
2. Open https://dashboard.render.com and choose **New → Static Site**.
3. Connect the repository and select the branch containing this project.
4. Use these settings:

| Setting | Value |
| --- | --- |
| Name | ego-gym (or any available name) |
| Root Directory | Leave blank if package.json is at the repository root |
| Build Command | npm run build |
| Publish Directory | dist |

5. Click **Create Static Site**. When it is live, open the onrender.com URL on your phone, test each game, and share that URL.

Alternatively, choose **New → Blueprint**, connect the same repository, and let render.yaml supply the static-site settings.

No npm install step is needed in the build command because this project has no package dependencies. Render supplies Node.js for the build. The local preview server is not used in production.

The site's URL will be public. A noindex header asks search engines not to index it; it does not restrict access to people who have the link.

Deploy only the generated dist/ output. Build outputs and the old apology backup are excluded from Git by .gitignore. The build explicitly includes only assets used by the game.

Official documentation: https://render.com/docs/static-sites
