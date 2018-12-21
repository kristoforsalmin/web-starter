include .env

export

bin := node_modules/.bin
src := src
dest := dist
scripts := scripts
styles := styles
images := images
icons := icons

webpack := $(bin)/webpack \
	--mode $(NODE_ENV) \
	--output-path $(dest)/$(scripts) \
	--output-public-path $(scripts)/ \
	$(src)/$(scripts)/main.js

postcss := $(bin)/postcss \
	-c postcss.config.js \
	-d $(dest)/$(styles) \
	--verbose \
	$(src)/$(styles)/main.css

pug := $(bin)/pug -o $(dest) $(src)

all: build

browser-sync:
	$(bin)/browser-sync start -s $(dest) -f $(dest)

build: clean lint process

clean:
	-rm -r -v $(dest)

lint: lint-scripts lint-styles

lint-scripts:
	$(bin)/eslint $(src)/$(scripts)/**.js

lint-styles:
	$(bin)/stylelint $(src)/$(styles)/**.css

process: process-icons process-images process-scripts process-styles process-templates

process-icons:
	$(bin)/svg-sprite \
		-s \
		--symbol-dest=$(dest)/$(images) \
		--symbol-sprite=icons \
		$(src)/$(icons)/*

process-images:
	$(bin)/imagemin --out-dir=$(dest)/$(images) $(src)/$(images)/*

process-scripts:
	$(webpack)

process-styles:
	$(postcss)

process-templates:
	$(pug)

serve:
	$(MAKE) browser-sync & $(MAKE) watch

watch:
	$(MAKE) watch-scripts & $(MAKE) watch-styles & $(MAKE) watch-templates

watch-scripts:
	-$(webpack) -w

watch-styles:
	-$(postcss) -w

watch-templates:
	-$(pug) -w

.PHONY: all browser-sync build clean lint lint-scripts lint-styles process process-icons process-images process-scripts process-styles process-templates serve watch watch-scripts watch-styles watch-templates
