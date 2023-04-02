package com.mohaeng.backend.member.jwt;

import com.mohaeng.backend.member.domain.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;


@Service
public class TokenGenerator {
    private String secretKey = "SECRETKEYFORMOHAENGPROJECTWECANDOSECRETKEYTHISISKEY";
    private Key key;
    // 임시값
    private final long ACCESS_PERIOD = 100000000L;
    private final long REFRESH_PERIOD = 100000L;


    @PostConstruct
    private void setUPEncodeKey() {
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public Token generateToken(String email, Role role) {
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("role", role);

        Date nowDate = new Date();

        Token token = new Token(
                Jwts.builder()
                        .setClaims(claims)
                        .setIssuedAt(nowDate)
                        .setExpiration(new Date(nowDate.getTime() + ACCESS_PERIOD))
                        .signWith(key, SignatureAlgorithm.HS256)
                        .compact(),
                Jwts.builder()
                        .setClaims(claims)
                        .setIssuedAt(nowDate)
                        .setExpiration(new Date(nowDate.getTime() + REFRESH_PERIOD))
                        .signWith(key, SignatureAlgorithm.HS256)
                        .compact()
        );

        return token;
    }

    public boolean checkToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey.getBytes(StandardCharsets.UTF_8))
                .build()
                .parseClaimsJws(token)
                .getBody();

        try {
            return claims.getExpiration().after(new Date());
        } catch (Exception e) { // 토큰 시간 만료
            return false;
        }

    }

    // access 토큰에서 Email추출
    public String parseEmailFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey.getBytes(StandardCharsets.UTF_8))
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

}
