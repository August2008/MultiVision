
--create heroku dns
heroku create

--view git remotes
git remove -v

--set heroku's node environment
heroku config:set NODE_ENV=prod

--deploy to heroku from master
git push heroku master