# Stage 1: Build dependencies for better caching
FROM maven:3.9.6-eclipse-temurin-17-alpine AS deps
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline

# Stage 2: Build the app
FROM maven:3.9.6-eclipse-temurin-17-alpine AS builder
WORKDIR /app
COPY --from=deps /root/.m2 /root/.m2
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 3: Use distroless for runtime, copy the JAR
FROM gcr.io/distroless/java17-debian11
WORKDIR /app
COPY --from=builder /app/target/backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["app.jar"]