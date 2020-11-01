FROM tesseractshadow/tesseract4re
WORKDIR usr/src/app

RUN apt update

# TESSERACT LANGUAGES
RUN apt install tesseract-ocr-pol

# NodeJS & Yarn
RUN apt install -y curl
RUN curl -sL https://deb.nodesource.com/setup_15.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g yarn
##
RUN yarn set version berry

# Package.json
COPY package.json package.json
COPY server/package.json server/package.json
COPY shared/package.json shared/package.json
COPY ext/package.json ext/package.json
##
COPY .yarnrc.yml .


#todo fix yarn 2 path
RUN node /home/work/usr/src/app/.yarn/releases/yarn-berry.cjs

COPY . .

RUN cd server && node /home/work/usr/src/app/.yarn/releases/yarn-berry.cjs build
WORKDIR server
CMD ["node", "/home/work/usr/src/app/.yarn/releases/yarn-berry.cjs", "start"]


