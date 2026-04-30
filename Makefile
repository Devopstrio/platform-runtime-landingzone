.PHONY: help build up down test lint migrate deploy-mock validate-runtime

help:
	@echo "Platform Runtime Landing Zone - Management Commands"
	@echo "-----------------------------------------------"
	@echo "build              : Build all service containers"
	@echo "up                 : Start all services in the background"
	@echo "down               : Stop all services"
	@echo "test               : Run all tests (Unit + Runtime)"
	@echo "lint               : Run linting checks"
	@echo "migrate            : Run database migrations"
	@echo "deploy-mock        : Deploy a mock blue/green workload"
	@echo "validate-runtime   : Execute runtime compliance audit"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

test:
	pytest tests/api tests/runtime
	npm test --prefix apps/web

lint:
	flake8 apps/api apps/worker apps/runtime-engine
	npm run lint --prefix apps/web

migrate:
	docker-compose exec api alembic upgrade head

deploy-mock:
	docker-compose exec api python scripts/deploy/blue_green.py --app-name "payment-api"

validate-runtime:
	docker-compose exec api python scripts/validate/runtime_policy.py
