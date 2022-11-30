FROM maven:latest AS build-project
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package

FROM openjdk:17
ADD target/ds-2020-0.0.1-SNAPSHOT.jar spring-docker.jar
ENTRYPOINT ["java", "-jar","spring-docker.jar"]
EXPOSE 8080