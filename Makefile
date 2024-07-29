websites_dir=/var/www

rsync-excludes = --exclude=*.sh --exclude=.gitignore

ifeq($(WEBSITE),)
	WEBSITE = freddit.net

update:
	@echo "Updating website $(WEBSITE)..."
	git pull
	rsync -av --delete $(rsync-excludes) $(WEBSITE)/* $(websites_dir)/$(WEBSITE)/
