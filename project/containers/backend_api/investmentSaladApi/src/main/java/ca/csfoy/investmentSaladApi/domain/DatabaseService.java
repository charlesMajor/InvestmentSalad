package ca.csfoy.investmentSaladApi.domain;

import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@Service
public class DatabaseService {

	private static final String DB_URL = "jdbc:mysql://mysql_host:3306/database_name";
	private static final String USER = "username";
	private static final String PASSWORD = "password";

	@Retryable(retryFor = { SQLException.class }, maxAttempts = 3, backoff = @Backoff(delay = 1000))
	public Connection getConnection() throws SQLException {
		return DriverManager.getConnection(DB_URL, USER, PASSWORD);
	}
}
