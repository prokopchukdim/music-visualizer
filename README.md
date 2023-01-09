# music-visualizer

A web app that can visualize music files. Created as a personal learning project using Java, Springboot, React.js, p5.js, Docker, Azure, and Netlify.

Supports drag-and-drop for your own music files. Can also upload your files to the server and download/delete existing files. Some of the existing files are protected so they can't be deleted or overwritten. Files are played using using the HTMLAudioElement api so whether your file can or cannot be read depends on their supported file types.

The front-end is hosted on Netlify: https://chic-travesseiro-7b7f19.netlify.app/

The back-end is a Dockerized Springboot REST API hosted on Azure App Services. If the app hasn't been in use for a few hours, then Azure needs around 30s to start the back-end. You can check if it's up, or start it if it's not, by going here and waiting for "backend running" to appear: https://music-visualizer.azurewebsites.net/

It's also available as a docker image on Docker Hub https://hub.docker.com/repository/docker/prokopchukdim/music-visualizer

![image](https://user-images.githubusercontent.com/87666671/210891764-8083fbc7-1401-4ac3-a454-c9dcc7f11da9.png)
