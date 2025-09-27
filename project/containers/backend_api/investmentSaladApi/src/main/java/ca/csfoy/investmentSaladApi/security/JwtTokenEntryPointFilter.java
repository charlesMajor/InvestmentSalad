package ca.csfoy.investmentSaladApi.security;

import java.io.IOException;
import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import ca.csfoy.investmentSaladApi.api.ErrorMessageDto;
import ca.csfoy.investmentSaladApi.controller.exception.ErrorMessageFactory;
import ca.csfoy.investmentSaladApi.controller.exception.LoggerUtils;
import ca.csfoy.investmentSaladApi.controller.exception.exceptions.JwtAuthenticationException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtTokenEntryPointFilter extends OncePerRequestFilter {

	private Logger authLogger = LoggerFactory.getLogger(JwtTokenEntryPointFilter.class);

	private final ErrorMessageFactory errorFactory;
	private final JwtTokenManager tokenManager;
	private final UserDetailsService userDetailsService;
	private final ObjectMapper objectMapper;

	public JwtTokenEntryPointFilter(ErrorMessageFactory errorFactory, JwtTokenManager tokenManager,
			UserDetailsService userDetailsService, ObjectMapper objectMapper) {
		this.errorFactory = errorFactory;
		this.tokenManager = tokenManager;
		this.userDetailsService = userDetailsService;
		this.objectMapper = objectMapper;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String token = request.getHeader("Authorization");
		try {
			this.authenticate(token);
		} catch (RuntimeException authException) {
			this.setExceptionResponse(response, authException);
			return;
		}

		filterChain.doFilter(request, response);
	}

	private void authenticate(String token) {
		if (Objects.nonNull(token)) {
			String tokenWithoutBearer = token;

			if (token.startsWith("Bearer ")) {
				tokenWithoutBearer = token.substring(7);
			}

			tokenManager.validateToken(tokenWithoutBearer);
			String email = tokenManager.getSubjectFromToken(tokenWithoutBearer);
			String id = tokenManager.getUserIdFromToken(tokenWithoutBearer);
			UserDetails user = userDetailsService.loadUserByUsername(email);

			SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(
					new UserPrincipal(id, user.getUsername()), user.getPassword(), user.getAuthorities()));
		}
	}

	private void setExceptionResponse(HttpServletResponse response, Exception authException) {
		SecurityContextHolder.clearContext();
		ErrorMessageDto dto = errorFactory.simpleErrorMessageDto(HttpStatus.UNAUTHORIZED, authException);
		LoggerUtils.logError(authLogger, authException, dto);

		try {
			setResponse(response, dto);
		} catch (IOException jpe) {
			throw new JwtAuthenticationException("An error occured in creating authentication exception response", jpe);
		}
	}

	private void setResponse(HttpServletResponse response, ErrorMessageDto dto) throws IOException {
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getOutputStream().println(objectMapper.writeValueAsString(dto));
	}
}
