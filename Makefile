NPM:=@npm
PNPM=@pnpm
DOCKER=@docker
COMPOSE:=@docker-compose

######################################
# APP COMMAND TERITORY
######################################

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

######################################
# DOCKER COMMAND TERITORY
######################################

.PHONY: upb
upb:
	${DOCKER} build -t fullstack-monorepo:latest --compress .
	${COMPOSE} up -d --remove-orphans --no-deps

.PHONY: dob
dob:
	${COMPOSE} down
	${DOCKER} rmi -f fullstack-monorepo:latest

.PHONY: up
up:
	${COMPOSE} up -d --remove-orphans --no-deps

.PHONY: do
do:
	${COMPOSE} down