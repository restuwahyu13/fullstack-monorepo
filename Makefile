NPM:=@npm
COMPOSE:=@docker-compose

.PHONY: install
install:
	${NPM} i -V

.PHONY: build
build:
	${NPM} run build

.PHONY: dev
dev:
	${NPM} run dev

.PHONY: dcup
dcup:
	${COMPOSE} up -d --remove-orphans --no-deps

.PHONY: dcdown
dcdown:
	${COMPOSE} down