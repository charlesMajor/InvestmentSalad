FROM eclipse-temurin:21-jdk AS build
ENV HOME=/usr/app
RUN mkdir -p $HOME
WORKDIR $HOME
ADD ./investmentSaladApi $HOME
CMD ["sh", "build.sh"]
