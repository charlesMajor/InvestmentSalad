package ca.csfoy.investmentSaladApi.security;

import java.util.Base64;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import ca.csfoy.investmentSaladApi.domain.user.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenManager {

	@Value("${jwt.secretKey}")
	private String secretKey;
	@Value("${jwt.validityTimeInMilliseconds}")
	private String validityInMilliseconds;

	private final String USER_CLAIMS = "userId";
	private final String AUTH_CLAIMS = "auth";

	public String createToken(String email, Role role, String id) {
		Claims claims = Jwts.claims().setSubject(email);
		claims.put(AUTH_CLAIMS, role);
		claims.put(USER_CLAIMS, id);
		Date now = new Date();

		return Jwts.builder().setClaims(claims).setIssuedAt(now)
				.setExpiration(new Date(now.getTime() + Long.parseLong(validityInMilliseconds)))
				.signWith(SignatureAlgorithm.HS512, encodeSecret()).compact();
	}

	public String getUserIdFromToken(String token) {
		return (String) this.getClaims(token).get(USER_CLAIMS);
	}

	public String getSubjectFromToken(String token) {
		return this.getClaims(token).getSubject();
	}

	public boolean validateToken(String token) {
		this.getClaims(token);
		return true;
	}

	private Claims getClaims(String token) {
		return Jwts.parser().setSigningKey(encodeSecret()).parseClaimsJws(token).getBody();
	}

	private String encodeSecret() {
		return Base64.getEncoder().encodeToString(secretKey.getBytes());
	}
}
