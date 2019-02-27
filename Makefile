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
	npm test
testWatch:
	npm run test --watchAll
start:
	npm run nodemon -- --exec babel-node ./index.js
