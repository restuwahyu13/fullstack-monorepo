NPM:=@npm
PNPM=@pnpm
COMPOSE:=@docker-compose

.PHONY: i
i:
	${PNPM} i --loglevel verbose

.PHONY: build
build:
	${NPM} run build

.PHONY: start
start:
	${NPM} run start

.PHONY: runtime
runtime:
	${NPM} run runtime

.PHONY: dev
dev:
	${NPM} run dev

.PHONY: dcup
dcup:
	${COMPOSE} up -d --remove-orphans --no-deps

.PHONY: dcdown
dcdown:
	${COMPOSE} down