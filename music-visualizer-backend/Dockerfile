FROM openjdk:17
COPY target/musicvisualizer-0.0.1-SNAPSHOT.jar musicvisualizer-0.0.1-SNAPSHOT.jar
ADD ./upload-dir-docker/* upload-dir/
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "/musicvisualizer-0.0.1-SNAPSHOT.jar" ]