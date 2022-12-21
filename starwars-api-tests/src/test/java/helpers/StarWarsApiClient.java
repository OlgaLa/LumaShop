package helpers;

import static constants.Resources.SCHEMA;
import static io.restassured.RestAssured.given;

public class StarWarsApiClient {

    public void ensureSchema(String rootUrl) {
        given()
                .get(rootUrl + SCHEMA)
                .then()
                .statusCode(200);
    }

    public <ResponseType> ResponseType getDeserializedResponse(String url, Class<ResponseType> type) {
        return given()
                .when()
                .get(url)
                .then()
                .extract()
                .response()
                .as(type);
    }

}
