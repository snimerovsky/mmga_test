.PHONY: deploy
.PHONY: build

deploy:
	./deploy/deploy.sh


build:
	./deploy/build.sh

all: build deploy
