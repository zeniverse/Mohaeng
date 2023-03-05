package com.mohaeng.backend.user.service;

import com.mohaeng.backend.user.domain.Role;
import com.mohaeng.backend.user.domain.User;
import com.mohaeng.backend.user.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RandomNameServiceTest {
    @Autowired
    private RandomNameService randomNameService;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void 닉네임_생성_검사() {
        String nickName = randomNameService.generateNickName();
        User user1 = userRepository.save(new User("Kim", "kim@gmail.com", Role.NORMAL, nickName));
        Assertions.assertThat(user1.getNickName()).isEqualTo(nickName);
    }

    @Test
    public void 중복_닉네임_체크_검사() {
        String[] animalNames = randomNameService.getAnimalNames();
        String[] adjectiveNames = randomNameService.getAdjectiveNames();
        String nickName = adjectiveNames[0] + animalNames[0];

        userRepository.save(new User("Kim", "kim@gmail.com", Role.NORMAL, nickName));

        String generatedNickName = randomNameService.checkDuplicateNickName(List.of(nickName), 0, 0);

        Assertions.assertThat(nickName).isNotEqualTo(generatedNickName);
    }

    @Test
    public void 닉네임_변경_검사() {
        User user = userRepository.save(new User("Kim", "kim@gmail.com", Role.NORMAL, "testNick"));
        String nickName = randomNameService.generateNickName();
        user.changeNickName(nickName);

        Assertions.assertThat(nickName).isEqualTo(user.getNickName());
    }
}