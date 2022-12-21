package tests;

import helpers.StarWarsApiClient;
import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestInstance;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class TestBase {

    protected StarWarsApiClient starWarsApiClient;

    @BeforeAll
    public void TestBase() {
        RestAssured.baseURI = System.getenv("BASE_URL");
    }

    @BeforeEach
    public void setUp() {
        starWarsApiClient = new StarWarsApiClient();
    }
}
