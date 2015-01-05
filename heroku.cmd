
--create heroku dns
heroku create

--view git remotes
git remote -v

--set heroku's node environment
heroku config:set NODE_ENV=prod

--deploy to heroku from master
git push heroku master

--allocate resources to app on heroku
heroku ps:scale web=1

--create SSH key for heroku
ssh-keygen /c/projects/multivision/keys

--add ssh key to heroku
heroku keys:add keys.pub

--list ssh keys
heroku keys

--remove all keys
heroku keys:clear

--remove one key
heroku keys:remove name-of-key