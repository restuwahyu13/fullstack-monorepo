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

.PHONY: fes
fes:
	${PNPM} turbo start -F=frontend-repo

.PHONY: bes
bes:
	${PNPM} turbo start -F=backend-repo

.PHONY: fed
fed:
	${PNPM} turbo run dev -F=frontend-repo

.PHONY: bed
bed:
	${PNPM} turbo run dev -F=backend-repo

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