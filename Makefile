install:
	npm install
build:
	rm -rf dist
	npm run build
publish:
	npm publish
lint:
	npx eslint .
test:
	npm run test
testWatch:
	npm run test --watchAll
start:
	DEBUG="application:*" npx nodemon --watch .  --ext '.js' --exec npx gulp server
dev:
	npm run dev

.PHONY: test
