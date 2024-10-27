package com.csci4050.user.config;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.csci4050.user.security.JWTFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JWTFilter filter;

    public SecurityConfig(UserDetailsService userDetailsService){
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
        AuthenticationConfiguration configuration) throws Exception {
            return configuration.getAuthenticationManager();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf((csrf) -> csrf.disable())
            .authorizeHttpRequests((authorize) ->
                authorize
                    .requestMatchers(HttpMethod.GET, "/movie/**").permitAll()
                    .requestMatchers(HttpMethod.POST, "/movie/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.PUT, "/movie/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.DELETE, "/movie/**").hasRole("ADMIN")
                    .requestMatchers("/customer/**").hasAnyRole("ADMIN", "CUSTOMER")
                    .requestMatchers("/address/**").hasAnyRole("ADMIN", "CUSTOMER")
                    .requestMatchers("/card/**").hasAnyRole("ADMIN", "CUSTOMER")
                    .requestMatchers("/auth/**").permitAll()
                    .anyRequest().authenticated()
            );
            // http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}