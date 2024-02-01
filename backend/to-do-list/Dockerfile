FROM openjdk:11-jre-slim
EXPOSE 8080
COPY target/to-do-list-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]