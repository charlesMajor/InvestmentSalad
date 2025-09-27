package ca.csfoy.investmentSaladApi;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import ca.csfoy.investmentSaladApi.api.user.LoginResource;
import ca.csfoy.investmentSaladApi.api.user.SignupResource;
import ca.csfoy.investmentSaladApi.security.JwtTokenEntryPointFilter;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@SuppressWarnings("removal")
	@Bean
	public AuthenticationManager authManager(HttpSecurity http, UserDetailsService userDetailsService)
			throws Exception {
		return http.getSharedObject(AuthenticationManagerBuilder.class).userDetailsService(userDetailsService)
				.passwordEncoder(passwordEncoder()).and().build();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http, JwtTokenEntryPointFilter jwtFilter) throws Exception {

		http.csrf((csrf) -> {
			try {
				csrf.disable().headers(header -> header.frameOptions(frameOption -> frameOption.disable()));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}).sessionManagement(
				sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
				.authorizeHttpRequests(authorize -> authorize

						.requestMatchers("/h2-console/**", LoginResource.RESOURCE_PATH, SignupResource.RESOURCE_PATH)
						.permitAll().anyRequest().authenticated());

		return http.build();
	}
}
