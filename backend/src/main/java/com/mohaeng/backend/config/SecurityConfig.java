package com.mohaeng.backend.config;

import com.mohaeng.backend.member.domain.Role;
import com.mohaeng.backend.member.oauth.OAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@RequiredArgsConstructor
@Configuration
public class SecurityConfig {
    private final OAuthService oAuthService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .headers().frameOptions().disable()
                .and()
                .httpBasic().disable()
                    .authorizeHttpRequests()
                    .requestMatchers("/", "/css/**", "/images/**", "/js/**", "/h2-console/**", "/profile").permitAll()
                    .requestMatchers("/loginInfo", "/user/logout").hasAnyRole(Role.NORMAL.name(), Role.ADMIN.name())
                    .requestMatchers("/api/**").hasAnyRole(Role.NORMAL.name(), Role.ADMIN.name())
                .and()
                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.NEVER)
                .and()
                    .logout()
                    .logoutSuccessUrl("/")
                    .invalidateHttpSession(true)
                    .deleteCookies("JSESSIONID")
                .and()
                    .oauth2Login()
                    .defaultSuccessUrl("/loginInfo")
                    .userInfoEndpoint()
                    .userService(oAuthService);


        return http.build();
    }

}
