//package com.mohaeng.backend.config;
//
//import com.mohaeng.backend.member.domain.Role;
//import com.mohaeng.backend.member.jwt.JwtFilter;
//import com.mohaeng.backend.member.jwt.TokenGenerator;
//import com.mohaeng.backend.member.oauth.OAuthService;
//import com.mohaeng.backend.member.oauth.OAuthSuccessHandler;
//import com.mohaeng.backend.member.repository.MemberRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//@EnableWebSecurity
//@RequiredArgsConstructor
//@Configuration
//public class SecurityConfig {
//    private final OAuthService oAuthService;
//    private final OAuthSuccessHandler oAuthSuccessHandler;
//    private final TokenGenerator tokenGenerator;
//    private final MemberRepository memberRepository;
//
//    //https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=d7c41513380cc7e5cbbfce173bf86002&redirect_uri=http://localhost:8080/login/oauth2/code/kakao
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf().disable()
//                .httpBasic().disable()
//                    .authorizeHttpRequests()
//                    .requestMatchers("/", "/css/**", "/images/**", "/js/**", "/h2-console/**", "/profile", "/**").permitAll()
////                    .requestMatchers("/login/oauth2/code/google/**", "/login/oauth2/code/kakao/**").permitAll()
////                    .requestMatchers("/loginInfo", "/user/logout").hasAnyRole(Role.NORMAL.name(), Role.ADMIN.name())
////                    .requestMatchers("/api/**").hasAnyRole(Role.NORMAL.name(), Recyole.ADMIN.name())
//
//                .and()
//                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                    .logout()
//                    .logoutSuccessUrl("/")
//                    .invalidateHttpSession(true)
//                    .deleteCookies("JSESSIONID")
//                .and()
//                    .addFilterBefore(new JwtFilter(tokenGenerator, memberRepository), UsernamePasswordAuthenticationFilter.class);
////                    .formLogin().disable()
////                    .oauth2Login()
////                    .successHandler(oAuthSuccessHandler)
////                    .userInfoEndpoint()
////                    .userService(oAuthService);
//
//        http.addFilterBefore(new JwtFilter(tokenGenerator, memberRepository), UsernamePasswordAuthenticationFilter.class);
//        return http.build();
//    }
//
//}
