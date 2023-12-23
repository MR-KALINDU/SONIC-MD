FROM quay.io/inrlwabot/inrl:latest
RUN git clone https://github.com/MR-KALINDU/SONIC-MD /root/MR-KALINDU
WORKDIR /root/MR-KALINDU/
RUN yarn install --network-concurrency 1
EXPOSE 8000
CMD ["npm", "start"]
