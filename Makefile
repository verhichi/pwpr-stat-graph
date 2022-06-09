install:
		cd frontend && npm ci
		cd backend/accumulator && pipenv install
		cd backend/server && pipenv install

start-front:
		cd frontend && npm run dev

start-server:
		cd backend/server && pipenv run start

start-accumulator:
		cd backend/accumalator && pipenv run start