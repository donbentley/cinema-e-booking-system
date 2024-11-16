package com.csci4050.user.config;



import java.util.List;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.csci4050.user.security.JWTFilter;

import jakarta.servlet.http.HttpServletResponse;

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
            .cors(withDefaults())
            .authorizeHttpRequests((authorize) ->
                authorize
                    .requestMatchers(HttpMethod.GET, "/movie/getAll").permitAll() // Allow access without authentication
                    .requestMatchers(HttpMethod.POST, "/movie/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.PUT, "/movie/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.DELETE, "/movie/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.GET, "/showing/**").permitAll()
                    .requestMatchers(HttpMethod.POST, "/showing/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.PUT, "/showing/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.DELETE, "/showing/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.GET, "promotion/redeem/**").hasAnyRole("ADMIN", "CUSTOMER")
                    .requestMatchers(HttpMethod.GET, "/promotion/get/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.GET, "/promotion/getAll").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.POST, "/promotion/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.PUT, "/promotion/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.DELETE, "/promotion/**").hasRole("ADMIN")
                    .requestMatchers("/customer/**").hasAnyRole("ADMIN", "CUSTOMER")
                    .requestMatchers("/address/**").hasAnyRole("ADMIN", "CUSTOMER")
                    .requestMatchers("/payment-card/**").hasAnyRole("ADMIN", "CUSTOMER")
                    .requestMatchers("/auth/**").permitAll()
                    .anyRequest().authenticated()
            )
            .exceptionHandling((exceptionHandling) ->
                exceptionHandling
                    .authenticationEntryPoint((request, response, authException) ->
                        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized"))
            );
    
        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedMethods(List.of("GET","POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**",configuration);

        return source;
    }
}