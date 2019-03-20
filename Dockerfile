FROM node:latest

# set working directory
WORKDIR /toiko

# copy all the files to the working directory
COPY . /toiko

# install dependencies
RUN yarn install

# build
RUN yarn build


# start the bot
CMD yarn start