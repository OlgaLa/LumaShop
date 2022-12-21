package tests;

import io.restassured.RestAssured;
import models.RootResponse;
import org.junit.jupiter.api.Test;

import static constants.Resources.*;
import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.*;

public class RootTest extends TestBase {

    @Test
    public void getBaseUrl_Response_Contains_Correct_Recourses_Urls() {

        var rootResponse = starWarsApiClient
                .getDeserializedResponse("", RootResponse.class);

        assertAll(
                () -> assertTrue(rootResponse.films.endsWith(FILMS)),
                () -> assertTrue(rootResponse.people.endsWith(PEOPLE)),
                () -> assertTrue(rootResponse.planets.endsWith(PLANETS)),
                () -> assertTrue(rootResponse.species.endsWith(SPECIES)),
                () -> assertTrue(rootResponse.starships.endsWith(STARSHIPS)),
                () -> assertTrue(rootResponse.vehicles.endsWith(VEHICLES))
        );
    }

    @Test
    public void getBaseUrl_Every_Resource_Has_Defined_Schema() {

        var response = starWarsApiClient
                .getDeserializedResponse("", RootResponse.class);

        assertAll(
                () -> assertDoesNotThrow(() -> starWarsApiClient.ensureSchema(response.films)),
                () -> assertDoesNotThrow(() -> starWarsApiClient.ensureSchema(response.people)),
                () -> assertDoesNotThrow(() -> starWarsApiClient.ensureSchema(response.starships)),
                () -> assertDoesNotThrow(() -> starWarsApiClient.ensureSchema(response.planets)),
                () -> assertDoesNotThrow(() -> starWarsApiClient.ensureSchema(response.species)),
                () -> assertDoesNotThrow(() -> starWarsApiClient.ensureSchema(response.vehicles))
        );
    }

    @Test
    public void request_to_HTTPUrl_RedirectedToHTTPS() {

        final String httpURL = RestAssured.baseURI.replace("https:/", "http:/");
        given()
                .redirects()
                .follow(false)
                .expect()
                .statusCode(301)
                .header("Location", RestAssured.baseURI)
                .when()
                .get(httpURL);

    }
}
