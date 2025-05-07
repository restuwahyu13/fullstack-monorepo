NPM:=@npm
COMPOSE:=@docker-compose

.PHONY: i
i:
	${NPM} i -V

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