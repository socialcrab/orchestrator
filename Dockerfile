FROM node:20-alpine
COPY . /orchestrator
WORKDIR /orchestrator
RUN npm i
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start" ]
