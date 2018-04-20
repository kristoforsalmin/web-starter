include .env

export

bin     := node_modules/.bin
src     := src
dest    := dist
scripts := scripts
styles  := styles
images  := images
icons   := icons

webpack := $(bin)/webpack $(src)/$(scripts)/main.js \
	--mode $(NODE_ENV) \
	--output-path $(dest)/$(scripts) \
	--output-public-path $(scripts)/

postcss := $(bin)/postcss $(src)/$(styles)/main.css \
	-c postcss.config.js \
	-d $(dest)/$(styles) \
	--verbose

pug := $(bin)/pug -o $(dest) $(src)

all: build

build: clean lint process copy

lint: lint-scripts lint-styles

lint-scripts:
	$(bin)/eslint $(src)/$(scripts)/**.js

lint-styles:
	$(bin)/stylelint $(src)/$(styles)/**.css

process: process-scripts process-styles process-templates process-images process-icons

process-scripts:
	$(webpack)

process-styles:
	$(postcss)

process-templates:
	$(pug)

process-images:
	$(bin)/imagemin $(src)/$(images)/* -o $(dest)/$(images)

process-icons:
	$(bin)/svg-sprite $(src)/$(icons)/* \
		-s \
		--ss=icons \
		--symbol-dest=$(dest)/$(images)

serve:
	$(MAKE) browser-sync & $(MAKE) watch

browser-sync:
	-$(bin)/browser-sync start \
		-c bs.config.js \
		-s $(dest) \
		-f $(dest)

watch:
	$(MAKE) watch-scripts & $(MAKE) watch-styles & $(MAKE) watch-templates

watch-scripts:
	-$(webpack) -w

watch-styles:
	-$(postcss) -w

watch-templates:
	-$(pug) -w

copy:
	rsync \
		-a \
		-v \
		--exclude=$(scripts) \
		--exclude=$(styles) \
		--exclude=$(images) \
		--exclude=$(icons) \
		--exclude=*.pug \
		$(src)/ $(dest)/

clean:
	-rm -r -v $(dest)

.PHONY: all build lint lint-scripts lint-styles process process-scripts process-styles process-templates process-images process-icons serve browser-sync watch watch-scripts watch-styles watch-templates copy clean
